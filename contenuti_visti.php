<?php

require_once 'auth.php';
if (!$userid = checkAuth()) exit;

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);       
$userid = mysqli_real_escape_string($conn, $userid);

$query = "SELECT * FROM contents WHERE user = '$userid' AND visto = TRUE";  
$res_visto = mysqli_query($conn, $query) or die(mysqli_error($conn));
$array = array();

if(mysqli_num_rows($res_visto) > 0) 
{
    while($riga = mysqli_fetch_assoc($res_visto))
    {
        $record=array('ok' => true,
                    'id' =>  $riga['id'],
                    'titolo' =>  $riga['titolo'],
                    'poster' => $riga['poster']);

        $array[] = $record; 
    }
    
    echo json_encode(array('ok' => true, 'data' => $array));
    mysqli_close($conn);
    exit;
}

mysqli_close($conn);
echo json_encode(array('ok' => false));

?>