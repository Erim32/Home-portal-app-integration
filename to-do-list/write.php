<?php
$URL_FICHIER_SAUVEGARDE = "./liste.txt";
//relatif au fichier php

if(isset($_POST["content"])){
	$fh = fopen($URL_FICHIER_SAUVEGARDE, 'w') or die("can't open file");
	$stringData = $_POST["content"];
	fwrite($fh, $stringData);
	fclose($fh);
}else
echo "erreur";
?>  