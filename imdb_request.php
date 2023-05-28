<?php
    require_once 'auth.php';
    if (!$userid = checkAuth()) exit;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        
    if (!isset($_GET["q"])) 
    {
        echo "Non dovresti essere qui";
        exit;
    }

    $key = 'k_3heey8me';

    $url = 'https://imdb-api.com/en/API/SearchTitle/'.$key.'/'.$_GET["q"];
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $res=curl_exec($ch);
    curl_close($ch);

    $res_array=json_decode($res,true);

    $userid = mysqli_real_escape_string($conn, $userid);

    foreach($res_array['results'] as &$content)
    {
        $id = mysqli_real_escape_string($conn, $content['id']);
    
        $query = "SELECT * FROM contents WHERE user = '$userid' AND id = '$id'";
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
        if(mysqli_num_rows($res) > 0) 
        {
            $content['selected']=true;
        }else
        {
            $content['selected']=false;
        }

    }

    mysqli_close($conn);
    echo json_encode($res_array);
    
?>