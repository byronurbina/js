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
exit;
                   
}
echo $_SESSION['logeado'];

?>