<?php
ob_start();
if (file_exists("./config.php")) {
    include_once("./config.php");
} elseif (file_exists("./config.default.php")) {
    include_once("./config.default.php");
}

include_once("../nav.php");

//at the end save data 
file_put_contents(FNAV_PATH."/nav.html",ob_get_contents());

//and display
ob_end_flush();

//or clear output
//ob_end_clean();
?>