<?php
$host = 'localhost'; // Cambia si tu base de datos está en otro host  
$db = 'formularioblog'; // Tu nombre de base de datos  
$user = 'root'; // Tu usuario de la base de datos  
$pass = 'Admin'; // Tu contraseña de la base de datos  

// Conexión a la base de datos  
$conn = new mysqli($host, $user, $pass, $db);  

// Verificar conexión  
if ($conn->connect_error) {  
    die("Conexión fallida: " . $conn->connect_error);  
}  

// Obtener datos del formulario  
$nombre = $_POST['nombre'];  
$email = $_POST['email'];  
$mensaje = $_POST['mensaje'];

// Preparar la consulta  
$sql = "INSERT INTO formularioblog.mensajesblog (nombre, email, mensaje) VALUES (?, ?, ?)";  

$stmt = $conn->prepare($sql);  
$stmt->bind_param("sss", $nombre, $email, $mensaje); // sss significa que son cadenas 

// Ejecutar la consulta  
if ($stmt->execute()) {
      
    echo "Datos guardados con éxito.";  
} else {  
    echo "Error: " . $stmt->error;  
}  

// Cerrar la conexión  
$stmt->close();  
$conn->close();  


?>