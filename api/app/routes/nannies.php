<?php

require_once APP_LIB_PATH . '/AppResponse.php';

$app->group('/nannies', function() use ($app, $nannyDB) {
	$app->get('/:id', function() use ($app) {
		// TODO: Get nanny data for :id
	});
});