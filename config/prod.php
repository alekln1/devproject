<?php

// configure your app for the production environment


$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
		'driver'    => 'pdo_mysql',
		'host'      => '*****',
		'dbname'    => '*****',
		'user'      => '*****',
		'password'  => '*****',		'charset'   => 'utf8',
    ),
));