<?php require 'includes/keys.php'; ?>

<!DOCTYPE html>
<!--[if IE 8]> 				 <html class="no-js lt-ie9" lang="en" > <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en" > <!--<![endif]-->

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width" />
	<title>DIG4503 - Kyler Berry Semester Project</title>

	<link rel="stylesheet" href="css/normalize.css" />
	<link rel="stylesheet" href="css/foundation.min.css" />
	<link rel="stylesheet" href="css/style.css" />
	<link rel="stylesheet" href="css/font-awesome.min.css" />

	<script src="js/custom.modernizr.js"></script>

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="https://api.trello.com/1/client.js?key=<?php echo $t_apikey; ?>"></script>

</head>
<body>

<header class="fixed">

	<nav class="top-bar">
	  	<ul class="title-area">
		    <li class="name">
		    	<h1><a class="logo" href="#">FreshTracker<i class="icon-time"></i></a></h1>
		    </li>
		    <li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
		</ul>
		<section class="top-bar-section">
	    <!-- Left Nav Section -->
	    <!--<ul class="left">
			<li class="divider"></li>
			<li class=""><a href="#"><span>&gt; Projects</a></li>
			<li class="divider"></li>
	    </ul>-->
	    <ul class="right signout">

	    </ul>
    	<div id="loggedin" class="right welcome">
	        Welcome, <span id="fullName"></span>
		</div>

	</nav>
</header>