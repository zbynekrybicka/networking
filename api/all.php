<?php
require_once 'vendor/autoload.php';
require_once 'common.php';

$userId = checkAuth();
if (!$userId) {
    http_response_code(401);
} else {

    // Máme pole ID podřízených $subordinates
    $subordinates = getSubordinates($db, $userId);

    // Máme pole ID nadřízených $superiors
    $superiors = getSuperiors($db, $userId);

    // $osoby = $db->select('*')->from('osoby')->where('id IN %in', array_merge($superiors, $subordinates))->fetchAll();

    $chatboti = $db->select('*')->from('chatboti')->fetchAll();
    $zpravy = $db->select('*')->from('zpravy')->fetchAll();
    $zpravyChatboti = $db->select('*')->from('zpravy_chatboti')->fetchAll();
    $zpravyCisla = $db->select('*')->from('zpravy_cisla')->fetchAll();
    $zpravyMnoziny = $db->select('*')->from('zpravy_mnoziny')->fetchAll();
    $zpravyPattern = $db->select('*')->from('zpravy_pattern')->fetchAll();
    $zpravyTypy = $db->select('*')->from('zpravy_typy')->fetchAll();

    echo json_encode([ 
        'id' => $userId,
        // 'superiors' => $superiors,
        // 'subordinates' => $subordinates,
        // 'osoby' => $osoby,
        'chatboti' => $chatboti,
        'zpravy' => $zpravy,
        'zpravy_chatboti' => $zpravyChatboti,
        'zpravy_cisla' => $zpravyCisla,
        'zpravy_mnoziny' => $zpravyMnoziny,
        'zpravy_pattern' => $zpravyPattern,
        'zpravy_typy' => $zpravyTypy,
    ]);
}