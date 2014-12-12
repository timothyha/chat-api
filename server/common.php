<?php

// open DB, prepare something common to all API commands

header("Content-type: application/json, charset=UTF-8");

if($_SERVER['HTTPS']!=="on") {
    echo json_encode(array("err"=>"ERR_SSL_REQUIRED"));
    die();
}

include $_SERVER['DOCUMENT_ROOT']."/chapi_params.php";

try {

    $db = new PDO("mysql:host=localhost;dbname=".$dbname.";charset=windows1251", 
            $dbuser, $dbpass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES CP1251'));

    $DBCHARSET = "windows-1251";

} catch(PDOException $e) {

    echo json_encode(array("err"=>"ERR_MYSQL_ERROR"));
    die();

}

function input_conv($s) {
    global $DBCHARSET;
    return ($DBCHARSET==="utf-8") ? $s : iconv("utf-8", $DBCHARSET, $s);
}

function output_conv($s) {
    global $DBCHARSET;
    return ($DBCHARSET==="utf-8") ? $s : iconv($DBCHARSET, "utf-8", $s);
}

# is user logged in?
# if not, then die, if logged in, do nothing
function check_user_session($sid) {
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
}

function is_admin($level) { return ($level >= 2); }
function is_superadmin($level) { return ($level >= 9); }
function textlevel($level) {
    if($level >= 9)
        return "SUPERADMIN";
    else if($level >= 2)
        return "ADMIN";
    else
        return "";
}