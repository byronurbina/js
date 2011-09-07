<?php
session_start(); 
$link = mysql_connect('localhost', 'root', '22884776');
if (!$link) {
    die('Not connected : ' . mysql_error());
}
// Seleccionar foo como base de datos activa
$db_selected = mysql_select_db('proyecto', $link);
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
	}
	
	
if (isset($_SESSION['logeado']))
            
{
            
  echo "si esta logeado.";
            
}
            
else
            
{
      echo " ";      
       exit;
            
}
  	
$id = $_GET['ingrediente'];
	
$consulta1 = "DELETE FROM refri WHERE id_usuario=$_SESSION[logeado] AND id_ingrediente='$id';";
$result1 = mysql_query($consulta1);
echo $consulta1;

if (!$result1) {
    echo 'ERROR EN LA CONSULTA';
	exit;
}

//creando un jason para todos los ingredientes...
echo "se borro!";


?>