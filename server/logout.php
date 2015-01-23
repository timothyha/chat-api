<?php

# Test: curl --data "session=value1" https://jesuschrist.ru/chapi/logout

include "common.php";

$sid = intval($_POST['session']);
$user_session = check_user_session($sid);
$login = $user_session['login'];
$nextlogin = $user_session['login'];
$color = $user_session['color'];
$bantext = $user_session['bantext'];

try {

    $q = $db->prepare("update chatusers set conline = 0, cpresence = ?, sid = 0 where sid = ?");
    $stamp = time();
    $q->bindValue(1, $stamp, PDO::PARAM_INT);
    $q->bindValue(2, $sid, PDO::PARAM_INT);
    $q->execute();

    $q = $db->prepare("INSERT INTO chatmsgs(mtime,mfrom,mto,mcolor,mtext,mhtml) VALUES(?,'','','LOGOUT',?,0)");
    $q->bindValue(1, $stamp, PDO::PARAM_INT);
    $q->bindValue(2, $login, PDO::PARAM_STR);
    $q->execute();
    
    echo json_encode(array("stamp"=>$stamp));

} catch(PDOException $e) {

    echo json_encode(array("err"=>"ERR_MYSQL_ERROR"));

}