<?php

use Silex\Provider\MonologServiceProvider;
use Silex\Provider\WebProfilerServiceProvider;

// include the prod configuration
require __DIR__.'/prod.php';

// enable the debug mode
$app['debug'] = true;

$app->register(new MonologServiceProvider(), array(
    'monolog.logfile' => __DIR__.'/../logs/silex_dev.log',
));

$app->register($p = new WebProfilerServiceProvider(), array(
    'profiler.cache_dir' => __DIR__.'/../cache/profiler',
));


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

$app->mount('/_profiler', $p);
