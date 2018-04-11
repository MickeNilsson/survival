<?php

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);
//print_r(glob('*.json'))

// Get all filenames ending with .json in the current directory.
$levelFileNames_a = glob('http://www.digizone.se/survival/levels/*.json');
$levels_a = array();
foreach($levelFileNames_a as $fileName_s){
  $level_s = file_get_contents($fileName_s);
  $levels_a[$fileName_s] = $level_s;
}
echo json_encode($levels_a, JSON_UNESCAPED_UNICODE)

?>