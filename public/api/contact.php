<?php
/**
 * AstraLumen Contact Form Handler
 *
 * Deploy to: public/api/contact.php
 * Expects POST with JSON or application/x-www-form-urlencoded body.
 */

declare(strict_types=1);

// ── Configuration (edit for your Hostinger environment) ───────────────────────
const CONTACT_TO_EMAIL     = 'contact@astralumen.science';
const CONTACT_FROM_EMAIL   = 'noreply@astralumen.science';
const CONTACT_FROM_NAME    = 'AstraLumen Contact Form';
const CONTACT_SUBJECT_PREFIX = '[AstraLumen]';
const RATE_LIMIT_MAX       = 5;      // max submissions per window
const RATE_LIMIT_WINDOW    = 3600;   // seconds (1 hour)
const MIN_SUBMIT_TIME_SEC  = 3;      // minimum seconds between page load and submit (bot check)
const MAX_NAME_LENGTH      = 100;
const MAX_EMAIL_LENGTH     = 254;
const MAX_SUBJECT_LENGTH   = 200;
const MAX_MESSAGE_LENGTH   = 5000;
const ALLOWED_ORIGINS      = ['https://astralumen.science', 'https://www.astralumen.science'];
// Set to true in production; false only for local PHP testing
const ENFORCE_HTTPS        = true;
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

// Parse input
$input = getInput();
$data  = normalizeInput($input);

// Honeypot — bots fill hidden "website" field
if (!empty($data['website'])) {
  // Silently accept to avoid tipping off bots
    jsonSuccess('Thank you for your message.');
}

// Timing check — form must not submit instantly
$formLoadedAt = (int)($data['form_loaded_at'] ?? 0);
if ($formLoadedAt > 0 && (time() - $formLoadedAt) < MIN_SUBMIT_TIME_SEC) {
    jsonError('Submission too fast. Please try again.', 429);
}

// Rate limiting via session
if (!checkRateLimit()) {
    jsonError('Too many requests. Please try again later.', 429);
}

// Validation
$errors = validateContact($data);
if (!empty($errors)) {
    jsonError('Validation failed.', 422, ['errors' => $errors]);
}

// Sanitize for email output (XSS protection in email clients)
$name    = sanitizeText($data['name']);
$email   = sanitizeEmail($data['email']);
$subject = sanitizeText($data['subject']);
$message = sanitizeText($data['message']);

if ($email === null) {
    jsonError('Invalid email address.', 422, ['errors' => ['email' => 'Invalid email address.']]);
}

// Build and send email
$mailSubject = CONTACT_SUBJECT_PREFIX . ' ' . $subject;
$mailBody    = buildEmailBody($name, $email, $subject, $message);
$headers     = buildMailHeaders($email, $name);

$sent = @mail(CONTACT_TO_EMAIL, encodeSubject($mailSubject), $mailBody, $headers);

if (!$sent) {
    error_log('[AstraLumen contact] mail() failed for ' . $email);
    jsonError('Unable to send message. Please try again or email us directly.', 500);
}

recordSubmission();
jsonSuccess('Thank you for your message. We will respond within 2 business days.');

// ── Functions ─────────────────────────────────────────────────────────────────

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
        'name'           => trim((string)($input['name'] ?? '')),
        'email'          => trim((string)($input['email'] ?? '')),
        'subject'        => trim((string)($input['subject'] ?? '')),
        'message'        => trim((string)($input['message'] ?? '')),
        'website'        => trim((string)($input['website'] ?? '')), // honeypot
        'form_loaded_at' => $input['form_loaded_at'] ?? 0,
    ];
}

function validateContact(array $data): array
{
    $errors = [];

    if ($data['name'] === '') {
        $errors['name'] = 'Name is required.';
    } elseif (mb_strlen($data['name']) > MAX_NAME_LENGTH) {
        $errors['name'] = 'Name is too long.';
    }

    if ($data['email'] === '') {
        $errors['email'] = 'Email is required.';
    } elseif (mb_strlen($data['email']) > MAX_EMAIL_LENGTH) {
        $errors['email'] = 'Email is too long.';
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format.';
    }

    if ($data['subject'] === '') {
        $errors['subject'] = 'Subject is required.';
    } elseif (mb_strlen($data['subject']) > MAX_SUBJECT_LENGTH) {
        $errors['subject'] = 'Subject is too long.';
    }

    if ($data['message'] === '') {
        $errors['message'] = 'Message is required.';
    } elseif (mb_strlen($data['message']) < 10) {
        $errors['message'] = 'Message must be at least 10 characters.';
    } elseif (mb_strlen($data['message']) > MAX_MESSAGE_LENGTH) {
        $errors['message'] = 'Message is too long.';
    }

    return $errors;
}

function sanitizeText(string $value): string
{
    $value = strip_tags($value);
    $value = htmlspecialchars($value, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    return trim($value);
}

function sanitizeEmail(string $value): ?string
{
    $value = filter_var($value, FILTER_SANITIZE_EMAIL);
    if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
        return null;
    }
    return $value;
}

function buildEmailBody(string $name, string $email, string $subject, string $message): string
{
    $ip        = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $userAgent = sanitizeText($_SERVER['HTTP_USER_AGENT'] ?? 'unknown');
    $timestamp = gmdate('Y-m-d H:i:s') . ' UTC';

    return <<<BODY
New contact form submission from AstraLumen

Name:    {$name}
Email:   {$email}
Subject: {$subject}

Message:
{$message}

---
Submitted: {$timestamp}
IP:        {$ip}
User-Agent: {$userAgent}
BODY;
}

function buildMailHeaders(string $replyEmail, string $replyName): string
{
    $from = CONTACT_FROM_NAME . ' <' . CONTACT_FROM_EMAIL . '>';
    $replyTo = sanitizeText($replyName) . ' <' . $replyEmail . '>';

    $headers = [
        'From: ' . $from,
        'Reply-To: ' . $replyTo,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: AstraLumen-Contact/1.0',
    ];

    return implode("\r\n", $headers);
}

function encodeSubject(string $subject): string
{
    return '=?UTF-8?B?' . base64_encode($subject) . '?=';
}

function checkRateLimit(): bool
{
    $now     = time();
    $window  = RATE_LIMIT_WINDOW;
    $max     = RATE_LIMIT_MAX;
    $key     = 'contact_submissions';

    if (!isset($_SESSION[$key]) || !is_array($_SESSION[$key])) {
        $_SESSION[$key] = [];
    }

    // Remove expired timestamps
    $_SESSION[$key] = array_values(array_filter(
        $_SESSION[$key],
        static fn(int $ts): bool => ($now - $ts) < $window
    ));

    return count($_SESSION[$key]) < $max;
}

function recordSubmission(): void
{
    $key = 'contact_submissions';
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
