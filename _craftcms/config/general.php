<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
    '*' => array(
        'omitScriptNameInUrls' => true,
        'formerly' => array(
            'honeyPotName' => 'unicornseatcandycigars',
        )
    ),
    'local' => array(
        'devMode' => true,
        'cache' => false,
        'siteUrl' => 'http://jamescgarrett.craft.dev',
        'formerly' => array(
            'sendEmails' => false
        )
    ),
    'dev' => array(
        'devMode' => true,
        'cache' => false,
        'siteUrl' => '',
    ),
    'production' => array(
        'cache' => true,
        'siteUrl' => '',
        'cooldownDuration' => 0,
    )
);
