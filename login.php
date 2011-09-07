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

$mail = $_GET["mail"];
$pass = $_GET["pass"];

$sql = "SELECT * FROM usuarios WHERE email='$mail' AND password='$pass';";
$result = mysql_query($sql);
if (!$result) {
    echo 'ERROR EN LA CONSULTA';
exit;
	}
	
$n = mysql_num_rows($result);
if ($n == 0){
echo "<h3>No existe el Usuario o el password esta mal ingresado</h3><br><small>para crear un usuario o recuperar tu password ingresa </small><a href=''>aqui</a>";
session_destroy();
exit;
}
$row = mysql_fetch_assoc($result);
$id = $row['id'];


$_SESSION['logeado'] = "$id";


if (isset($_SESSION['logeado']))
            
{
            
        echo "Variable registrada";
            
}
            
else
            
{
            
        echo "Variable NO registrada";
            
}
       

echo "el mail recibido fue ".$mail;
echo "el pass recibido fue ".$pass;
?>