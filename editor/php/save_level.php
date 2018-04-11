<?php

header('Access-Control-Allow-Origin: *');

file_put_contents('http://www.digizone.se/survival/levels/' . $_GET['name'] . '.json', $_GET['level']);

?>