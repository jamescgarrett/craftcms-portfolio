<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

return array(
	'*' => array(
        'tablePrefix' => 'jcg_',
        'server' => 'localhost',
    ),
    'local' => array(
		'user' => 'homestead',
		'password' => 'secret',
		'database' => 'jamescgarrett',
    ),
    'dev' => array(
        'user' => '',
        'password' => '',
        'database' => '',
    ),
    'production' => array(
        'user' => '',
        'password' => '',
        'database' => '',
    )
);