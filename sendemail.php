<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	require "./PHPMailer/src/PHPMailer.php";
	require "./PHPMailer/src/Exception.php";

	$mail = new PHPMailer(true);
	$mail->CharSet = "UTF-8";

	$name = $_POST["name"];
	$tel = $_POST["tel"];
	$email = $_POST["email"];

	$theme = '[ЗАЯВКА НА ТРЕНИНГ]';
	$body = 'Имя:' . $name . 'Телефон: ' . $tel . 'Email: ' . $email;

	// send to
	$mail->addAddress("juliahavaeva7@gmail.com");
	
	$mail->Subject = $theme;
	$mail->Body = $body;

	$mail->send();
?>