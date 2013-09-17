<?php

// configure your app for the production environment

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
		'driver'    => 'pdo_mysql',
		'host'      => 'd29889.mysql.zone.ee',
		'dbname'    => 'd29889sd65511',
		'user'      => 'd29889sa67415',
		'password'  => '6emB6V',
		'charset'   => 'utf8',
    ),
));