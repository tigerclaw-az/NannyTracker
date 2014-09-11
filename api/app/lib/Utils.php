<?php

/*===========================
 * COMMON UTILITY CLASSES
 *===========================/


/*======================
 * GLOBAL FUNCTIONS
 *======================/

/**
 * Gets the DELETE/POST/PUT input.
 */
function GetHTTPData($decodeJson = true)
{
	$app = $GLOBALS['app'];

	// Use Slim framework to get the body of the request.
	// This is needed to support PUT and DELETE as PHP doesn't natively
	// support those.
	$response = $app->request->getBody();

	if ($decodeJson == true) {
		$response = json_decode($response);
	}

	return $response;
}

function GetRandomString($length = 0)
{
	$str = '  ';

	if (!$length) $length = floor(rand(5, 100));

	for ($i = 0; $i < $length; $i++) {
		$str .= $i%2 == 0 ? chr(mt_rand(65, 90)) : chr(mt_rand(97, 122));
	}

	return str_shuffle($str);
}

function GetBaseUrl()
{
	return 'http://' . $_SERVER['HTTP_HOST'] . '/#!/';
}

function ConvertDBTableName($name)
{
	return ucwords(str_replace('_', ' ', $name));
}

/**
 * Replace certain characters that will break the SOAP XML
 * request.
 * NOTE: DO NOT use htmlentities() here because the Web Services
 *       can only handle certain characters.
 * @param String $strValue The string with special characters
 */
function EscapeHtml($strValue)
{
	// \xe2\x80\x93 => &ndash; character
	$search  = array('&', '<', '>', '"', "'", "\x0A", "\x0D", "\xe2\x80\x93");
	$replace = array('&amp;', '&lt;', '&gt;', '&quot;', '&apos;', '&#10;', '&#13;', '-');

	return str_replace($search, $replace, $strValue);
}

/**
 * Replaces all htmlentities that come from the Web Service
 * @param String $strValue String to be decoded
 */
function UnescapeHtml($strValue)
{
	// Need to manually replace &apos; since PHP doesn't do it automatically
	return html_entity_decode(str_replace('&apos;', "'", $strValue), ENT_QUOTES, 'UTF-8');
}

/******************
 * Date/Time Functions
 ******************/
function ConvertDateToISO($date)
{
	$timestamp = strtotime($date);
	if (!$timestamp || $timestamp < 0) $timestamp = time();

	return date('Y-m-d\TH:i:s.000\Z', $timestamp);
}

function TimeToDate($timestamp = null)
{
	$timestamp = (!$timestamp) ? time() : $timestamp;

	return gmDate("Y-m-d H:i:s e", $timestamp);
}

function DateToTime($date)
{
	// Convert time to EPOC milliseconds (for JavaScript moment library)
	return strtotime($date)*1000;
}

/*********************
 * Error Functions
 ********************/

/**
 * Generates an error response.
 * @param Exception $e [description]
 * @param string $strMessage [description]
 * @param integer $errorCode [description]
 */
function ReportError(Exception $e, $errorCode = 500)
{
	$error = response_code($errorCode);
	$msg = $e->getMessage();
	if (!$msg) $msg = get_response_text($error);
	LogError($e, $msg);

	$appResponse = new AppResponse(null);
	$appResponse->setStatus($errorCode);
	$appResponse->statusText = $msg;

	die(json_encode($appResponse));
}

function LogError(Exception $e, $msg)
{
	$date = date('d.m.Y h:i:s');
	$log = "Date: {$date}\nError: {$msg}\nFile: " . $e->getFile() . "\nLine: " . $e->getLine() . "\nCallstack: \n" . $e->getTraceAsString() . "\n-------\n";

	if (!file_exists(APP_LOGS_PATH)) {
		mkdir(APP_LOGS_PATH, 0755);
	}

	error_log($log, 3, APP_LOGS_PATH . '/' . LOGFILE);
}

function get_response_text($code)
{
	switch ($code) {
		case 100: $text = 'Continue'; break;
		case 101: $text = 'Switching Protocols'; break;
		case 200: $text = 'OK'; break;
		case 201: $text = 'Created'; break;
		case 202: $text = 'Accepted'; break;
		case 203: $text = 'Non-Authoritative Information'; break;
		case 204: $text = 'No Content'; break;
		case 205: $text = 'Reset Content'; break;
		case 206: $text = 'Partial Content'; break;
		case 300: $text = 'Multiple Choices'; break;
		case 301: $text = 'Moved Permanently'; break;
		case 302: $text = 'Moved Temporarily'; break;
		case 303: $text = 'See Other'; break;
		case 304: $text = 'Not Modified'; break;
		case 305: $text = 'Use Proxy'; break;
		case 400: $text = 'Bad Request'; break;
		case 401: $text = 'Unauthorized'; break;
		case 402: $text = 'Payment Required'; break;
		case 403: $text = 'Forbidden'; break;
		case 404: $text = 'Not Found'; break;
		case 405: $text = 'Method Not Allowed'; break;
		case 406: $text = 'Not Acceptable'; break;
		case 407: $text = 'Proxy Authentication Required'; break;
		case 408: $text = 'Request Time-out'; break;
		case 409: $text = 'Conflict'; break;
		case 410: $text = 'Gone'; break;
		case 411: $text = 'Length Required'; break;
		case 412: $text = 'Precondition Failed'; break;
		case 413: $text = 'Request Entity Too Large'; break;
		case 414: $text = 'Request-URI Too Large'; break;
		case 415: $text = 'Unsupported Media Type'; break;
		case 500: $text = 'Internal Server Error'; break;
		case 501: $text = 'Not Implemented'; break;
		case 502: $text = 'Bad Gateway'; break;
		case 503: $text = 'Service Unavailable'; break;
		case 504: $text = 'Gateway Time-out'; break;
		case 505: $text = 'HTTP Version not supported'; break;
		default:
//			exit('Unknown http status code "' . htmlentities($code) . '"');
			$text = null;
			break;
	}

	return $text;
}

function response_code($code)
{
	$text = get_response_text($code);
	if ($text != null) {
		$protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.0');
		@header($protocol . ' ' . $code . ' ' . $text);
	}

	return $text;
}

/**********************
 * Library Functions
 **********************/
/**
 * Inserts the given value/array/object into the index of the given array.
 * array_splice() doesn't work when inserting Objects.
 * @param $arr Array to search through
 * @param $element New value/array/object to be inserted
 * @param $index Position of array to insert $element
 * @return array
 */
function array_insert_at($arr, $element, $index)
{
	$new_array = [];

	$count = count($arr);
	$pos = 0;

	for ($i = 0; $i < $count+1; ++$i) {
		if ($i == $index) {
			$new_array[$pos] = $element;
			$pos++;
		}

		if (isset($arr[$i])) {
			$new_array[$pos] = $arr[$i];
		}

		$pos++;
	}

	return $new_array;
}

/*
 * filtering an array
 * http://www.php.net/manual/en/function.array-filter.php#93965
 */
function filter_by_value ($array, $index, $value)
{
	$newarray = [];

	if (is_array($array) && count($array) > 0) {
		foreach (array_keys($array) as $key) {
			$temp[$key] = $array[$key]->$index;

			if ($temp[$key] == $value) {
				// $newarray[$key] = $array[$key];
				$newarray[] = $array[$key];
			}
		}
	}

	return $newarray;
}

function sortObject($obj, $sortBy)
{
	if (!is_array($obj)) {
		$obj = [$obj];
	}

	usort($obj, function($a, $b) use ($sortBy) {
		if (is_numeric($a->$sortBy)) {
			return ($a->$sortBy > $b->$sortBy);
		} else {
			return strcmp($a->$sortBy, $b->$sortBy);
		}
	});

	return $obj;
}

/**
 * @see http://stackoverflow.com/questions/3168392/cant-remove-special-characters-with-str-replace
 * @param String $str String to decode
 * @return String Decoded string
 */
function decodeString($str) {
	//Fix for mb overloading strlen option
	if (function_exists('mb_strlen')) {
		$len = mb_strlen($str, '8bit');
	} else {
		$len = strlen($str);
	}
	$ret = '';
	for ($i = 0; $i < $len; $i++) {
		$ret .= dechex(ord($str[$i])).' ';
	}
	return trim($ret);
}

/* Save for later Use */
// list(, $caller) = debug_backtrace(false);
// $caller['class'].$caller['type'].$caller['function'];
