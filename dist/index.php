<?php

define('CRAFT_ENVIRONMENT', call_user_func_array(function($a,$b){if(array_key_exists('APP_ENV',$_SERVER)&&in_array($c=$_SERVER['APP_ENV'],array_keys($a))){return $c;}foreach($a as $c=>$d){$e=$_SERVER['SERVER_NAME'];if((is_array($d)&&in_array($e,$d))||$e==$d){return $c;}}return $b;}, array(

    // Environment Definitions
    array(
    		'local'     => array('jamescgarrett.craft.dev'),
            'dev'     => array(''),
        ),

    // Default Environment
    'production',

)));

// Path to your craft/ folder – Change in production
$craftPath = '../../_craft';



// Remove in production
define('CRAFT_CONFIG_PATH', __DIR__ . '/../_craftcms/config/');
define('CRAFT_STORAGE_PATH', __DIR__ . '/../_craftcms/storage/');
define('CRAFT_TEMPLATES_PATH', __DIR__ . '/../_craftcms/templates/');


// Do not edit below this line
$path = rtrim($craftPath, '/').'/app/index.php';

if (!is_file($path))
{
	if (function_exists('http_response_code'))
	{
		http_response_code(503);
	}

	exit('Could not find your craft/ folder. Please ensure that <strong><code>$craftPath</code></strong> is set correctly in '.__FILE__);
}

require_once $path;
