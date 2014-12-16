<?php

# Test: curl --data "login=value1&password=value2" https://jesuschrist.ru/chapi/login

include "common.php";

$login = $_POST["login"];
$password = $_POST["password"];

if($login=="") {
    $login = $_GET["login"];
    $password = $_GET["password"];    
}

try {

    $q = $db->prepare("select cid as id, cnick as login, clevel as level, sid from chatusers where cnick = ? and cpass = ?");

    $login = input_conv($login);

    $q->bindValue(1, $login, PDO::PARAM_STR);
    $q->bindValue(2, $password, PDO::PARAM_STR);
    $q->execute();

    $rows = $q->fetchAll(PDO::FETCH_ASSOC);

    if(count($rows)) {

        // TODO
        // register: table chatusers - update cip, cpresence, sid

        $id    = $rows[0]['id']; 
        $login = $rows[0]['login'];
        $level = $rows[0]['level'];
        $sid   = $rows[0]['sid'];

        // if session id is not there or not fresh, we will create a new sid
        if($sid < time()-86400) {
            $sid = "$id"."000".(time() - rand(5000));

            $q = $db->prepare("update chatusers set sid = ?, cpresence = ? where cnick = ?");
            $q->bindValue(1, $sid, PDO::PARAM_INT);
            $q->bindValue(2, time(), PDO::PARAM_INT);
            $q->bindValue(3, $login, PDO::PARAM_STR);
            $q->execute();
        }

        $login = output_conv($login);

        if(file_exists($_SERVER['DOCUMENT_ROOT']."/chat/gallery/ok/".intval($id).".jpg")) {
            $photopath = "/chat/gallery/ok/".intval($id).".jpg";
        } else $photopath = "";

        echo json_encode(array(
            "photo"=>$photopath, 
            "level"=>textlevel($level), 
            "id"=>$id,
            "session"=>$sid
            ));
    }
    else
        echo json_encode(array("err"=>"ERR_USER_NOT_FOUND"));

} catch(PDOException $e) {

    echo json_encode(array("err"=>"ERR_MYSQL_ERROR"));

}