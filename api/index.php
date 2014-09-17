<?php

define('APP_BASE_PATH', dirname(__FILE__));
define('APP_LOGS_PATH', APP_BASE_PATH . '/logs');
define('APP_PATH', APP_BASE_PATH . '/app');
define('APP_LIB_PATH', APP_PATH . '/lib');
define('APP_MODELS_PATH', APP_PATH . '/models');
define('APP_ROUTE_PATH', APP_PATH . '/routes');
define('DOCS_PATH', APP_PATH . '/docs');

require_once APP_LIB_PATH . '/Slim/Slim.php';
require_once APP_LIB_PATH . '/Slim/Extras/Log/DateTimeFileWriter.php';

require_once('config.php');

// Library includes
include_once APP_LIB_PATH . '/Utils.php';

// require_once APP_LIB_PATH . '/medoo.php';
// $nannyDB = new medoo(array(
// 	'database_name' => DB_NAME,
// 	'server' => DB_HOST,
// 	'username' => DB_USER,
// 	'password' => base64_decode(DB_PASS)
// ));

// TEST //
$nannyDB = [];

date_default_timezone_set('America/Phoenix');
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim(array('mode' => 'development'));

// TODO: Move to Utils.php? Call from every API
// if (!isset($_SESSION['username']) || !isset($_SESSION['password'])) {
// 	ReportError(new Exception('Invalid credentials. Must login first.'), 401);
// }

// Only invoked if mode is "production"
/*$app->configureMode('production', function () use ($app) {
	$app->config(array(
		'log.enable' => true,
		'debug' => false
	));
});*/

// Only invoked if mode is "development"
$app->configureMode('development', function () use ($app) {
	$app->config(array(
		'debug' => true,
	));

	if (!is_dir('./logs')) {
		mkdir('./logs', 0777, true);
	}

	$log = $app->getLog();
	$log->setEnabled(true);
	$log->setLevel(\Slim\Log::DEBUG);
	$log->setWriter(new \Slim\Extras\Log\DateTimeFileWriter(array('path' => './logs')));
});

// Route definitions
require_once APP_ROUTE_PATH . '/authentication.php';
require_once APP_ROUTE_PATH . '/parents.php';
require_once APP_ROUTE_PATH . '/nannies.php';
//require_once APP_ROUTE_PATH . '/children.php';
// require_once APP_ROUTE_PATH . '/nanny.php';

$app->response->headers->set('Access-Control-Allow-Origin', '*');
$app->response->headers->set('Content-Type', 'application/json');
$app->run();
