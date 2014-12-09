<?php

// open DB, prepare something common to all API commands

header("Content-type: text/html, charset=UTF-8");

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