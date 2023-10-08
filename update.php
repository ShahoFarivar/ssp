<?php
$servername = "localhost";
$username = "ensanda1_shaho";
$password = "g2tIO{e@;Aa0";
$dbname = "ensanda1_testdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$usernameT = $_POST['usernameT'];
$sql = "UPDATE table1 SET username= '$usernameT' WHERE id=2";

if ($conn->query($sql) === TRUE) {
  echo "Record updated successfully";
} else {
  echo "Error updating record: " . $conn->error;
}

$conn->close();
?>