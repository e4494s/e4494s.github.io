function randColor() {
  return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

function coin() {
  return Math.round(Math.random()) == 1;
}

function rectsTouching(rect1, rect2) {
  if (rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x) return false;
  if (rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y) return false;
  return true;
}

function circlesTouching(x1, y1, r1, x2, y2, r2) {
  return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) <= ((r1 + r2) * (r1 + r2));
}

function randBetween(min, max, round) {
  let rand = (Math.random() * (max - min)) + min;
  if (round) rand = Math.round(rand);
  return rand;
}
