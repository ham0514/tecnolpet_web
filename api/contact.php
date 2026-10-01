<?php
/**
 * Tecnolpet contact form handler for cPanel shared hosting.
 * Configure $to before uploading to public_html/api/contact.php
 */
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$to = 'mail@tecnolpet.com'; // change if needed
$from = 'noreply@tecnolpet.com';

function clean($value) {
    $value = is_string($value) ? $value : '';
    $value = trim($value);
    $value = str_replace(["\r", "\n"], ' ', $value);
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
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
