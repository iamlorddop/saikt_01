<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	require "./PHPMailer/src/PHPMailer.php";
	require "./PHPMailer/src/Exception.php";
	require "./PHPMailer/src/SMTP.php";

	$mail = new PHPMailer(true);
	$mail->isSMTP(); //Send using SMTP
	$mail->Host = 'smtp.gmail.com';  //Set the SMTP server to send through
	$mail->SMTPAuth = true;  //Enable SMTP authentication
	$mail->Username  = 'juliahavaeva7@gmail.com'; //SMTP username
	$mail->Password  = 'xkbncscofxgdpujg';  //SMTP password
	$mail->SMTPSecure = "tls";  //Enable implicit TLS encryption
	$mail->Port = 587; //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
	$mail->CharSet = "UTF-8";
	$mail->IsHTML(true);

	$mail->setFrom("mail@mail.mail", "САИКТ");
	// send to
	$mail->addAddress("juliahavaeva7@gmail.com", "САИКТ");
	
	$theme = '[ЗАЯВКА НА ТРЕНИНГ]';
	$mail->Subject = $theme;

	// letter's body
	$body = '<h1>Данные заявки</h1>';

	$name = $_POST["name"];
	$tel = $_POST["tel"];
	$email = $_POST["email"];

	if(trim(!empty($name))){
		$body.='<p><strong>Имя:</strong> '.$name.'</p>';
	}
	if(trim(!empty($tel))){
		$body.='<p><strong>Телефон:</strong> '.$tel.'</p>';
	}
	if(trim(!empty($email))){
		$body.='<p><strong>От:</strong> '.$email.'</p>';
	}
	$mail->Body = $body;
	
	// send
	if(!$mail->send()) {
		$message = 'Ошибка!';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);

	$mail->smtpClose();
?>