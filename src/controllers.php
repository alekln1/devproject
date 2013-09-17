<?php
$app['debug']=true;
$app->get('/', 'App\IndexController::indexAction');
$app->get('/getActiveConnections', 'App\IndexController::getConnection');
$app->get('/setConnection', 'App\IndexController::setConnection');

$app->error(function (\Exception $e, $code) use ($app) {
    if ($app['debug']) {

        return ;
    }

    $page = 404 == $code ? '404.html' : '500.html';

    return new Response($app['twig']->render($page, array('code' => $code)), $code);
});