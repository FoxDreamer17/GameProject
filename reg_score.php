<?php
$name = $_POST["name"];
$email = $_POST["email"];
$pass = $_POST["password"];

include "db.php";

$sql = "
INSERT INTO TopPlayer (name, email, password)
VALUES ('$name', '$email', '$pass')
";

$result = $db->query( $sql );

if( $result ) { //если получилось зарегистрироваться
  header("Location: ../auth.php");
} else {//если почта занята
  header("Location: ../reg.php");
}