<?php
require_once 'vendor/autoload.php';
require_once 'common.php';

$userId = checkAuth();

if (!$userId) {
    http_response_code(401);
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // CREATE
    $dataZprava = [
        'zprava_id' => null,
        'zprava_typ_id' => 1,
        'zprava' => ''
    ];
    $db->insert('zpravy', $dataZprava)->execute();    

    $dataZprava['id'] = $db->getInsertId();
    $dataZpravaChatbot = [
        'zprava_id' => $dataZprava['id'],
        'chatbot_id' => $data->chatbot_id,
        'titulek' => '',
    ];
    $db->insert('zpravy_chatboti', $dataZpravaChatbot)->execute();
    http_response_code(201);
    header('Content-Type: application/json');
    echo json_encode([ 'zpravy' => $dataZprava, 'zpravy_chatboti' => $dataZpravaChatbot ]);
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $db->update('zpravy_chatboti', (array) $data)->where('zprava_id = %u', $data->zprava_id)->execute();
    http_response_code(204);
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $db->delete('zpravy')->where('id = %u', $_GET['id'])->execute();
    http_response_code(204);
} else {
    // INVALID METHOD
    http_response_code(405);
}