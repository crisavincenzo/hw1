<?php
    require_once 'auth.php';
    if (!$userid = checkAuth()) exit;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        
    if (!isset($_GET["q"])) {
        echo "Non dovresti essere qui";
        exit;
    }
    $key = 'k_3heey8me';
    header('Content-Type: application/json');

    $userid = mysqli_real_escape_string($conn, $userid);


    $query = "SELECT id FROM contents WHERE user = '$userid' AND visto IS NOT NULL AND titolo = '".$_GET["q"]."'";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
    
    if(mysqli_num_rows($res) > 0) 
    {
        $riga = mysqli_fetch_assoc($res);

        $url = 'https://imdb-api.com/en/API/Posters/'.$key.'/'.$riga["id"];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $res=curl_exec($ch);
        curl_close($ch);
    
        mysqli_close($conn);

        $res_array=json_decode($res,true);
        $res_array['exists']=true;

        echo json_encode($res_array);
        exit;
    }
    

    mysqli_close($conn);
    echo json_encode(array('exists' => false));

?>