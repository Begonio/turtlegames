

<?php
session_start();

if(isset($_POST['submit_pass']) && $_POST['pass'])
{
 $pass=$_POST['pass'];
 if($pass=="122334455667788990")
 {
  $_SESSION['password']=$pass;
 }
 else
 {
  $error="Incorrect Pssword";
 }
}

if(isset($_POST['page_logout']))
{
 unset($_SESSION['password']);
}
?>

<html>
<head>
<link rel="stylesheet" type="text/css" href="password_style.css">
</head>
<body>
<div id="wrapper">

<?php
if($_SESSION['password']=="122334455667788990")
{
 ?>
 <h1>Games</h1>
 <form method="post" action="" id="logout_form">
  <input type="submit" name="page_logout" value="LOGOUT">
 </form>
 <?php
}
else
{
 ?>
 <form method="post" action="" id="login_form">
  <h1>LOGIN TO PROCEED</h1>
  <input type="password" name="pass" placeholder="*******">
  <input type="submit" name="submit_pass" value="DO SUBMIT">
  <p>"Password : 122334455667788990"</p>
  <p><font style="color:red;"><?php echo $error;?></font></p>
 </form>
 <?php	
}
?>

</div>
</body>
</html>

