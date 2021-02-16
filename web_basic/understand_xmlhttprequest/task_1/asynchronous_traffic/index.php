<?php
sleep(3);
header('Access-Control-Allow-Origin: *');
print('こんにちは、'.$_REQUEST['name'].'さん！');