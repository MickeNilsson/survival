<?php

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);

$fileNames_a = scandir('./');
$levels_a = array();
foreach($fileNames_a as $fileName_s){
  if(strpos($fileName_s, '.json') !== false){
    $level_s = file_get_contents($fileName_s);
    $levelName_s = substr($fileName_s, 0, -5);
    $levels_a[$levelName_s] = $level_s;
  }
}
echo json_encode($levels_a, JSON_UNESCAPED_UNICODE)

?>