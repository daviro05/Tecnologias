
<?php 
$contenido = $_POST['persona'];
$puntos = $_POST['puntos'];
$file = fopen("puntuaciones.txt", "a");
fwrite($file, $contenido. " ");
fwrite($file, $puntos. PHP_EOL);
fclose($file);
//header('Location: index.html');
?>