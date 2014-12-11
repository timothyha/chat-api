<?php

# Test: curl --data "session=value1" https://jesuschrist.ru/chapi/users

include "common.php";

$sid = intval($_POST['session']);

# is user logged in?
try {

    $q = $db->prepare("select sid from chatusers where sid = ?");
    $q->bindValue(1, $sid, PDO::PARAM_INT);
    $q->execute();

    $rows = $q->fetchAll(PDO::FETCH_ASSOC);
    if(!count($rows)) {
        echo json_encode(array("err"=>"ERR_USER_NOT_CONNECTED"));
        die();
    }
} catch(PDOException $e) {

    echo json_encode(array("err"=>"ERR_MYSQL_ERROR"));
    die();
}

# get current users list
try {

    $q = $db->prepare("select cid as id, cnick as login, csex as sex, clevel as level, cpresence as lastseen, cbday as birth_day, cbmonth as birth_month from chatusers where conline=1 order by cnick");
    $q->execute();

    $rows = $q->fetchAll(PDO::FETCH_ASSOC);
    if(count($rows)) {

        $users = array();

        foreach ($rows as $row) {
            if($row['birth_month']==0) $row['birth_month'] = 1;
            if($row['birth_day']==0) $row['birth_day'] = 1;
            
            $users[] = array(
                    "id"    => $row['id'],
                    "login" => output_conv($row['login']),
                    "level" => textlevel($row['level']),
                    "sex" => $row['sex'],
                    "lastseen" => date("Y-m-d H:i", $row['lastseen']),
                    "birthday" => date("Y-m-d", mktime(1,1,1, $row['birth_month'], $row['birth_day'], date("Y")))
                );
        }

        echo json_encode($users);
    }
    else
        echo json_encode(array("err"=>"ERR_USERS_NOBODY"));

} catch(PDOException $e) {

    echo json_encode(array("err"=>"ERR_MYSQL_ERROR"));

}