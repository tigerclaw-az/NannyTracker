<?php

require_once APP_LIB_PATH . '/AppResponse.php';

$app->post('/login', function () use ($nannyDB)
{
	if (!function_exists('password_verify')) {
		require_once APP_LIB_PATH . '/PasswordHashing/passwordLib.php';
	}

	@session_start();

	$data = GetHTTPData();
	$result = null;

	if (empty($data->username)) {
		ReportError(new Exception('Missing required "username" property.'), 400);
	} elseif (empty($data->password)) {
		ReportError(new Exception('Missing required "password" property.'), 400);
	}

	$data->username = EscapeHtml($data->username);
	$data->password = EscapeHtml($data->password);

	try {
		$file  = file_get_contents(APP_PATH . '/db/users.json');
		$users = json_decode($file, true);

		foreach ($users as $user) {
			if ($user['email'] === $data->username && $user['active'] &&
				password_verify($data->password, $user['password'])) {
					$result = (object) $user;
					continue;
				}
		}

		$appResponse = new AppResponse($result);

		if ($result) {
			$_SESSION['realUsername'] = $data->username;
			$_SESSION['username'] = UnescapeHtml($result->email);
			$_SESSION['password'] = UnescapeHtml($result->password);
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

$app->get('/logout', function ()
{
	// Clear ALL session data
	@session_start();	

	if (isset($_SESSION['username']) && isset($_SESSION['password'])) {
		// $result = $auth->Logout();
		$appResponse = NewSuccessAppResponse(null);
		$appResponse->data = [];

		// if ($result == "LOGOUTCOMPLETE") {
			@session_destroy();
			$_SESSION = array();
			@session_write_close();
			@setcookie(session_name(),'',0,'/');
			@session_regenerate_id(true);

			$appResponse->SetStatus(200);
			$appResponse->statusText = 'LOGOUTCOMPLETE';
		// } else {
		// 	$appResponse->SetStatus(401);
		// 	$appResponse->statusText = $result;
		// }

		echo json_encode($appResponse);
	} else {
		ReportError(new Exception('No user logged in.'), null, 401);
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
		$file  = file_get_contents(APP_PATH . '/db/resetPassword.json');
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
		file_put_contents(APP_PATH.'/db/resetPassword.json', $result);

		/// Send reset email to user 
	    $from = 'Nanny Tracker'; // sender
	    $subject = 'Nanny Tracker password reset';
	    $message = "please click the link below to reset your password\n\n<a href='nannytracker.com/reset'>Reset password</a>";
	    $message = wordwrap($message, 70);

	    mail($email,$subject,$message,"From: $from\n");
	    
		echo json_encode(NewSuccessAppResponse(null));
	} catch (Exception $e){
		ReportError($e, null);
	}
});

$app->post('/signup', function()
{
	// i think this need to be seperated into 2 apis
	// one for sending email and once you get back to site from email we need to do all the stuff i have below:
	$data = GetHTTPData();
	$result = null;

	if (empty($data->email)) {
		ReportError(new Exception('Missing required "email" property.'), 400);
	} elseif (empty($data->password)) {
		ReportError(new Exception('Missing required "password" property.'), 400);
	} elseif (empty($data->firstname)) {
		ReportError(new Exception('Missing required "firstname" property.'), 400);
	} elseif (empty($data->lastname)) {
		ReportError(new Exception('Missing required "lastname" property.'), 400);
	} elseif (empty($data->address)) {
		ReportError(new Exception('Missing required "address" property.'), 400);
	} elseif (empty($data->city)) {
		ReportError(new Exception('Missing required "city" property.'), 400);
	} elseif (empty($data->state)) {
		ReportError(new Exception('Missing required "state" property.'), 400);
	} elseif (empty($data->phone)) {
		ReportError(new Exception('Missing required "phone" property.'), 400);
	} elseif (empty($data->dob)) {
		ReportError(new Exception('Missing required "dob" property.'), 400);
	} elseif (empty($data->gender)) {
		ReportError(new Exception('Missing required "gender" property.'), 400);
	}

	$data->email  	 = EscapeHtml($data->email);
	$data->password  = EscapeHtml($data->password);
	$data->firstname = EscapeHtml($data->firstname);
	$data->lastname  = EscapeHtml($data->lastname);
	$data->address   = EscapeHtml($data->address);
	$data->city      = EscapeHtml($data->city);
	$data->state     = EscapeHtml($data->state);
	$data->phone     = EscapeHtml($data->phone);
	$data->dob       = EscapeHtml($data->dob);
	$data->gender    = EscapeHtml($data->gender);

	try {
		if (!function_exists('password_hash')) {
			require_once APP_LIB_PATH . '/PasswordHashing/passwordLib.php';
		}

		$file  = file_get_contents(APP_PATH . '/db/users.json');
		$curUsers = json_decode($file, true);


		// Validate that email address doesn't already exist, if it does then exit try
		foreach ($curUsers as $user) {
			if ($user['email'] === $data->email) {
				// should break try
				throw new Exception('This email is already being used by another user.');
			}
		}

		// make new user obj
		$newUser = (object) array(
			'email'     => $data->email,
			'password'  => password_hash($data->password, PASSWORD_DEFAULT),
			'firstname' => $data->firstname,
			'lastname'  => $data->lastname,
			'address'   => $data->address,
			'city'      => $data->city,
			'state'     => $data->state,
			'phone'     => $data->phone,
			'dob'       => $data->dob,
			'gender'    => $data->gender,
			'validated' => false
		);

		//insert into json
		array_push($curUsers, $newUser);

		// Add new user with new info to JSON file (users.json)		
		file_put_contents(APP_PATH . '/db/users.json', json_encode($curUsers));

		/// Send confirmation email to user 
		$hash = rtrim(base64_encode(md5(microtime())),"=");
		// TODO: How do we implement confirmation?
	    $from = 'support@nannytracker.com'; // sender
	    $subject = 'Nanny Tracker account confirmation';
	    $message = "Please click the link below to confirm your account\n\n<a href='nannytracker.com/index.php/api/confirm/$hash'>Confirm</a>";
	    $message = wordwrap($message, 70);

	    mail($email,$subject,$message,"From: $from\n");
	    
		echo json_encode(NewSuccessAppResponse(null));
	} catch (Exception $e){
		ReportError($e, 500);
	}
});