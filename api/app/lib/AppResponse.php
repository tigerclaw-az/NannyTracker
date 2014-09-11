<?php
/**
* AppResponse class for generic response object.
*
* This class is used for generating a standard return object response in order
* for the data representation to be consistent across all RESTful API calls.
*
*/

class AppResponse
{
	public $data;
	public $errors;
	public $status;
	public $statusText;

	public function __construct($result) {
		$app = $GLOBALS["app"];
		$this->status = $app->response()->getStatus();
		$this->errors = array();

		$this->data = (!empty($result->data) && !empty($result->data[0])) ? $result->data : array();

		if (empty($this->data)) {
			$this->SetStatus(204);
		}

		$this->statusText = (empty($this->statusText)) ? get_response_text($this->status) : $this->statusText;
	}

	public function GetStatus($result) {
		if ($this->status == 200) {
			if ($result == null) {
				$status = 500;
			} elseif (!empty($result->code)) {
				$status = 500;
				$this->statusText = $result->message;
			} elseif (empty($this->data)) {
				$status = 204;
			}
		}

		return $status;
	}

	public function SetStatus($status, $text = null) {
		$this->status = $status;
		$this->statusText = !empty($text) ? $text : get_response_text($this->status);
	}
}

function NewSuccessAppResponse($data)
{
	$result = new stdClass();
	$result->data = array($data);
	return new AppResponse($result);
}
