<?php 

if (isset($_FILES["file-1"])) {

	$nombre = $_POST['namevoz'];
    $name = $_FILES["file-1"]["name"];
    $tmp_name = $_FILES["file-1"]["tmp_name"];
    $categoria = $_POST['categoria'];

    $trozos = explode(".", $name); 
	$extension = end($trozos);
	$location = 'audios/';
	$salida = $location.$nombre."_".time().".".$extension;

	$prueba = "<span><b>".$nombre."</b></span><br><audio src='".$salida."' preload='auto' controls></audio><br>"; 

    if (!empty($name)) {
        $location = 'audios/';

        if  (move_uploaded_file($tmp_name, $salida))
        {
            echo 'Subida';
            if($categoria == "colo")
			     $file = fopen("audios/aacanciones_colo.txt", "a");
            else if($categoria == "uni")
                 $file = fopen("audios/aacanciones_uni.txt", "a"); 
			fwrite($file, $prueba. PHP_EOL);
			fclose($file);
            header("location: index.html");
        }

    } else {
        echo 'Por favor selecciona un archivo';
    }
}

?>
