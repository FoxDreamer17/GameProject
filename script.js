alert ("Игра. Управление стрелками, пытайтесь уклониться. Приятной игры!");
console.log ("Первый проект.Осталось сделать: изменение канваса после рестарта,верх и низ не пересекать, движение за игроком, для телефона, db(127,210,260");
//создаем событие на полную загрузку = вся игра
onload=()=>{
  let canvas = document.querySelector('canvas');
  let c = canvas.getContext('2d');//возвращает контекст рисования на холсте
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let score = document.querySelector('.s');
  let showScr = document.querySelector('.St');
  var startBtn = document.querySelector(".button");
  let scoreBoard = document.querySelector('.Start');
  let piu =  document.querySelector('#piu');
  let form = document.querySelector('.Form');
  let leaderboard = document.querySelector('.point');
  let buttonSent = document.querySelector('.buttonSent');
  let h1 = document.querySelector('h1');
  let h3 =  document.querySelector('h3');
  let input = document.querySelector('input');
  
//***********************************************************
//создать игрока через класс
  class Player {
    constructor(x, y, color, radius) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
    }
    draw() {
        c.beginPath(); //сбрасывает текущий и начинает новый
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); //void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        c.fillStyle = this.color;
        c.fill();
        
        if(rightPressed && player.x < (canvas.width - player.radius)) player.x += 2;
        else if(leftPressed && player.x > (0 + player.radius)) player.x -= 2;
        else if(upPressed && (player.y <= (canvas.height - player.radius))) player.y -= 2;
        else if(downPressed && player.y>= 0) player.y += 2;
      }
    }

    //распологаем игрока
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let player = new Player(x, y, 'white', 10);
    let rightPressed = false;
    let leftPressed = false;
    let upPressed = false;
    let downPressed = false;
    
    //*********************************************************************
    //создаем снаряд
    class Projectile {
    constructor(x, y, color, radius, velocity) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.velocity = velocity;
        }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        }
    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        }
      }
//****************************************************************************
      //создаем врагов
  class Enemy {
    constructor(x, y, color, radius, velocity) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = radius;
      this.velocity = velocity;
      }
    draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      }
    update() {
      this.draw();
      this.x = this.x + this.velocity.x;
      this.y = this.y + this.velocity.y;
      
        }
      }
    
//********************************************************************************
//добавляю эффект взрыва при попадании
  class Particle{
    constructor(x,y,radius,color,velocity){
      this.x=x;
      this.y=y;
      this.radius=radius;
      this.color=color;
      this.velocity=velocity;
      this.alpha=2;
      }
    draw() {
      c.save();
      c.globalAlpha=this.alpha; //извлекает алфа значение цвета
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.restore();
      }
    update() {
      this.draw();
      this.x = this.x + this.velocity.x;
      this.y = this.y + this.velocity.y;
      this.alpha-=0.05;
      }
    }
    let projectile = new Projectile(canvas.width / 2, canvas.height / 2, 'white', 10, {
      x: 2,
      y: 1
    });
    form.style.display='none';
    
    input.addEventListener("input", changeInput);
   
    function changeInput(){
     let text = txtInp();
     if(text.length > 0){ 
      buttonSent.disabled = false; 
     } else {
       buttonSent.disabled = true;
     }
   }
   
   function txtInp(){
     return input.value.trim(); // обрезаем пробелы по краям у текста в инпуте 
     }
//создаем массивы
  let projectiles = [];
  let enemies = [];
  let particles=[];
  
//создаем функцию рестарт
  function init() {
    projectiles = [];
    enemies = [];
    particles=[];
    player = new Player(x, y, 'white', 10);
  }

  //функции массивов
    function spawnEnemy() {
        setInterval(() => {
     let radius = Math.random()*(30-4)+4;
     let x;
     let y;
    if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
        y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }
    let color = `hsl(${Math.random()*360},50%,50%`;
    let angle = Math.atan2( //возвращает арктангенс
      player.y - y,
      player.x - x
      );
    let velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    };
    enemies.push(new Enemy(x,y,color,radius,velocity));
    }, 1000);
  }
  let scoreO =0 ;
  
//создаем анимацию основную
  function animate() {
    animationId=  requestAnimationFrame(animate);
      c.fillStyle='rgba(0,0,0,0.1)';
      c.fillRect(0, 0, canvas.width, canvas.height);
      player.draw();
      particles.forEach((particle,index)=>{
    if (particle.alpha<=0){
      particles.splice(index,1);
    }else{
    particle.update();
    }
  });
    projectiles.forEach((projectile,index) => {
      projectile.update();
    if(projectile.x+projectile.radius<0||
      projectile.x-projectile.radius>canvas.width||projectile.y+projectile.radius<0||projectile.y-projectile.radius>canvas.height){
      setTimeout(()=>{
        projectiles.splice(index,1);
      },0);
    }
  });
    
    function keyDownHandler(e) {
     if(e.keyCode == 39)rightPressed = true;
     else if(e.keyCode == 37) leftPressed = true;
     else if(e.keyCode == 38) upPressed = true;
     else if(e.keyCode == 40) downPressed = true;
    }

    function keyUpHandler(e) {
        if(e.keyCode == 39) rightPressed = false;
        else if(e.keyCode == 37) leftPressed = false;
        else if(e.keyCode == 38) upPressed = false;
        else if(e.keyCode == 40) downPressed = false;
    }
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
      enemies.forEach((enemy,index)=>{
        enemy.update();
    let dist = Math.hypot(player.x-enemy.x,player.y-enemy.y);
    if(dist - player.radius - enemy.radius < 1){
        //когда игра окончилась, показывает рестарт
        scoreBoard.style.display='block';
        form.style.display='block';
        h1.innerHTML = 'Вы набрали ' + scoreO + ' очков';
        h3.innerHTML = 'Введите Ваше имя';
        cancelAnimationFrame(animationId);
    }

  projectiles.forEach((projectile,projectileindex)=>{
    const dist = Math.hypot(projectile.x-enemy.x,projectile.y-enemy.y);
    //когда настигает враг
    if(dist - enemy.radius - projectile.radius<1){
      //счет
      scoreO+=100;
      score.innerHTML=scoreO;
      showScr.innerHTML=scoreO;
      //симуляция огня
      for(let i=0;i<enemy.radius*2;i++){
          particles.push(new Particle(projectile.x,projectile.y,Math.random()*3,enemy.color,{
          x:(Math.random()-0.5)*(Math.random()*10),
          y:(Math.random()-0.5)*(Math.random()*10)
          }));
        }
    if(enemy.radius-10>10){
        gsap.to(enemy,{
        radius:enemy.radius-10
        });
        setTimeout(()=>{
        projectiles.splice(projectileindex,1);
        });
      }else{
       setTimeout(()=>{
       enemies.splice(index,1);
       projectiles.splice(projectileindex,1);
       },0);
      }
     }
   });
  });
}
//активируем огонь
window.addEventListener('click', (Event) => {
  let angle = Math.atan2(Event.clientY - player.y, Event.clientX - player.x);
  let velocity = {
    x: Math.cos(angle)*5,
    y: Math.sin(angle)*5
  };
  projectiles.push(new Projectile(player.x, player.y,'white', 5, velocity));
});
 window.addEventListener('click',() => piu.play());
 buttonSent.addEventListener('click', async function( event ){
      event.preventDefault();
      let nickname = input.value; 
      let option = {
        method: "post",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: "nickname=" + nickname + "&score=" + scoreO
      };
      let responce = await fetch("form_obr.php", option);
      let text = await responce.text(); // получаем текст ответа
      let arrLeader = JSON.parse(text);
      form.style.display='none';
      showScr.innerHTML="Таблица лидеров";
      //console.log (arrLeader[0[1]]);
     leaderboard.innerHTML="Первый игрок — "+arrLeader[0][1]+" набрал "+arrLeader[0][2]+" баллов "+"<br>"+
     "Второй игрок — "+arrLeader[1][1]+" набрал "+arrLeader[1][2]+" баллов"+"<br>"+
     "Третий игрок — "+arrLeader[2][1]+" набрал "+arrLeader[2][2]+" баллов"+"<br>"+
     "Четвертый игрок — "+arrLeader[3][1]+" набрал "+arrLeader[3][2]+" баллов"+"<br>"+
     "Пятый игрок — "+arrLeader[4][1]+" набрал "+arrLeader[4][2]+" баллов"+"<br>";
    }) //отправка формы
 
//активируем клавиши движения
//делаем кнопку старта
//анимация
//возрождаем врагов

startBtn.addEventListener("click",()=>{
  init();
  spawnEnemy();
  animate();
  scoreBoard.style.display='none';
  form.style.display='none';
  zeroScore=0;
  score.innerHTML=zeroScore;
  scoreO=0;
  startBtn.innerHTML="Попробовать снова";
});
};