<?php

require_once APP_LIB_PATH . '/AppResponse.php';

$app->group('/nannies', function() use ($app, $nannyDB) {
	$app->get('/:id', function($id) use ($app) {

		$result = null;

			try {
				$file  = file_get_contents(APP_PATH . '/db/users.json');
				$users = json_decode($file, true);

				foreach ($users as $user) {
					if ($user['id'] === intval($id)) {
						$result = (object) $user;
						continue;
					}
				}

				$appResponse = new AppResponse($result);

				if ($result) {
					$appResponse->data = [$result];
					$appResponse->SetStatus(200);
				} else {
					ReportError(new \Exception('Invalid credentials, please try again'), 401);
				}		

			    echo json_encode($appResponse);
			} catch (Exception $e) {
				ReportError($e, 500);
			}
	});
});