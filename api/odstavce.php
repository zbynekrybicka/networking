<?php
require_once 'vendor/autoload.php';
require_once 'common.php';

$userId = checkAuth();

if (!$userId) {
    http_response_code(401);
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // CREATE
    $data = [
        'tema_id' => $data->tema_id,
        'nadpis' => $data->nadpis,
        'video' => $data->video,
    ];
    $db->insert('temata_slajdy', $data)->execute();
    $data['id'] = $db->getInsertId();
    http_response_code(201);
    header('Content-Type: application/json');
    echo json_encode($data);
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // UPDATE
    $db->update('temata_slajdy', [
        'nadpis' => $data->nadpis,
        'video' => $data->video,
    ])->where('id = ?', $data->id)->execute();
    http_response_code(204);
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // DELETE
    $slajd_id = $_GET['id'];
    $db->delete('temata_slajdy')->where('id = %u', $slajd_id)->execute();
    $db->delete('temata_slajdy_bullets')->where('slajd_id = %u', $slajd_id)->execute();
    http_response_code(204);
} else {
    // INVALID METHOD
    http_response_code(405);
}