<?php

include_once APP_LIB_PATH . '/AuthenticationHeader.php';

$app->post('/login', function ()
{
	session_start();

	try {

	} catch (Exception $e){
		ReportError($e, 'Failed to create Authentication service.');
	}

	$data = GetData();

	if (empty($data->username)) {
		ReportError(new Exception('Missing required "username" property.'), null, 400);
	} elseif (empty($data->password)) {
		ReportError(new Exception('Missing required "password" property.'), null, 400);
	}

	$data->username = EscapeSoapString($data->username);
	$data->password = EscapeSoapString($data->password);

	try {
		$result = $client->Login($data);
		$appResponse = new AppResponse($result);

		if ($result->StatusCode == "LOGINOK") {
			$_SESSION['realUsername'] = $data->username;
			$_SESSION['username'] = UnescapeString($result->TempCredentials->username);
			$_SESSION['password'] = UnescapeString($result->TempCredentials->password);
			$appResponse->data = [$result->TempCredentials];
			$appResponse->SetStatus(200);
		} else {
			ReportError(new \Exception("$result->StatusCode"), null, 401);
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
		$CredentialsType = new CredentialsType();
		$CredentialsType->Username = $_SESSION['username'];
		$CredentialsType->Password = $_SESSION['password'];
		$result = $client->Logout($CredentialsType);
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
