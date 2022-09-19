<?php
	$to = 'juliahavaeva7@gmail.com';
	$from = trim($_POST['email']);

	$body = '<h1>Заявка</h1>' . "\r\n";

	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>'."\r\n";
	}
	if(trim(!empty($_POST['tel']))){
		$body.='<p><strong>Телефон:</strong> '.$_POST['tel'].'</p>'."\r\n";
	}
	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>'."\r\n";
	}
	$body .= "X-Mailer: PHP/" . phpversion();

	if(mail($to, $from, $body)){
		echo 'Заявка отправлена';	
	} else {
		echo 'Заявка не отправлена';	
	}
?>