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

    $q = $db->prepare("select cnick as login, clevel as level from chatusers where cnick = ? and cpass = ?");

    $login = input_conv($login);

    $q->bindValue(1, $login, PDO::PARAM_STR);
    $q->bindValue(2, $password, PDO::PARAM_STR);
    $q->execute();

    $rows = $q->fetchAll(PDO::FETCH_ASSOC);

    if(count($rows)) {

        $login = $rows[0]['login'];
        $level = $rows[0]['level'];

        $login = output_conv($login);

        echo json_encode(array(
            "login"=>$login, 
            "level"=>$level, 
            "err"=>""
            ));
    }
    else
        echo json_encode(array("err"=>"ERR_USER_NOT_FOUND"));

} catch(PDOException $e) {

    echo json_encode(array("err"=>"ERR_MYSQL_ERROR"));

}