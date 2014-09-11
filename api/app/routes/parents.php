<?php

require_once APP_LIB_PATH . '/AppResponse.php';

$app->group('/parents', function() use ($app, $nannyDB) {
	$app->group('/:id', function($id) use ($app) {
		$app->get('', function() use ($app, $id) {
			// TODO: Get parent information for given :id
		});

		$app->get('/children', function() use ($app, $id)) {
			// TODO: Get children for given parent :id
		});
	});	
});