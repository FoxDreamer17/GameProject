<?php
$nickname = $_POST['nickname'];
$score = $_POST['score'];

include "db.php";

$sql = "
INSERT INTO TopPlayer (nickname, score) VALUES ('$nickname', '$score');";
$result = $db->query( $sql );
$sql = "SELECT * FROM TopPlayer ORDER BY score DESC LIMIT 5;";
$result = $db->query( $sql );
if( $result ) {
  $arr = $result->fetch_all();
   exit( json_encode($arr) );
  /*echo "<span>";
  foreach($arr as $key => $value){
    echo "<span>$key</span>";
  }
  echo "</span>";
  
  span($arr);
  
  while( $arr = $result->fetch_assoc() ){
    span($arr);  
  }*/
  } else {
  exit("Не верный запрос");
}


function span( $row){
  echo "<span>";
  foreach($row as $value){
    echo "<span>$value</span>";
  }
  echo "</span>";
}


?>