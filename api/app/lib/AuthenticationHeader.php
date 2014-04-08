<?php

class AuthenticationHeader
{
    //public function __construct(SoapClient $client)
    public static function setAuth()
    {
        if (!isset($_SESSION)) {
            session_start();
        }
        if(!isset($_SESSION['username']) || !isset($_SESSION['password'])){
            ReportError(new Exception('Invalid credentials. Must login first.',401),'Invalid credentials. Must login first.', 401);
        }
        $username = $_SESSION['username'];
        $password = $_SESSION['password'];
    }

    public static function getTempUsername()
    {
        if (!isset($_SESSION)) {
            session_start();
        }
        if(!isset($_SESSION['username']) || !isset($_SESSION['password'])){
            ReportError(new Exception('Invalid credentials. Must login first.',401),'Invalid credentials. Must login first.', 401);
        }

        return $_SESSION['username'];
    }

    public static function getTempPassword()
    {
        if (!isset($_SESSION)) {
            session_start();
        }
        if(!isset($_SESSION['username']) || !isset($_SESSION['password'])){
            ReportError(new Exception('Invalid credentials. Must login first.',401),'Invalid credentials. Must login first.', 401);
        }

        return $_SESSION['password'];
    }

}

