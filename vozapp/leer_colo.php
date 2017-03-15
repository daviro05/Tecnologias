<?php
$file = fopen("audios/aacanciones_colo.txt", "r") or exit("No se puede abrir el archivo");
//Output a line of the file until the end is reached
while(!feof($file))
{
	echo fgets($file);
}
fclose($file);
?>