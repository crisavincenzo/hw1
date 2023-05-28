<?php
    if (!isset($_GET["q"])) 
    {
        echo "Non dovresti essere qui";
        exit;
    }

    $url="https://animechan.vercel.app/api/quotes/character?name=".urlencode($_GET["q"]);
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
    $result_array=array(json_decode($result,true));
    if(isset($result_array[0]['error']))
    {
        $result_array['error']=true;

    }else
    {
        $result_array['error']=false;
    }
    echo json_encode($result_array);
?>