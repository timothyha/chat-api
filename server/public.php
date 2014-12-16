<?php

# Test: curl --data "session=value1&laststamp=value2&limit=value3" https://jesuschrist.ru/chapi/public

include "common.php";

$sid = intval($_POST['session']);
check_user_session($sid);

$laststamp = intval($_POST['laststamp']);
$msglimit = intval($_POST['limit']);
if($msglimit==0) $msglimit = 100;

# get current public messages
try {

    $q = $db->prepare("SELECT c.mtime as stamp, c.mfrom as from_user, c.mto as to_user, c.mtext as message, c.mcolor as color, u.cid as id 
        FROM chatmsgs c join chatusers u on c.mfrom = u.cnick WHERE (hidden=0) AND ((mprivate=0) OR (mfrom='')) AND mtime > ? ORDER BY mtime DESC LIMIT ?");
    $q->bindValue(1, $laststamp, PDO::PARAM_INT);
    $q->bindValue(2, $msglimit, PDO::PARAM_INT);
    $q->execute();

    $rows = $q->fetchAll(PDO::FETCH_ASSOC);
    if(count($rows)) {

        $users = array();

        foreach ($rows as $row) {           
            $messages[] = array(
                    "stamp" => $row['stamp'],
                    "from" => output_conv($row['from_user']),
                    "fromid" => $row['id'],
                    "to" => output_conv($row['to_user']),
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