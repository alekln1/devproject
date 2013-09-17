<?php
$app['debug']=true;
$app->get('/', 'App\IndexController::indexAction');
$app->get('/connections', 'App\IndexController::getConnection');
$app->put('/connections/{id}', 'App\IndexController::setConnection');


//$app->
$app->error(function (\Exception $e, $code) use ($app) {
    if ($app['debug']) {

        return ;
    }

    $page = 404 == $code ? '404.html' : '500.html';

    return new Response($app['twig']->render($page, array('code' => $code)), $code);
});