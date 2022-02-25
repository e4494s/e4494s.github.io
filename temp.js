  const ctx1 = canvas1.getContext("2d");
  canvas1.width = canvas1.height = 1000;
  
  let gridSize1 = 6;
  let tileSize1 = canvas1.width / gridSize1;
  let hue1 = 120;
  let brightness1 = 50;
  let lineWidth1 = 1;
  let turnSpeed1 = 3;
  let alternateDirections1 = true;
  let globalSign1 = 1;
  
  ctx1.translate(canvas1.width / 2, canvas1.height / 2);
  ctx1.rotate(Math.PI / 4);
  ctx1.fillStyle = "black";
  ctx1.fillRect(-canvas1.width, -canvas1.height, canvas1.width * 2, canvas1.height * 2);
  
  function Square1(x, y, initialSize, turnSign) {
    this.x = x;
    this.y = y;
    this.initialSize = initialSize * Math.SQRT1_2;
    this.size = this.initialSize;
    this.angle = 0;
    this.turnSign = turnSign;
    this.lastSize = this.size;
    this.lastAngle = this.angle;
  }
  Square1.prototype.render = function() {
    if (this.size < 0.001) {
      this.size = this.lastSize = 0;
      return;
    }
    this.angle = (this.angle + 90) % 90;
    let diff = ((this.angle - this.lastAngle) + 90) % 90;
    this.size = this.lastSize / (Math.sin(toRad(90 - diff)) + Math.cos(toRad(90 - diff)));
    let currA = this.angle + 45;
    ctx1.beginPath();
    for (let i = 0; i <= 4; i++) {
      currA += 90;
      ctx1.lineTo(this.x + (this.size * Math.cos(toRad(currA))), this.y + (this.size * Math.sin(toRad(currA))));
    }
    ctx1.stroke();
    this.lastAngle = this.angle;
    this.lastSize = this.size;
    this.angle += turnSpeed1 * this.turnSign;
  };
  let square1Array = [];
  for (let x = -3; x < gridSize1 + 3; x++) {
    for (let y = -3; y < gridSize1 + 3; y++) {
      let turnSign = ((x + y) % 2 === 0) ? 1 : -1;
      if (!alternateDirections1) turnSign = 1;
      turnSign *= globalSign1;
      square1Array.push(new Square1((x * tileSize1) + (tileSize1 / 2) - (canvas1.width / 2), (y * tileSize1) + (tileSize1 / 2) - (canvas1.height / 2), tileSize1, turnSign));
    }
  }

  
  
  function reset1() {
    square1Array = [];
    for (let x = -3; x < gridSize1 + 3; x++) {
      for (let y = -3; y < gridSize1 + 3; y++) {
        let turnSign = ((x + y) % 2 === 0) ? 1 : -1;
        if (!alternateDirections1) turnSign = 1;
        turnSign *= globalSign1;
        square1Array.push(new Square1((x * tileSize1) + (tileSize1 / 2) - (canvas1.width / 2), (y * tileSize1) + (tileSize1 / 2) - (canvas1.height / 2), tileSize1, turnSign));
      }
    }
    
    ctx1.fillStyle = "black";
    ctx1.fillRect(-canvas1.width, -canvas1.height, canvas1.width * 2, canvas1.height * 2);
    for (let i = 0; i < square1Array.length; i++) {
      square1Array[i].size = square1Array[i].initialSize;
      square1Array[i].angle = 0;
      square1Array[i].lastSize = square1Array[i].size;
      square1Array[i].lastAngle = square1Array[i].angle;
    }
  }
  
  function draw1() {
    reset1();
    
    for (let j = 0; j < 200; j++) {
      for (let i = 0; i < square1Array.length; i++) square1Array[i].render();
    }
  }
