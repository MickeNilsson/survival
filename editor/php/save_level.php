<?php

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$levelIsSaved_b = file_put_contents('./' . $_GET['name'] . '.json', $_GET['level']);
if($levelIsSaved_b === false){
   echo '{"status":"level not saved"}';
}else{
   echo '{"status":"level saved"}';
}

?>