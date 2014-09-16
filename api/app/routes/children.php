<?php

require_once APP_LIB_PATH . '/AppResponse.php';


$app->group('/children', function() use ($app, $nannyDB) {

	// find child with id
	$app->map('/:id', function($id) use($app) {
		if ($app->isPost()) {
			// TODO: Update child
		} elseif ($app->isDelete()) {
			// TODO: Delete child
		} else {
			// TODO: Get child with :id
		}
	})->via('DELETE', 'GET', 'POST');
});