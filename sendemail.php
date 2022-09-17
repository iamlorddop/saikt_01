<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage = ('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	// from
	$mail->setFrom('juliahavaeva7@gmail.com');
	// to
	$mail->setAddress('juliahavaeva7@gmail.com');
	// theme
	$mail->Subject = 'Заявка на тренинг';

	// letter body 
	$body = '<h1>Заявка</h1>';

	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['tel']))){
		$body.='<p><strong>Телефон:</strong> '.$_POST['tel'].'</p>';
	}
	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>E-mail:</strong> '.$_POST['emal'].'</p>';
	}

	$mail->Body = $body;

	// Sending
	if(!$mail->send()){
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>