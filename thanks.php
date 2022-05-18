<html>
<body>
    
    <h1>Email Envoyé, Merci !</h1>
<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$to = "theyazilimci@theai.fr";
$subject = "Contact Form";
$body = "From: $name\n E-Mail: $email\n Message:\n $message";
mail($to, $subject, $body);

?>
</body>
</html>