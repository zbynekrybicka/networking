<?php
require_once 'vendor/autoload.php';
require_once 'common.php';

$userId = checkAuth();

if (!$userId) {
    http_response_code(401);
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // CREATE
    $data = [
        'tema' => $data->tema,
        'osoba_id' => $userId,
    ];
    $db->insert('temata', $data)->execute();
    $data['id'] = $db->getInsertId();
    http_response_code(201);
    header('Content-Type: application/json');
    echo json_encode($data);
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // UPDATE
    $db->update('temata', [
        'tema' => $data->tema,
    ])->where('id = ?', $data->id)->execute();
    http_response_code(204);
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // DELETE
    $tema_id = $_GET['id'];

    $slajdyIds = $db->select('id')->from('temata_slajdy')->where('tema_id = %u', $tema_id)->fetchPairs(null, 'id');
    $db->delete('temata_slajdy_bullets')->where('slajd_id IN %in', $slajdyIds)->execute();
    
    $db->delete('temata_slajdy')->where('tema_id = %u', $tema_id)->execute();
    $db->delete('temata_reels')->where('tema_id = %u', $tema_id)->execute();
    $db->delete('temata_stories')->where('tema_id = %u', $tema_id)->execute();

    $db->delete('temata')->where('id = ?', $tema_id)->execute();

    http_response_code(204);
} else {
    // INVALID METHOD
    http_response_code(405);
}
