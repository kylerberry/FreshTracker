<?php

//this includes our apikeys
require 'keys.php';

	$password = 'bgqpmps2@';

	$request = '<?xml version="1.0" encoding="utf-8"?>  
				<request method="client.list">  
				  <updated_from>2009-01-01 00:00:00</updated_from>  
				</request>';

    $headers = array(
        'Content-Type: text/xml; charset=UTF-8',
        'Accept: application/xml; charset=UTF-8',
        'User-Agent: FreshTracker-1.0');

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://kylerberry.freshbooks.com/api/2.1/xml-in');
    curl_setopt($ch, CURLOPT_USERPWD, "$fb_apikey");
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    //curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request);

    $response = curl_exec($ch);
    curl_close($ch);
    //$response = new SimpleXMLElement($response);

    //$response = json_encode($response);

    print_r($response);

?>