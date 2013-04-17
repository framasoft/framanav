<?php
	/**
	 * FRAMANAV DEPLOYMENT SCRIPT
	 *
	 * Used if git is not available
	 * Make sure this script is not executable from web, or .htaccess protected
	 */
 if (file_exists("./config.php")) {
    include_once("./config.php");
 } elseif (file_exists("./config.default.php")) {
    include_once("./config.default.php");
 }
 
 
	// The commands
	$commands = array(
		'echo $PWD',
		'echo '.FNAV_PATH.'',
		'whoami',
		'wget --no-check-certificate https://github.com/framasoft/framanav/archive/master.zip',
		'mv ./master ./master.zip',
		'unzip master.zip',
		'chown -R '.FNAV_USER.':'.FNAV_GROUP.' ./framanav-master',
		'cp -r ./framanav-master/* ../',
		'rm ./master.zip',
		'rm -rf ./framanav-master'
	);
 
	// Run the commands for output
	$output = '';
	foreach($commands AS $command){
		// Run it
		$tmp = shell_exec($command);
		// Output
		$output .= "<span style=\"color: #6BE234;\">\$</span> <span style=\"color: #729FCF;\">{$command}\n</span>";
		$output .= htmlentities(trim($tmp)) . "\n";
	}
 
	// Make it pretty for manual user access (and why not?)
?>
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>GIT DEPLOYMENT SCRIPT</title>
</head>
<body style="background-color: #000000; color: #FFFFFF; font-weight: bold; padding: 0 10px;">
<pre>
 .  ____  .    ____________________________
 |/      \|   |                            |
[| <span style="color: #FF0000;">&hearts;   &hearts;</span> |]  | Git Deployment Script v0.1 |
 |___==___|  /              &copy; oodavid 2012 |
              |____________________________|
 
<?php echo $output; ?>
</pre>
</body>
</html>
