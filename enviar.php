<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

$destino = "roy.arnao.v@gmail.com";

$nombre   = htmlspecialchars(trim($_POST['nombre']));
$celular  = htmlspecialchars(trim($_POST['celular']));
$email    = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$servicio = htmlspecialchars(trim($_POST['servicio']));
$mensaje  = htmlspecialchars(trim($_POST['mensaje']));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Correo electrónico no válido");
}

$contenido = "Nombre: $nombre\n";
$contenido .= "Celular: $celular\n";
$contenido .= "Correo: $email\n";
$contenido .= "Servicio: $servicio\n";
$contenido .= "Mensaje: $mensaje\n";

$headers = "From: contacto@tudominio.com\r\n";
$headers .= "Reply-To: $email\r\n";

mail($destino, "Contacto desde la web", $contenido, $headers);

header("Location: gracias.html");
exit();

}

?>