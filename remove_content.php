<?php

    require_once 'auth.php';
    if (!$userid = checkAuth()) exit;

    if (!isset($_GET["q"])) 
    {
        echo "Non dovresti essere qui";
        exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        
    $userid = mysqli_real_escape_string($conn, $userid);
    $id = mysqli_real_escape_string($conn, $_GET["q"]);

    $query = "DELETE FROM contents WHERE id='$id' AND user = '$userid'";

    if(mysqli_query($conn, $query)) 
    {
        if(mysqli_affected_rows($conn) > 0) 
        {
            mysqli_close($conn);
            echo json_encode(array('ok' => true));
            exit;
        } else 
        {
            mysqli_close($conn);
            echo json_encode(array('ok' => false, 'error' => 'Element not found.'));
            exit;
        }
    } else 
    {
        mysqli_close($conn);
        echo json_encode(array('ok' => false, 'error' => mysqli_error($conn)));
        exit;
    }

?>