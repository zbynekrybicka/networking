<?php
require "common.php";

$userId = checkAuth();

header('Content-Type: application/json');

if (!$userId) {
    http_response_code(401);
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $subOrdinates = getSubordinates($db, $userId);
    $osoba = $db->select('*')->from('osoba')->where('id = %u AND id IN %in', $_GET['id'], $subOrdinates)->fetch();
    if ($osoba) {
        $result = [
            'type' => 'podrizeny',
            'osoba' => $osoba
        ];
        http_response_code(200);
        echo json_encode($result);
        exit();
    }

    $osoba = $db->select('*')->from('osoba')->where('id = %u AND osoba_id = %u AND role IS NULL', $_GET['id'], $userId)->fetch();
    if ($osoba) {
        $zpravy = $db->select('*')->from('zprava')->where('osoba_id = %u AND autor_id = %u', $_GET['id'], $userId)->orderBy('datum_casu DESC, id DESC')->fetchAll();        
        $result= [
            'type' => 'prospekt',
            'osoba' => $osoba,
            'zpravy' => $zpravy,
        ];
        http_response_code(200);
        echo json_encode($result);
        exit();
    }

    $superiors = getSuperiors($db, $userId);
    $osoba = $db->select('id, jmeno, foto')->from('osoba')->where('id = %u AND id IN %in', $_GET['id'], $superiors)->fetch();
    if ($osoba) {
        $result = [
            'type' => 'nadrizeny',
            'osoba' => $osoba
        ];
        http_response_code(200);
        echo json_encode($result);
        exit();
    }

    http_response_code(404);

} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // CREATE

    http_response_code(201);
    echo json_encode($data);
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // UPDATE

    http_response_code(204);
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // DELETE
    http_response_code(204);
} else {
    // INVALID METHOD
    http_response_code(405);
}