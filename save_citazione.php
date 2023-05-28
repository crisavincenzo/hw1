<?php 
    
    require_once 'auth.php';
    if (!$userid = checkAuth()) exit;

    if (!isset($_GET["q"])) {
        echo "Non dovresti essere qui";
        exit;
    }

    header('Content-Type: application/json');
    
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $citazione = mysqli_real_escape_string($conn, $_GET["q"]);
    $userid = mysqli_real_escape_string($conn, $userid);

    $query = "UPDATE users SET citazione = '$citazione' WHERE id = '$userid'";

    if(mysqli_query($conn, $query)) 
    {
        echo json_encode(array('ok' => true));
        exit;
    }else
    {
        die(mysqli_error($conn));
    }

    mysqli_close($conn);
    echo json_encode(array('ok' => false));
?>