<?php
$link = mysql_connect('localhost', 'root', '22884776');
if (!$link) {
    die('Not connected : ' . mysql_error());
}
// Seleccionar foo como base de datos activa
$db_selected = mysql_select_db('proyecto', $link);
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
	}
$consulta1 = "SELECT * FROM categorias ORDER BY nombre;";
$result1 = mysql_query($consulta1);

if (!$result1) {
    echo 'ERROR EN LA CONSULTA';
}

//creando un jason para todos los ingredientes...

echo '{';
echo ' "text": "productos", ';
echo '"items": [';
	
$n1 = mysql_num_rows($result1);
$cont1 = 0;
$cont = 0;
$n2 = 0;
$consulta ="";
while ($row1 = mysql_fetch_assoc($result1)) {
echo '{"text":"';
echo $row1['nombre'];
echo '","items":[';
$nombre = $row1['nombre'];
$cont1= $cont1+1;
$consulta = "select * from ingredientes where categorias = '$nombre';" ;
$result = mysql_query($consulta);
$n2 = mysql_num_rows($result);
$cont = 0;
while ($row = mysql_fetch_assoc($result)) {
		echo '{';
		echo '"id": "';
		echo $row['id']; echo '",';
		echo '"text": "';
		echo $row['nombre']; echo '",';
		echo '"calorias": "';
		echo $row['calorias']; echo '"';
		echo ', ';
		echo '"leaf": true ';
		echo '}';
		$cont=$cont+1;
		if($cont<$n2){
		echo ',';
		}

}
echo ']}';
if ($cont1 < $n1 ){
echo ',';}

}

echo ']
}';



?>