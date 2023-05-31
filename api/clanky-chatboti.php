<?php
require_once 'vendor/autoload.php';
require_once 'common.php';

$userId = checkAuth();

if (!$userId) {
    http_response_code(401);
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // CREATE
    $db->insert('clanky_chatboti', (array) $data)->execute();
    http_response_code(204);
    header('Content-Type: application/json');
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    list($chatbot_id, $clanek_id) = explode('-', $_GET['id']);
    $db->delete('clanky_chatboti')->where('chatbot_id = %u AND clanek_id = %u', $chatbot_id, $clanek_id)->execute();
    http_response_code(204);
} else {
    // INVALID METHOD
    http_response_code(405);
}