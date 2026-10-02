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
$maxAnnexFiles = 5;
$maxAnnexBytes = 5 * 1024 * 1024;
$allowedAnnexExt = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'zip'];

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

function collect_annexes($fieldName, $maxFiles, $maxBytes, $allowedExt) {
    if (!isset($_FILES[$fieldName])) {
        return [];
    }

    $files = $_FILES[$fieldName];
    $annexes = [];

    if (!is_array($files['name'])) {
        $files = [
            'name' => [$files['name']],
            'type' => [$files['type']],
            'tmp_name' => [$files['tmp_name']],
            'error' => [$files['error']],
            'size' => [$files['size']],
        ];
    }

    $count = count($files['name']);
    if ($count > $maxFiles) {
        return false;
    }

    for ($i = 0; $i < $count; $i++) {
        if ((int)$files['error'][$i] === UPLOAD_ERR_NO_FILE) {
            continue;
        }
        if ((int)$files['error'][$i] !== UPLOAD_ERR_OK) {
            return false;
        }
        if ((int)$files['size'][$i] > $maxBytes) {
            return false;
        }

        $original = (string)$files['name'][$i];
        $ext = strtolower(pathinfo($original, PATHINFO_EXTENSION));
        if (!in_array($ext, $allowedExt, true)) {
            return false;
        }

        $tmp = (string)$files['tmp_name'][$i];
        if ($tmp === '' || !is_uploaded_file($tmp)) {
            return false;
        }

        $content = file_get_contents($tmp);
        if ($content === false) {
            return false;
        }

        $mime = (string)$files['type'][$i];
        if ($mime === '') {
            $mime = 'application/octet-stream';
        }

        $annexes[] = [
            'name' => preg_replace('/[^\w.\- ()\[\]]+/u', '_', $original) ?: ('anexo_' . ($i + 1) . '.' . $ext),
            'mime' => $mime,
            'content' => $content,
        ];
    }

    return $annexes;
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
$emailRaw = trim($_POST['email'] ?? '');
$email = $emailRaw !== '' ? filter_var($emailRaw, FILTER_SANITIZE_EMAIL) : '';
$phone = clean($_POST['phone'] ?? '');
$company = clean($_POST['company'] ?? '');
$role = clean($_POST['role'] ?? '');
$cv = clean($_POST['cv'] ?? '');
$city = clean($_POST['city'] ?? '');
$message = trim($_POST['message'] ?? '');
$formType = clean($_POST['formType'] ?? 'contact');
$address = clean($_POST['address'] ?? '');
$complaintType = clean($_POST['complaintType'] ?? '');
$otherSpecify = clean($_POST['otherSpecify'] ?? '');
$area = clean($_POST['area'] ?? '');
$incidentDate = clean($_POST['incidentDate'] ?? '');
$incidentTime = clean($_POST['incidentTime'] ?? '');
$location = clean($_POST['location'] ?? '');
$involved = trim($_POST['involved'] ?? '');
$relationship = clean($_POST['relationship'] ?? '');
$anonymous = clean($_POST['anonymous'] ?? '') === '1';

if ($formType === 'denuncias') {
    if ($message === '' || $involved === '' || $location === '' || $incidentDate === '' || $relationship === '') {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Invalid input']);
        exit;
    }
    if ($anonymous) {
        if ($name === '') {
            $name = 'Anónimo';
        }
        $email = '';
        $phone = '';
    } else {
        if ($name === '') {
            http_response_code(422);
            echo json_encode(['ok' => false, 'error' => 'Invalid input']);
            exit;
        }
        if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(422);
            echo json_encode(['ok' => false, 'error' => 'Invalid input']);
            exit;
        }
    }
} elseif ($name === '' || !$email || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Invalid input']);
    exit;
}

$annexes = [];
if ($formType === 'quejas' || $formType === 'denuncias' || $formType === 'empleo') {
    $annexes = collect_annexes('annexes', $maxAnnexFiles, $maxAnnexBytes, $allowedAnnexExt);
    if ($annexes === false) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Invalid attachments']);
        exit;
    }
    if ($formType === 'empleo' && count($annexes) === 0) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'CV required']);
        exit;
    }
}

$subjectName = $name !== '' ? $name : 'Anónimo';
$subject = '[Tecnolpet] ' . strtoupper($formType) . ' — ' . $subjectName;

$body = "Tipo: {$formType}\n"
    . "Nombre: {$name}\n"
    . "Email: " . ($email !== '' ? $email : '(no proporcionado)') . "\n"
    . "Teléfono: {$phone}\n"
    . "Empresa: {$company}\n"
    . "Cargo: {$role}\n"
    . "CV: {$cv}\n";

if ($formType === 'empleo') {
    $body .= "Ciudad: {$city}\n";
    if (count($annexes) > 0) {
        $names = array_map(static function ($file) {
            return $file['name'];
        }, $annexes);
        $body .= 'Anexos: ' . implode(', ', $names) . "\n";
    } else {
        $body .= "Anexos: (ninguno)\n";
    }
}

if ($formType === 'quejas') {
    $body .= "Dirección: {$address}\n"
        . "Tipo de inconformidad: {$complaintType}\n"
        . "Otra (especifique): {$otherSpecify}\n"
        . "Área/dependencia: {$area}\n"
        . "Fecha incidencia: {$incidentDate}\n"
        . "Hora incidencia: {$incidentTime}\n";

    if (count($annexes) > 0) {
        $names = array_map(static function ($file) {
            return $file['name'];
        }, $annexes);
        $body .= 'Anexos: ' . implode(', ', $names) . "\n";
    } else {
        $body .= "Anexos: (ninguno)\n";
    }
}

if ($formType === 'denuncias') {
    $body .= 'Anónimo: ' . ($anonymous ? 'sí' : 'no') . "\n"
        . "Ubicación: {$location}\n"
        . "Involucrados: {$involved}\n"
        . "Fecha incidencia: {$incidentDate}\n"
        . "Relación: {$relationship}\n";

    if (count($annexes) > 0) {
        $names = array_map(static function ($file) {
            return $file['name'];
        }, $annexes);
        $body .= 'Anexos: ' . implode(', ', $names) . "\n";
    } else {
        $body .= "Anexos: (ninguno)\n";
    }
}

$body .= "\nMensaje:\n{$message}\n";

$replyTo = $email !== '' ? $email : $from;

if (count($annexes) > 0) {
    $boundary = 'tecnolpet_' . md5((string)microtime(true));
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
        'From: Tecnolpet Web <' . $from . '>',
        'Reply-To: ' . $replyTo,
        'X-Mailer: PHP/' . phpversion(),
    ];

    $payload = "--{$boundary}\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: 8bit\r\n\r\n"
        . $body . "\r\n";

    foreach ($annexes as $file) {
        $payload .= "--{$boundary}\r\n"
            . 'Content-Type: ' . $file['mime'] . '; name="' . $file['name'] . "\"\r\n"
            . "Content-Transfer-Encoding: base64\r\n"
            . 'Content-Disposition: attachment; filename="' . $file['name'] . "\"\r\n\r\n"
            . chunk_split(base64_encode($file['content'])) . "\r\n";
    }
    $payload .= "--{$boundary}--";
} else {
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'From: Tecnolpet Web <' . $from . '>',
        'Reply-To: ' . $replyTo,
        'X-Mailer: PHP/' . phpversion(),
    ];
    $payload = $body;
}

$sent = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $payload, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Mail failed']);
    exit;
}

echo json_encode(['ok' => true]);
