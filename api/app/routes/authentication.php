<?php

require_once APP_LIB_PATH . '/AppResponse.php';

$app->post('/login', function () use ($nannyDB)
{
	@session_start();

	$data = GetHTTPData();

	if (empty($data->username)) {
		ReportError(new Exception('Missing required "username" property.'), null, 400);
	} elseif (empty($data->password)) {
		ReportError(new Exception('Missing required "password" property.'), null, 400);
	}

	$data->username = EscapeHtml($data->username);
	$data->password = EscapeHtml($data->password);

	try {
		// $result = $pppoauth->Login($data);
		$result = (object) array(
			'username' => $data->username,
			'password' => base64_encode(pack('H*', "bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3")),
			'userType' => floor(rand(0, 1)) === 1 ? 'parent' : 'nanny'
		);
		
		$appResponse = new AppResponse($result);

		if ($result) {
			$_SESSION['realUsername'] = $data->username;
			$_SESSION['username'] = UnescapeHtml($result->username);
			$_SESSION['password'] = UnescapeHtml($result->password);
			$appResponse->data = [$result];
			$appResponse->SetStatus(200);
		} else {
			ReportError(new \Exception("Invalid login credentials"), null, 401);
		}

	   echo json_encode($appResponse);
	} catch (Exception $e) {
		ReportError($e, 'Failed to call Login.');
	}
});

$app->get('/logout', function ()
{
	// Clear ALL session data
	@session_start();

	try {

	} catch (Exception $e) {
		ReportError($e,"Failed to create Authentication service." );
	}

	if (isset($_SESSION['username']) && isset($_SESSION['password'])) {
		$result = $auth->Logout();
		$appResponse = NewSuccessAppResponse($result);
		$appResponse->data = [];
		if ($result == "LOGOUTCOMPLETE") {
			@session_destroy();
			$_SESSION = array();
			session_write_close();
			setcookie(session_name(),'',0,'/');
			session_regenerate_id(true);

			$appResponse->SetStatus(200);
			$appResponse->statusText = $result;
		} else {
			$appResponse->SetStatus(401);
			$appResponse->statusText = $result;
		}

		echo json_encode($appResponse);
	} else {
		ReportError(new Exception('No user logged in.'), null, 401);
	}
});

$app->get('/validate', function()
{
	try {
		/* TODO: Add check for user logged in */
		// echo json_encode(NewSuccessAppResponse($response), JSON_PRETTY_PRINT);
	} catch (Exception $e){
		ReportError($e, null);
	}
});

$app->post('/reset', function()
{
	$data = GetHTTPData();

	if (empty($data->username)) {
		ReportError(new Exception('Missing required "username" property.'), null, 400);
	}

	$email = EscapeHtml($data->username);

	try {
		// Add email, hash, and expires to JSON file (resetPassword.json)
		//read json
		$file  = file_get_contents("resetPassword.json");
		$userInfoAry = json_decode($file, true);

		// make new info obj
		$userInfo = (object) array(
			'email' => $email,
			'hash' => rtrim(base64_encode(md5(microtime())),"="),
			'expires' => 'never'
		);

		//insert into json
		array_push($userInfoAry, $userInfo);
		 
		$result = json_encode($userInfoAry);
		file_put_contents('resetPassword.json', $result);

		// TODO: Send email to user (hint: use mail())
		echo json_encode(NewSuccessAppResponse(null));
	} catch (Exception $e){
		ReportError($e, null);
	}	
});