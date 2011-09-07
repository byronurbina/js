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
            
        
            
}
            
else
            
{
      echo " ";      
       exit;
            
}
  	
	
	
	
	
$consulta1 = "SELECT B.nombre, B.id FROM refri as A, ingredientes as B WHERE id_usuario=$_SESSION[logeado] and B.id = A.id_ingrediente;";
$result1 = mysql_query($consulta1);


if (!$result1) {
    echo 'ERROR EN LA CONSULTA';
}

//creando un jason para todos los ingredientes...

echo '{';
echo '"items": [';
	
$n = mysql_num_rows($result1);
$cont = 0;

while ($row1 = mysql_fetch_assoc($result1)) {
echo '{"nombre":"';
echo $row1['nombre'];
echo '","id":"';
echo $row1['id'];
echo '"}';
$cont= $cont+1;
if ($cont < $n ){
echo ',';}

}

echo ']
}';


?>