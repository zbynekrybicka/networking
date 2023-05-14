<?php
require_once 'vendor/autoload.php';
require_once 'common.php';

$userId = checkAuth();

if (!$userId) {
    http_response_code(401);
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // CREATE
    $data = [
        'slajd_id' => $data->slajd_id,
        'obsah' => $data->obsah,
        'class_name' => ''
    ];
    $db->insert('temata_slajdy_bullets', $data)->execute();
    $data['id'] = $db->getInsertId();
    http_response_code(201);
    header('Content-Type: application/json');
    echo json_encode($data);
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // UPDATE
    $db->update('temata_slajdy_bullets', [
        'class_name' => $data->class_name,
        'obsah' => $data->obsah,
    ])->where('id = ?', $data->id)->execute();
    http_response_code(204);
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // DELETE
    $odstavec_id = $_GET['id'];

    $db->delete('temata_slajdy_bullets')->where('id = ?', $odstavec_id)->execute();
    http_response_code(204);
} else {
    // INVALID METHOD
    http_response_code(405);
}