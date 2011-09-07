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

$id_user=$_SESSION['logeado'];
//echo $id_user;
//echo "{";
//echo "<br>";
//echo '"items" :[';

$query2="SELECT id_ingrediente FROM refri where id_usuario=$id_user";
$result2 = mysql_query($query2);

$query4="SELECT count(*) FROM refri where id_usuario=$id_user";
$result4 = mysql_query($query4);
$row4=mysql_fetch_array($result4, MYSQL_ASSOC);
$limite=$row4["count(*)"];
$cont=1;

while ($row2=mysql_fetch_array($result2, MYSQL_ASSOC)) {
	$var=$row2["id_ingrediente"];
	//echo "<br>";
	//echo "{";
	//echo "<br>";
	$query3="SELECT nombre FROM ingredientes where id=$var";
	$result3 = mysql_query($query3);
	$row3=mysql_fetch_array($result3, MYSQL_ASSOC);
	$nombre=$row3['nombre'];
	//echo '"nombre" : "';
	//echo $nombre;
	//echo '",';
	//echo "<br>";
	//echo '"id" : "';
	//echo $var;
	//echo '"';
	//echo "<br>";
	//if ($cont!=$limite) echo "},";
	//else echo "}";
	$cont=$cont+1;
}
//echo "<br>";
//echo "]";
//echo "<br>";
//echo "}";

$query6="SELECT COUNT( * ) AS numero FROM refri WHERE id_usuario = $id_user";
$result6 = mysql_query($query6);
$row6=mysql_fetch_array($result6, MYSQL_ASSOC);
$match=$row6["numero"];																	

$query5="SELECT pertenece.id_recetas,count(*) as numero FROM pertenece,refri WHERE pertenece.id_ingredientes=refri.id_ingrediente GROUP BY pertenece.id_recetas";
$result5 = mysql_query($query5);
echo "<center>";															
while ($row5=mysql_fetch_array($result5, MYSQL_ASSOC)) {
$id=$row5['id_recetas'];
$coincidencias=$row5['numero'];																//el numero de elementos que hacen match en una receta

	$query7="SELECT COUNT(*) AS numero FROM pertenece WHERE id_recetas=$id";
	$result7 = mysql_query($query7);
	$row7=mysql_fetch_array($result7, MYSQL_ASSOC);
	$total=$row7["numero"];																	//el total de ingredientes que posee una receta

	$query8="SELECT procedimiento,nombre FROM recetas WHERE id=$id";
	$result8 = mysql_query($query8);
	$row8=mysql_fetch_array($result8, MYSQL_ASSOC);
	$procedimiento=$row8["procedimiento"];
	//if ($coincidencias>=$match) echo "<br><br>Id receta: ".$id."<br> Prioridad: ".$total/$match;
	if ($coincidencias>=$match) {
		if ($total/$match==1) echo "<table border='5' style='border-color:#00FF00;'><tr><td><center>";
		if ($total/$match>1 and $total/$match<2) echo "<table border='5' style='border-color:#0000FF;'><tr><td><center>";
		if ($total/$match>2) echo "<table border='5' style='border-color:#FF0000;'><tr><td><center>";
		echo $procedimiento;
		echo "</center></td></tr></table><br>";
	}
	
}
echo "</center>";

?>