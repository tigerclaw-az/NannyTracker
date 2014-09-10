<?php

require_once APP_LIB_PATH . '/AppResponse.php';


// need help i think i did this right but i dont know where to put getting all children
$app->group('/children', function() use ($app, $nannyDB) {

	// find child with id
	$app->get('/children/:id', function($id) {

	});

	// update child with id
	$app->post('/children/:id', function($id) {

	});

	// delete child with id
	$app->delete('/children/:id', function($id) {

	});

});