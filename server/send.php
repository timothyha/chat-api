<?php

# Test: curl --data "session=value1&message=value2&private=value3&to=value4" https://jesuschrist.ru/chapi/send

include "common.php";

$sid = intval($_POST['session']);
list($login, $nextlogin, $color) = check_user_session($sid);

if($nextlogin > time()) {
    echo json_encode(array("err"=>"ERR_USER_BANNED", "nextlogin"=>$nextlogin));
    die();    
}

$private = ($_POST['private']==1);
$to = input_conv($_POST['to']);
$message = input_conv($_POST['message']);

try {

    $timestamp = time();

    // update user presence
    $q = $db->prepare("UPDATE chatusers SET conline=1, cpresence=?, cip=? WHERE cnick=?");
    $q->bindValue(1, $timestamp, PDO::PARAM_INT);
    $q->bindValue(2, ip2long($_SERVER['REMOTE_ADDR']), PDO::PARAM_INT);
    $q->bindValue(3, $login, PDO::PARAM_STR);
    $q->execute();

    // send the message
    if($private)
        $q = $db->prepare("INSERT INTO chatpriv(mtime,mfrom,mto,mcolor,mtext,mhtml,mprivate) VALUES(?,?,?,?,?,?,?)");
    else
        $q = $db->prepare("INSERT INTO chatmsgs(mtime,mfrom,mto,mcolor,mtext,mhtml,mprivate,room) VALUES(?,?,?,?,?,?,?,0)");

    $q->bindValue(1, $timestamp, PDO::PARAM_INT);
    $q->bindValue(2, $login, PDO::PARAM_STR);
    $q->bindValue(3, $to, PDO::PARAM_STR);
    $q->bindValue(4, $color, PDO::PARAM_STR);
    $q->bindValue(5, $message, PDO::PARAM_STR);
    $q->bindValue(6, 0, PDO::PARAM_INT);
    $q->bindValue(7, $private, PDO::PARAM_INT);
    $q->execute();

    // save history
    $q = $db->prepare("INSERT DELAYED INTO chathistory(mtime,mfrom,mto,mcolor,mtext,mhtml,mprivate,room) VALUES(?,?,?,?,?,?,?,0)");
    $q->bindValue(1, $timestamp, PDO::PARAM_INT);
    $q->bindValue(2, $login, PDO::PARAM_STR);
    $q->bindValue(3, $to, PDO::PARAM_STR);
    $q->bindValue(4, $color, PDO::PARAM_STR);
    $q->bindValue(5, $message, PDO::PARAM_STR);
    $q->bindValue(6, 0, PDO::PARAM_INT);
    $q->bindValue(7, $private, PDO::PARAM_INT);
    $q->execute();

    echo json_encode(array("stamp"=>$timestamp));

} catch(PDOException $e) {

    echo json_encode(array("err"=>"ERR_MYSQL_ERROR"));

}