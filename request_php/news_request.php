<?php

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://newsdata.io/api/1/news?apikey=pub_2045097d87deb3f576b96fcb6a60b0b5788ab&q=film&category=entertainment&language=it");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
    echo $result;
?>

