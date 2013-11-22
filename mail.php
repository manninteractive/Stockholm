<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Stockholm</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Starter Twitter Bootstrap Template. This starter template is a great place to start your Bootstrap Projects.">

    <!-- Style sheets -->
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/bootstrap-responsive.css" rel="stylesheet">
    
    <link href="css/custom.css" rel="stylesheet">

    
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300' rel='stylesheet' type='text/css'>






    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- fav and touch icons -->
    <link rel="shortcut icon" href="img/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="ico/apple-touch-icon-57-precomposed.png">
  </head>

<body>



<!-- HEADER CONTAINER -->

<div class="row header">
   
<!-- NAV --> 
  
<nav class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container">

                   
                    <h1 class="brand hidden-phone hidden-tablet">
                        <a href="index.html">
                            <img src="img/logo.png">
                        </a>                            
                    </h1>
            
                    

                </div>
            </div>
        </nav>
  </div>

     
      
      
<div class="container explain">
<br />
<?php

// basic settings section
$sendto = 'michael@manninteractive.com';
$subject = 'New Email Subscriber';
$iserrormessage = 'Opps!  Seems like there was a problem with sending us your e-mail, please check:';
$thanks = "<div style='font-family:arial; padding: 10px; width:500px;height:200px; background:#000; margin:0 auto; margin-top: 50px; color: #fff; text-align:center;'><h1 style='padding-top:30px;'>Thanks for signing up!</h1> <p>You will recieve our monthly newsletter.</p></div>";


$emptyemail = 'Did you enter your e-mail address?';

$alertemail = 'Please enter your e-maill address in format: name@domain.com';

$alert = '';
$iserror = 0;

// cleaning the post variables
function clean_var($variable) {$variable = strip_tags(stripslashes(trim(rtrim($variable))));return $variable;}

// validation of filled form



if ( empty($_REQUEST['email']) ) {
	$iserror = 1;
	$alert .= "<li>" . $emptyemail . "</li>";
} elseif ( !eregi("^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$", $_REQUEST['email']) ) {
	$iserror = 1;
	$alert .= "<li>" . $alertemail . "</li>";
}



// if there was error, print alert message
if ( $iserror==1 ) {

echo "<script type='text/javascript'>$(\".message\").hide(\"slow\").fadeIn(\"slow\").delay(5000).fadeOut(\"slow\"); </script>";
echo "<strong>" . $iserrormessage . "</strong>";
echo "<ul>";
echo $alert;
echo "</ul>";

} else {
// if everything went fine, send e-mail

$msg = "From: " . clean_var($_REQUEST['name']) . "\n";
$msg .= "Email: " . clean_var($_REQUEST['email']) . "\n";
//$header = 'From:'. clean_var($_REQUEST['email']);

mail($sendto, $subject, $msg);

echo "<script type='text/javascript'>$(\".message\").fadeOut(\"slow\").fadeIn(\"slow\").animate({opacity: 1.0}, 5000).fadeOut(\"slow\");</script>";
echo $thanks;

die();
}
?>
</div>
</body>
</html>
