  const ctx2 = canvas2.getContext("2d");
  canvas2.width = canvas2.height = 1500;
  
  let Tree2 = {
    startX: 0.5,
    startY: 0.9,
    startLength: 250,
    startAngle: 270,
    startWidth: 15,
    minWidth: 0.5,
    maxSplits: 8,
    minSplits: 2,
    maxLayers: 7,
    startHue: 0,
    startBend: 0.5,
    startLerp: 0.5,
    currentTotalBranches: 0,
    stopped: false,
    leafChance: 0.5,
    minRandLengthRatio: 0.5,
    minRandWidthRatio: 0.5,
    randOffsetAngle: 45,
    randOffsetHue: 30,
    randBend: 0.5
  };
  Tree2.draw = function() {
    ctx2.globalAlpha = 1;
    ctx2.fillStyle = "black";
    ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    ctx2.lineCap = ctx2.lineJoin = "round";
    ctx2.globalAlpha = 0.5;
    this.startHue = Math.random() * 360;
    this.startBend = randBetween(-this.randBend / 2, this.randBend / 2);
    this.startLerp = Math.random();
    this.currentTotalBranches = 0;
    this.stopped = false;
    this.drawBranch(this.startX * canvas2.width, this.startY * canvas2.height, this.startLength, this.startBend, this.startLerp, this.startWidth, this.startAngle, this.startHue, 1);
  };
  Tree2.drawBranch = function(x, y, length, bend, lerp, width, angle, hue, currLayer) {
    if (currLayer > this.maxLayers || this.stopped) return;
    this.currentTotalBranches++;
    if (this.currentTotalBranches >= 100000) {
      this.stopped = true;
      return;
    }
    let endX = x + (length * Math.cos(toRad(angle)));
    let endY = y + (length * Math.sin(toRad(angle)));
    let dx = endX - x;
    let dy = endY - y;
    let midpointX = ((1 - lerp) * x) + (lerp * endX);
    let midpointY = ((1 - lerp) * y) + (lerp * endY);
    let normal = toRad(angle + 90);
    let controlX = midpointX + (length * bend * Math.cos(normal));
    let controlY = midpointY + (length * bend * Math.sin(normal));
    ctx2.lineWidth = Math.max(width, this.minWidth);
    ctx2.strokeStyle = `hsl(${hue}deg, 100%, 30%)`;
    ctx2.beginPath();
    ctx2.moveTo(x, y);
    ctx2.quadraticCurveTo(controlX, controlY, endX, endY);
    ctx2.stroke();
    let splits = Math.round(randBetween(this.minSplits, this.maxSplits));
    if (currLayer === this.maxLayers || splits === 0) {
      if (Math.random() > this.leafChance) return;
      let lengthRatio = randBetween(this.minRandLengthRatio, 0.9);
      let offsetAngle = randBetween(-this.randOffsetAngle, this.randOffsetAngle);
      let offsetHue = randBetween(-this.randOffsetHue, this.randOffsetHue);
      let bend = randBetween(0.25, 0.5);
      let lerp = Math.random();
      this.drawLeaf(endX, endY, length * lengthRatio, bend, lerp, angle + offsetAngle, hue + offsetHue);
      return;
    }
    for (let i = 0; i < splits; i++) {
      let lengthRatio = randBetween(this.minRandLengthRatio, 0.9);
      let widthRatio = randBetween(this.minRandWidthRatio, 0.9);
      let offsetAngle = randBetween(-this.randOffsetAngle, this.randOffsetAngle);
      let offsetHue = randBetween(-this.randOffsetHue, this.randOffsetHue);
      let bend = randBetween(-this.randBend, this.randBend);
      let lerp = Math.random();
      this.drawBranch(endX, endY, length * lengthRatio, bend, lerp, width * widthRatio, angle + offsetAngle, hue + offsetHue, currLayer + 1);
    }
  };
  Tree2.drawLeaf = function(x, y, length, bend, lerp, angle, hue) {
    this.currentTotalBranches++;
    ctx2.fillStyle = `hsl(${hue}deg, 100%, 70%)`;
    let endX = x + (length * Math.cos(toRad(angle)));
    let endY = y + (length * Math.sin(toRad(angle)));
    let dx = endX - x;
    let dy = endY - y;
    let normal = toRad(angle + 90);
    let midpointX1 = ((1 - lerp) * x) + (lerp * endX);
    let midpointY1 = ((1 - lerp) * y) + (lerp * endY);
    let controlX1 = midpointX1 + (length * -bend * Math.cos(normal));
    let controlY1 = midpointY1 + (length * -bend * Math.sin(normal));
    let midpointX2 = ((1 - lerp) * x) + (lerp * endX);
    let midpointY2 = ((1 - lerp) * y) + (lerp * endY);
    let controlX2 = midpointX2 + (length * bend * Math.cos(normal));
    let controlY2 = midpointY2 + (length * bend * Math.sin(normal));
    ctx2.beginPath();
    ctx2.moveTo(x, y);
    ctx2.quadraticCurveTo(controlX1, controlY1, endX, endY);
    ctx2.quadraticCurveTo(controlX2, controlY2, x, y);
    ctx2.fill();
  };
  
  function draw2() {
    Tree2.draw();
  }
  draw2();
