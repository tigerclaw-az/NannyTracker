<?php
define('USINGSSL','https');              	// If using HTTPS set to https otherwise leave as http.
define('LOGFILE','log.txt');

// Database configuration
define('DB_HOST', '127.0.0.1');
define('DB_NAME', 'nannytracker');
define('DB_USER', 'homer');
define('DB_PASS', 'c2ltcHNvbnM=');

ini_set("log_errors", 1);
ini_set("error_log", "logs/php-error.log");