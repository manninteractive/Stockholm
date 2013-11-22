<?php
 // Get Data 
 $name = $_REQUEST['name'];
 $email = $_REQUEST['email'];
 $message = $_REQUEST['message'];
 
$headers .="From: ".$email;


$msg .="\n".$message;
$msg .="\n".$name;
$msg .="\n".$email;
$subject = "A new message on your website";
   print nl2br("Your message was sent successfully!");


// Replace  your@emailaddress.com with your email 
  mail('your@emailaddress.com', $subject, $msg, $headers);    

 ?>
 