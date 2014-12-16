<?php

# Test: curl --data "session=value1&userid=value2" https://jesuschrist.ru/chapi/info

include "common.php";

$sid = intval($_POST['session']);
check_user_session($sid);

$userid = intval($_POST['userid']);

# get user info
try {

    $q = $db->prepare("select cid as id, cnick as login, crealname as realname, csex as sex, clevel as level, cpresence as lastseen,
        cabout as about, cweb as webpage, cbelief as belief, ctown as town, cregtime as registration_time, 
        cbday as birth_day, cbmonth as birth_month from chatusers where cid=? order by cnick");
    $q->bindValue(1, $userid, PDO::PARAM_INT);
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
                    "photo" => "/chat/gallery/ok/".intval($row['id']).".jpg",
                    "lastseen" => $row['lastseen'],
                    "registration_time" => $row['registration_time'],
                    "birthday" => date("Y-m-d", mktime(1,1,1, $row['birth_month'], $row['birth_day'], date("Y"))),
                    "realname" => output_conv($row['realname']),                    
                    "about" => output_conv($row['about']),                    
                    "webpage" => output_conv($row['webpage']),                    
                    "belief" => output_conv($row['belief']),                    
                    "town" => output_conv($row['town'])                    
                );
        }

        echo json_encode($users);
    }
    else
        echo json_encode(array("err"=>"ERR_USERS_NOBODY"));

} catch(PDOException $e) {

    echo json_encode(array("err"=>"ERR_MYSQL_ERROR"));

}