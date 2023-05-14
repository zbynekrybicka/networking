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


    $temata = $db->select('*')->from('temata')->where('osoba_id IN %in', $subordinates)->fetchAll();
    $slajdy = $db->select('*')->from('temata_slajdy')->where('tema_id IN %in', array_map(function ($tema) {
        return $tema->id;
    }, $temata))->fetchAll();
    $bullets = $db->select('*')->from('temata_slajdy_bullets')->where('slajd_id IN %in', array_map(function($slajd) {
        return $slajd->id;
    }, $slajdy))->fetchAll();

    $nadrizeni = $db->select('id, jmeno, osoba_id')->from('osoba')->where('id IN %in', $superiors)->fetchAll();
    $podrizeni = $db->select('id, jmeno, osoba_id, role')->from('osoba')->where('id IN %in', $subordinates)->fetchAll();

    $prospekti = $db->select('o.id, jmeno || "<br />" || email || "<br />" || telefon as jmeno, count(z.id) as zpravy, ifnull(max(datum_casu), "-") posledni_zprava')
        ->from('osoba o')
        ->leftJoin('zprava z')->on('o.id = z.osoba_id')
        ->where('o.osoba_id = %u AND role IS NULL', $userId)
        ->groupBy('o.id')
        ->fetchAll();

    $tagy = $db->select('osoba_id, tag')->from('osoba_tag')->where('osoba_id IN %in', array_map(function ($osoba) {
        return $osoba->id;
    }, $prospekti))->fetchAll();
    $tagArray = [];
    foreach ($tagy as $tag) {
        if (!array_key_exists($tag->osoba_id, $tagArray)) {
            $tagArray[$tag->osoba_id] = [];
        }
        $tagArray[$tag->osoba_id][] = $tag->tag;
    }
    foreach ($prospekti as &$prospekt) {
        if (array_key_exists($prospekt->id, $tagArray)) {
            $prospekt->tagy = implode(", ", $tagArray[$prospekt->id]);
        } else {
            $prospekt->tagy = "";
        }
    }

    echo json_encode([ 
        'id' => $userId,
        'superiors' => $superiors,
        'subordinates' => $subordinates,
        'temata' => $temata,
        'slajdy' => $slajdy,
        'bullets' => $bullets,
        'nadrizeni' => $nadrizeni,
        'podrizeni' => $podrizeni,
        'prospekti' => $prospekti,
    ]);
}