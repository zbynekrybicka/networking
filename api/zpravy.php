<?php
require_once 'vendor/autoload.php';
require_once 'common.php';

$userId = checkAuth();

if (!$userId) {
    http_response_code(401);
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // CREATE
    $data = [
        'zprava_id' => $data->zprava_id,
        'zprava' => $data->zprava,
        'zprava_typ_id' => 1,
    ];

    $db->insert('zpravy', $data)->execute();
    $data['id'] = $db->getInsertId();
    http_response_code(201);
    header('Content-Type: application/json');
    echo json_encode($data);
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $db->update('zpravy', (array) $data)->where('id = %u', $data->id)->execute();
    http_response_code(204);
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $db->delete('zpravy')->where('id = %u', $_GET['id'])->execute();
    http_response_code(204);
} else {
    // INVALID METHOD
    http_response_code(405);
}