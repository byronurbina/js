<?php 

$nombre=$_POST["nombre"];
$email=$_POST["email"];
$estatura=$_POST["estatura"];
$peso=$_POST["peso"];
$password=$_POST["password"];

$link = mysql_connect('localhost', 'root', '22884776');
if (!$link) {
    die('Not connected : ' . mysql_error());
}
// Seleccionar foo como base de datos activa
$db_selected = mysql_select_db('proyecto', $link);
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
	}

$query="INSERT INTO usuarios (nombre,email,estatura,peso,password) VALUES ('$nombre','$email',$estatura,$peso,'$password') ";
echo $query;
$result = mysql_query($query);
if (!$result) {
    echo 'ERROR EN LA CONSULTA';
	exit;
}
header('Location: ../login ');


?>