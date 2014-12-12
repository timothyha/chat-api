<?php

# Test: curl --data "session=value1" https://jesuschrist.ru/chapi/private

include "common.php";

$sid = intval($_POST['session']);
$login = check_user_session($sid);

$laststamp = intval($_POST['laststamp']);

# get current private messages
try {

    $q = $db->prepare("SELECT mtime as stamp, mfrom as from_user, mto as to_user, mtext as message, mcolor as color FROM chatpriv WHERE ? in (mfrom, mto) AND mtime > ? ORDER BY mtime");
    $q->bindValue(1, $login, PDO::PARAM_STR);
    $q->bindValue(2, $laststamp, PDO::PARAM_INT);
    $q->execute();

    $rows = $q->fetchAll(PDO::FETCH_ASSOC);
    if(count($rows)) {

        $users = array();

        foreach ($rows as $row) {           
            $messages[] = array(
                    "stamp" => date("Y-m-d H:i", $row['stamp']),
                    "from" => output_conv($row['from_user']),
                    "to" => textlevel($row['to_user']),
                    "message" => output_conv($row['message']),
                    "color" => $row['color']
                );
        }
        echo json_encode($messages);
    }
    else
        echo json_encode(array("err"=>"ERR_MESSAGES_EMPTY"));

} catch(PDOException $e) {

    echo json_encode(array("err"=>"ERR_MYSQL_ERROR"));

}