<?php
/*$link = mysql_connect('localhost', 'root', '22884776');
if (!$link) {
    die('Not connected : ' . mysql_error());
}
// Seleccionar foo como base de datos activa
$db_selected = mysql_select_db('proyecto', $link);
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
	}
*/
$return = $_GET['ingrediente'];
echo $return;	
/*
$sql = "INSERT INTO refri  VALUES ('1', $return);";
echo $sql;
$result = mysql_query($sql);
if (!$result) {
    echo 'ERROR EN LA CONSULTA';
}*/
?>
