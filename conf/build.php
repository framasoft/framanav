<?php
ob_start();
if (file_exists("./config.php")) {
    include_once("./config.php");
} elseif (file_exists("./config.default.php")) {
    include_once("./config.default.php");
}

include_once("../nav.php");

//at the end save data 
file_put_contents("../nav.inc.html",ob_get_contents());

//and display
ob_end_flush();

#$output = shell_exec('java -jar yuicompressor-2.4.7.jar --charset utf-8 --type js -o ../nav.min.js ../nav.js');
#echo "<pre>$output</pre>";

#$output = shell_exec('java -jar yuicompressor-2.4.7.jar --charset utf-8 --type css -o ../nav.min.css ../nav.css');
#echo "<pre>$output</pre>";

#$output = shell_exec('java -jar htmlcompressor-1.5.2.jar  ../nav.html > ../nav.min.html');
#echo "<pre>$output</pre>";



?>