<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	require "./PHPMailer/src/PHPMailer.php";
	require "./PHPMailer/src/Exception.php";

	$mail = new PHPMailer(true);
	$mail->CharSet = "UTF-8";
	$mail->IsHTML(true);

	// send to
	$mail->addAddress("juliahavaeva7@gmail.com");
	
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
		$body.='<p><strong>From:</strong> '.$email.'</p>';
	}


	$mail->Body = $body;

	// send
	if(!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные не отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
