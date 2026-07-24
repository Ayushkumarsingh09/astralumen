<?php
/**
 * AstraLumen Newsletter Signup Handler
 *
 * Supports Mailchimp, Brevo (Sendinblue), and ConvertKit.
 * Deploy to: public/api/newsletter.php
 */

declare(strict_types=1);

// ── Configuration (edit for your Hostinger environment) ───────────────────────
const NEWSLETTER_PROVIDER = 'mailchimp'; // mailchimp | brevo | convertkit

// Mailchimp
const MAILCHIMP_API_KEY         = 'your_mailchimp_api_key';
const MAILCHIMP_LIST_ID         = 'your_list_id';
const MAILCHIMP_SERVER_PREFIX   = 'us1'; // e.g. us1, us21

// Brevo (formerly Sendinblue)
const BREVO_API_KEY             = 'your_brevo_api_key';
const BREVO_LIST_ID             = 0; // integer list ID

// ConvertKit
const CONVERTKIT_API_KEY        = 'your_convertkit_api_key';
const CONVERTKIT_FORM_ID        = 'your_form_id';

// General
const RATE_LIMIT_MAX            = 3;
const RATE_LIMIT_WINDOW         = 3600;
const ALLOWED_ORIGINS           = ['https://astralumen.science', 'https://www.astralumen.science'];
const ENFORCE_HTTPS             = true;
const DOUBLE_OPT_IN_MESSAGE     = 'Check your inbox to confirm your subscription.';
const SUCCESS_MESSAGE           = 'You are subscribed! Welcome to the AstraLumen cosmos.';
// ─────────────────────────────────────────────────────────────────────────────

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    setCorsHeaders();
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed.', 405);
}

setCorsHeaders();

if (ENFORCE_HTTPS && !isHttps()) {
    jsonError('HTTPS required.', 403);
}

session_start();

$input = getInput();
$data  = normalizeInput($input);

// Honeypot
if (!empty($data['company'])) {
    jsonSuccess(SUCCESS_MESSAGE);
}

if (!checkRateLimit()) {
    jsonError('Too many requests. Please try again later.', 429);
}

$errors = validateNewsletter($data);
if (!empty($errors)) {
    jsonError('Validation failed.', 422, ['errors' => $errors]);
}

$email = sanitizeEmail($data['email']);
if ($email === null) {
    jsonError('Invalid email address.', 422, ['errors' => ['email' => 'Invalid email address.']]);
}

$firstName = sanitizeText($data['first_name'] ?? '');
$result    = subscribeEmail($email, $firstName);

if (!$result['success']) {
    jsonError($result['message'], $result['code'] ?? 500);
}

recordSubmission();
jsonSuccess($result['message'] ?? SUCCESS_MESSAGE);

// ── Provider integrations ─────────────────────────────────────────────────────

function subscribeEmail(string $email, string $firstName): array
{
    return match (NEWSLETTER_PROVIDER) {
        'mailchimp'  => subscribeMailchimp($email, $firstName),
        'brevo'      => subscribeBrevo($email, $firstName),
        'convertkit' => subscribeConvertKit($email, $firstName),
        default      => ['success' => false, 'message' => 'Newsletter provider not configured.', 'code' => 500],
    };
}

function subscribeMailchimp(string $email, string $firstName): array
{
    if (MAILCHIMP_API_KEY === 'your_mailchimp_api_key' || MAILCHIMP_LIST_ID === 'your_list_id') {
        error_log('[AstraLumen newsletter] Mailchimp not configured');
        return ['success' => false, 'message' => 'Newsletter service unavailable.', 'code' => 503];
    }

    $subscriberHash = md5(strtolower($email));
    $url = sprintf(
        'https://%s.api.mailchimp.com/3.0/lists/%s/members/%s',
        MAILCHIMP_SERVER_PREFIX,
        MAILCHIMP_LIST_ID,
        $subscriberHash
    );

    $payload = [
        'email_address' => $email,
        'status'        => 'pending', // double opt-in
        'merge_fields'  => $firstName !== '' ? ['FNAME' => $firstName] : new stdClass(),
    ];

    $response = httpRequest('PUT', $url, $payload, [
        'Authorization: Basic ' . base64_encode('user:' . MAILCHIMP_API_KEY),
    ]);

    if ($response['status'] === 200 || $response['status'] === 201) {
        return ['success' => true, 'message' => DOUBLE_OPT_IN_MESSAGE];
    }

    $body = $response['body'];
    if ($response['status'] === 400 && ($body['title'] ?? '') === 'Member Exists') {
        return ['success' => true, 'message' => 'You are already subscribed.'];
    }

    error_log('[AstraLumen newsletter] Mailchimp error: ' . json_encode($body));
    return ['success' => false, 'message' => 'Subscription failed. Please try again.', 'code' => 502];
}

function subscribeBrevo(string $email, string $firstName): array
{
    if (BREVO_API_KEY === 'your_brevo_api_key' || BREVO_LIST_ID === 0) {
        error_log('[AstraLumen newsletter] Brevo not configured');
        return ['success' => false, 'message' => 'Newsletter service unavailable.', 'code' => 503];
    }

    $payload = [
        'email'         => $email,
        'listIds'       => [BREVO_LIST_ID],
        'updateEnabled' => true,
    ];

    if ($firstName !== '') {
        $payload['attributes'] = ['FIRSTNAME' => $firstName];
    }

    $response = httpRequest('POST', 'https://api.brevo.com/v3/contacts', $payload, [
        'api-key: ' . BREVO_API_KEY,
    ]);

    if (in_array($response['status'], [201, 204], true)) {
        return ['success' => true, 'message' => SUCCESS_MESSAGE];
    }

    $body = $response['body'];
    if ($response['status'] === 400 && ($body['code'] ?? '') === 'duplicate_parameter') {
        return ['success' => true, 'message' => 'You are already subscribed.'];
    }

    error_log('[AstraLumen newsletter] Brevo error: ' . json_encode($body));
    return ['success' => false, 'message' => 'Subscription failed. Please try again.', 'code' => 502];
}

function subscribeConvertKit(string $email, string $firstName): array
{
    if (CONVERTKIT_API_KEY === 'your_convertkit_api_key' || CONVERTKIT_FORM_ID === 'your_form_id') {
        error_log('[AstraLumen newsletter] ConvertKit not configured');
        return ['success' => false, 'message' => 'Newsletter service unavailable.', 'code' => 503];
    }

    $payload = [
        'api_key'    => CONVERTKIT_API_KEY,
        'email'      => $email,
        'first_name' => $firstName,
    ];

    $url = 'https://api.convertkit.com/v3/forms/' . CONVERTKIT_FORM_ID . '/subscribe';
    $response = httpRequest('POST', $url, $payload);

    if ($response['status'] === 200 && ($response['body']['subscription'] ?? null)) {
        return ['success' => true, 'message' => DOUBLE_OPT_IN_MESSAGE];
    }

    error_log('[AstraLumen newsletter] ConvertKit error: ' . json_encode($response['body']));
    return ['success' => false, 'message' => 'Subscription failed. Please try again.', 'code' => 502];
}

// ── HTTP helper ───────────────────────────────────────────────────────────────

function httpRequest(string $method, string $url, array $payload, array $extraHeaders = []): array
{
    $headers = array_merge([
        'Content-Type: application/json',
        'Accept: application/json',
    ], $extraHeaders);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST  => $method,
        CURLOPT_HTTPHEADER     => $headers,
        CURLOPT_POSTFIELDS     => json_encode($payload),
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_CONNECTTIMEOUT => 10,
    ]);

    $raw    = curl_exec($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error  = curl_error($ch);
    curl_close($ch);

    if ($raw === false) {
        error_log('[AstraLumen newsletter] cURL error: ' . $error);
        return ['status' => 0, 'body' => []];
    }

    $body = json_decode($raw, true);
    return ['status' => $status, 'body' => is_array($body) ? $body : []];
}

// ── Shared utilities ──────────────────────────────────────────────────────────

function setCorsHeaders(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, ALLOWED_ORIGINS, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');
}

function isHttps(): bool
{
    if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
        return true;
    }
    return ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https';
}

function getInput(): array
{
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($contentType, 'application/json') !== false) {
        $raw = file_get_contents('php://input');
        $decoded = json_decode($raw ?: '{}', true);
        return is_array($decoded) ? $decoded : [];
    }
    return $_POST;
}

function normalizeInput(array $input): array
{
    return [
        'email'      => trim((string)($input['email'] ?? '')),
        'first_name' => trim((string)($input['first_name'] ?? $input['firstName'] ?? '')),
        'company'    => trim((string)($input['company'] ?? '')), // honeypot
    ];
}

function validateNewsletter(array $data): array
{
    $errors = [];

    if ($data['email'] === '') {
        $errors['email'] = 'Email is required.';
    } elseif (mb_strlen($data['email']) > 254) {
        $errors['email'] = 'Email is too long.';
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format.';
    }

    if ($data['first_name'] !== '' && mb_strlen($data['first_name']) > 80) {
        $errors['first_name'] = 'First name is too long.';
    }

    return $errors;
}

function sanitizeText(string $value): string
{
    $value = strip_tags($value);
    return trim(htmlspecialchars($value, ENT_QUOTES | ENT_HTML5, 'UTF-8'));
}

function sanitizeEmail(string $value): ?string
{
    $value = filter_var($value, FILTER_SANITIZE_EMAIL);
    if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
        return null;
    }
    return $value;
}

function checkRateLimit(): bool
{
    $now    = time();
    $key    = 'newsletter_submissions';

    if (!isset($_SESSION[$key]) || !is_array($_SESSION[$key])) {
        $_SESSION[$key] = [];
    }

    $_SESSION[$key] = array_values(array_filter(
        $_SESSION[$key],
        static fn(int $ts): bool => ($now - $ts) < RATE_LIMIT_WINDOW
    ));

    return count($_SESSION[$key]) < RATE_LIMIT_MAX;
}

function recordSubmission(): void
{
    $key = 'newsletter_submissions';
    if (!isset($_SESSION[$key]) || !is_array($_SESSION[$key])) {
        $_SESSION[$key] = [];
    }
    $_SESSION[$key][] = time();
}

function jsonSuccess(string $message): void
{
    echo json_encode(['success' => true, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function jsonError(string $message, int $code = 400, array $extra = []): void
{
    http_response_code($code);
    echo json_encode(array_merge(['success' => false, 'message' => $message], $extra), JSON_UNESCAPED_UNICODE);
    exit;
}
