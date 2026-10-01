<?php
/**
 * Tecnolpet contact form handler for cPanel shared hosting.
 * Configure $to / $turnstileSecret before going live.
 */
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$to = 'mail@tecnolpet.com';
$from = 'noreply@tecnolpet.com';
$turnstileSecret = 'REPLACE_WITH_TURNSTILE_SECRET'; // set before going live

function clean($value) {
    $value = is_string($value) ? $value : '';
    $value = trim($value);
    $value = str_replace(["\r", "\n"], ' ', $value);
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function verify_turnstile($secret, $token, $remoteIp) {
    if ($secret === '' || $token === '') {
        return false;
    }

    $payload = [
        'secret' => $secret,
        'response' => $token,
    ];
    if ($remoteIp !== '') {
        $payload['remoteip'] = $remoteIp;
    }

    $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    if ($ch === false) {
        return false;
    }

    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($payload),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
    ]);

    $raw = curl_exec($ch);
    curl_close($ch);

    if ($raw === false) {
        return false;
    }

    $result = json_decode($raw, true);
    return is_array($result) && !empty($result['success']);
}

$turnstileToken = trim((string)($_POST['cf-turnstile-response'] ?? ''));
$remoteIp = $_SERVER['HTTP_CF_CONNECTING_IP']
    ?? $_SERVER['HTTP_X_FORWARDED_FOR']
    ?? $_SERVER['REMOTE_ADDR']
    ?? '';
if (is_string($remoteIp) && strpos($remoteIp, ',') !== false) {
    $remoteIp = trim(explode(',', $remoteIp)[0]);
}

if (!verify_turnstile($turnstileSecret, $turnstileToken, is_string($remoteIp) ? $remoteIp : '')) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'captcha_failed']);
    exit;
}

$name = clean($_POST['name'] ?? '');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone = clean($_POST['phone'] ?? '');
$company = clean($_POST['company'] ?? '');
$role = clean($_POST['role'] ?? '');
$cv = clean($_POST['cv'] ?? '');
$message = trim($_POST['message'] ?? '');
$formType = clean($_POST['formType'] ?? 'contact');

if ($name === '' || !$email || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Invalid input']);
    exit;
}

$subject = '[Tecnolpet] ' . strtoupper($formType) . ' — ' . $name;

$body = "Tipo: {$formType}\n"
    . "Nombre: {$name}\n"
    . "Email: {$email}\n"
    . "Teléfono: {$phone}\n"
    . "Empresa: {$company}\n"
    . "Cargo: {$role}\n"
    . "CV: {$cv}\n\n"
    . "Mensaje:\n{$message}\n";

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Tecnolpet Web <' . $from . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
];

$sent = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Mail failed']);
    exit;
}

echo json_encode(['ok' => true]);
