  const ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 500;
  
  let width = 50;
  let height = 50;
  
  let gravity = 0.25;
  let blackhole = {};
  blackhole.power = 0.3;
  blackhole.x = canvas.width - (width + 25);
  blackhole.y = 25;
  blackhole.image = new Image();
  blackhole.image.src = 'images/blackhole.png';
  
  let ball = {};
  ball.x = 25;
  ball.y = 25;
  ball.lastX = 25;
  ball.lastY = 25;
  ball.gravity_acc = 0;
  ball.blackhole_acc = 0;
  /*ball.vector = {
    angle: 0,
    magnitude: 0
  };*/
  ball.image = new Image();
  ball.image.src = 'images/ball.png';
  ball.moveTowards = function(targetX, targetY, targetPower) {
    let distX = targetX - ball.x;
    let distY = targetY - ball.y;
    let angleToTarget = Math.atan(distY / distX);
    let moveDistX = Math.cos(angleToTarget) * targetPower;
    let moveDistY = Math.sin(angleToTarget) * targetPower;
    ball.x += moveDistX;
    ball.y += moveDistY;
  };
  
  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.gravity_acc += gravity;
    ball.blackhole_acc += blackhole.power;
    ball.moveTowards(ball.x, canvas.height - height, ball.gravity_acc);
    ball.moveTowards(blackhole.x, blackhole.y, ball.blackhole_acc);
    ctx.drawImage(ball.image, ball.x, ball.y, width, height);
    ctx.drawImage(blackhole.image, blackhole.x, blackhole.y, width, height);
    requestAnimationFrame(frame);
  }
  frame();
  
  function mouseMoveHandler(e) {
    blackhole.x = e.clientX;
    blackhole.y = e.clientY;
  }
  addEventListener('mousemove', mouseMoveHandler);
