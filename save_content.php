<?php

    require_once 'auth.php';
    if (!$userid = checkAuth()) exit;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        
    //query
    $userid = mysqli_real_escape_string($conn, $userid);
    $id = mysqli_real_escape_string($conn, $_POST['id']);
    $titolo = mysqli_real_escape_string($conn, $_POST['titolo']);
    $poster = mysqli_real_escape_string($conn, $_POST['poster']);

    $query = "INSERT INTO contents(id, titolo, user, poster) VALUES('$id','$titolo',$userid,'$poster')";
    
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