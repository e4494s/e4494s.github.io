  function drawOneTriangle4(a, b, c, brightness) {
    ctx4.lineWidth = lineWidth4;
    ctx4.lineCap = ctx4.lineJoin = "round";
    let color = "";
    //let brightness = (0.5 + randBetween(-contrast4 / 2, contrast4 / 2)) * 100;
    let hue = hue4 + randBetween(-180 * hueVariation4, 180 * hueVariation4);
    color = grayscale4 ? `hsl(0deg, 0%, ${brightness}%)` : `hsl(${hue}deg, 100%, ${brightness}%)`;
    ctx4.strokeStyle = drawMode4 === 2 ? color : whiteOutline4 ? "white" : "black";
    ctx4.fillStyle = color;
    ctx4.beginPath();
    ctx4.moveTo(a.x, a.y);
    ctx4.lineTo(b.x, b.y);
    ctx4.lineTo(c.x, c.y);
    ctx4.lineTo(a.x, a.y);
    if (drawMode4 !== 1) ctx4.fill();
    ctx4.stroke();
  }
  
  let lines4 = [];
  function resetLines4() {
    triangleSize4 = canvas4.width / gridSize4;
    lines4 = [];
    let odd = false;
    for (let y = -triangleSize4 * 2; y <= canvas4.height + (triangleSize4 * 2); y += triangleSize4) {
      odd = !odd;
      let line = [];
      for (let x = -triangleSize4 * 2; x <= canvas4.width + (triangleSize4 * 2); x += triangleSize4) {
        line.push({
          x: x + (triangleSize4 * randBetween(-jitter4, jitter4)) + (odd ? triangleSize4 / 2 : 0),
          y: y + (triangleSize4 * randBetween(-jitter4, jitter4))
        });
      }
      lines4.push(line);
    }
    drawTriangles4();
  }
  
  function drawTriangles4() {
    ctx4.fillStyle = whiteOutline4 ? "black" : "white";
    ctx4.fillRect(0, 0, canvas4.width, canvas4.height);
    
    let center = {x: Math.random() * canvas4.width, y: Math.random() * canvas4.height};
    let invert = Math.random() < 0.5;
    let offset = invert ? 10 : -10;
    
    let line = [];
    let odd = true;
    for (let y = 0; y < lines4.length - 1; y++) {
      odd = !odd;
      line = [];
      for (let i = 0; i < lines4[y].length; i++) {
        line.push(odd ? lines4[y][i] : lines4[y + 1][i]);
        line.push(odd ? lines4[y + 1][i] : lines4[y][i]);
      }
      for (let i = 0; i < line.length - 2; i++) {
        let j = i + Math.round(randBetween(0, 2));
        let dx = Math.abs(center.x - line[j].x);
        let dy = Math.abs(center.y - line[j].y);
        let dist = dx + dy;
        let ratio = dist / canvas4.width;
        if (invert) ratio = 1 - ratio;
        drawOneTriangle4(line[i], line[i + 1], line[i + 2], (ratio * 100) + offset);
      }
    }
  }
  
  function draw4() {
    hue4 = Math.random() * 360;
    gridSize4 = Math.round(randBetween(8, 15));
    
    resetLines4();
  }
