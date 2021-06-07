<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Игра</title>
    <!--Подключаем css и предзагрузку шрифта -->
    <link rel="stylesheet" href="style.css">
    <link rel="preload" href="alpha_echo.ttf" as="font">
    <link rel="shortcut icon" href="icon.png" type="image/png">
</head>
  <body>
    <?php
    include "db.php";
    ?>
     <audio id = 'piu' src="piu.mp3"></audio>
    <!--Рисую счетчик и старт  -->
    <div class="Score">
      <span>СЧЕТ:</span><span class = "s">0</span>
    </div>
    <div class="Start">
      <span class="St" >0</span><br>
      <span class="point">ОЧКОВ</span><br>
      <button class="button">СТАРТ</button>
    </div>
   <form class = "Form" action="form_obr.php" method="post">
    <h1></h1>
    <h3></h3>
    <input type="text" placeholder="Имя"> <br>
    <button disabled class="buttonSent">Отправить</button>
  </form>
    <canvas></canvas>
    <!--Подключаем сам проект gsap для анимации смерти крупных врагов-->
    <script src="script.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.0/gsap.min.js" integrity="sha512-1dalHDkG9EtcOmCnoCjiwQ/HEB5SDNqw8d4G2MKoNwjiwMNeBAkudsBCmSlMnXdsH8Bm0mOd3tl/6nL5y0bMaQ==" crossorigin="anonymous"></script>
  </body>
</html>
