<?php
require "common.php";

$userId = checkAuth();

if (!$userId) {
    http_response_code(401);
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // CREATE
    $success = 0;
    $error = [];
    foreach ($data as $message) {
        if (!$message->datum_casu) {
            continue;
        }
        $osoba_id = $db->select('id')->from('osoba')->where('messenger = %s', $message->identifikator_na_platforme)->fetchSingle() ?: null;

        $message->datum_casu = date("Y-m-d H:i", strtotime($message->datum_casu));
        $message->platforma_id = 1;
        $message->osoba_id = $osoba_id;
        $message->autor_id = $userId;

        try {
            $db->insert('zprava', (array) $message)->execute();
            $success++;
        } catch (\Exception $e) {
            $error[] = [$e->getMessage(), $message];
        }
    }
    http_response_code(201);
    header('Content-Type: application/json');
    echo json_encode(['success' => $success, 'error' => $error]);
} else {
    // INVALID METHOD
    http_response_code(405);
}