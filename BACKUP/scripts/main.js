// Colors

function RGB(r, g, b) {
  this.r = typeof r != "undefined" ? r : Math.round(Math.random() * 255);
  this.g = typeof g != "undefined" ? g : Math.round(Math.random() * 255);
  this.b = typeof b != "undefined" ? b : Math.round(Math.random() * 255);
  this.vr = 1;
  this.vg = 1;
  this.vb = 1;
  this.randomize = function() {
    this.r = Math.round(Math.random() * 255);
    this.g = Math.round(Math.random() * 255);
    this.b = Math.round(Math.random() * 255);
  };
  this.invert = function() {
    this.r = 255 - this.r;
    this.g = 255 - this.g;
    this.b = 255 - this.b;
  };
  this.increment = function(n) {
    this.r += n * this.vr;
    this.g += n * this.vg;
    this.b += n * this.vb;
    if (this.r > 255) {
      this.r = 255;
      this.vr = -1;
    }
    if (this.r < 0) {
      this.r = 0;
      this.vr = 1;
    }
    if (this.g > 255) {
      this.g = 255;
      this.vg = -1;
    }
    if (this.g < 0) {
      this.g = 0;
      this.vg = 1;
    }
    if (this.b > 255) {
      this.b = 255;
      this.vb = -1;
    }
    if (this.b < 0) {
      this.b = 0;
      this.vb = 1;
    }
  };
  this.print = () => `rgb(${this.r},${this.g},${this.b})`;
}

function HSL(h, s, l) {
  this.h = typeof h != "undefined" ? h : Math.round(Math.random() * 360);
  this.s = typeof s != "undefined" ? s : Math.round(Math.random() * 100);
  this.l = typeof l != "undefined" ? l : Math.round(Math.random() * 100);
  this.vs = 1;
  this.vl = 1;
  this.randomize = function() {
    this.h = Math.round(Math.random() * 360);
    this.s = Math.round(Math.random() * 100);
    this.l = Math.round(Math.random() * 100);
  };
  this.invert = function() {
    this.h = 360 - this.h;
    this.s = 100 - this.s;
    this.l = 100 - this.l;
  };
  this.increment = function(n1, n2, n3) {
    this.h += n1;
    this.s += n2 * this.vs;
    this.l += n3 * this.vl;
    while (this.h > 360) this.h -= 360;
    
    if (this.s > 100) {
      this.s = 100;
      this.vs = -1;
    }
    if (this.s < 0) {
      this.s = 0;
      this.vs = 1;
    }
    if (this.l > 100) {
      this.l = 100;
      this.vl = -1;
    }
    if (this.l < 0) {
      this.l = 0;
      this.vl = 1;
    }
  };
  this.print = () => `hsl(${this.h}deg,${this.s}%,${this.l}%)`;
}

function randHexColor() {
  let hex = Math.floor(Math.random() * 255).toString(16) + Math.floor(Math.random() * 255).toString(16) + Math.floor(Math.random() * 255).toString(16);
  while (hex.length < 6) hex = "0" + hex;
  return "#" + hex;
}

// Canvas functions

CanvasRenderingContext2D.prototype.fillRectFromCenter = function(x, y, width, height) {
  this.fillRect(x - width / 2, y - height / 2, width, height);
};
CanvasRenderingContext2D.prototype.strokeRectFromCenter = function(x, y, width, height) {
  this.strokeRect(x - width / 2, y - height / 2, width, height);
};

CanvasRenderingContext2D.prototype.fillCircle = function(x, y, radius) {
  this.beginPath();
  this.arc(x, y, radius, 0, Math.PI * 2);
  this.fill();
};
CanvasRenderingContext2D.prototype.strokeCircle = function(x, y, radius) {
  this.beginPath();
  this.arc(x, y, radius, 0, Math.PI * 2);
  this.stroke();
};

CanvasRenderingContext2D.prototype.drawImageFromCenter = function(image, x, y, width, height) {
  this.drawImage(image, x - width / 2, y - height / 2, width, height);
};

CanvasRenderingContext2D.prototype.fillRotatedRect = function(x, y, width, height, angle) {
  this.save();
  this.translate(x, y);
  this.rotate(angle * Math.PI / 180);
  this.fillRect(0, 0, width, height);
  this.restore();
};
CanvasRenderingContext2D.prototype.strokeRotatedRect = function(x, y, width, height, angle) {
  this.save();
  this.translate(x, y);
  this.rotate(angle * Math.PI / 180);
  this.strokeRect(0, 0, width, height);
  this.restore();
};

CanvasRenderingContext2D.prototype.drawRotatedImage = function(image, x, y, width, height, angle) {
  this.save();
  this.translate(x, y);
  this.rotate(angle * Math.PI / 180);
  this.drawImage(image, 0, 0, width, height);
  this.restore();
};

CanvasRenderingContext2D.prototype.fillRotatedRectFromCenter = function(x, y, width, height, angle) {
  this.save();
  this.translate(x, y);
  this.rotate(angle * Math.PI / 180);
  this.fillRect(width / -2, height / -2, width, height);
  this.restore();
};
CanvasRenderingContext2D.prototype.strokeRotatedRectFromCenter = function(x, y, width, height, angle) {
  this.save();
  this.translate(x, y);
  this.rotate(angle * Math.PI / 180);
  this.strokeRect(width / -2, height / -2, width, height);
  this.restore();
};

CanvasRenderingContext2D.prototype.drawRotatedImageFromCenter = function(image, x, y, width, height, angle) {
  this.save();
  this.translate(x, y);
  this.rotate(angle * Math.PI / 180);
  this.drawImage(image, width / -2, height / -2, width, height);
  this.restore();
};

// Math

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

function toDeg(radians) {
  return radians * (180 / Math.PI);
}

function randBetween(min, max) {
  return (Math.random() * (max - min)) + min;
}

Number.prototype.clamp = function(min, max) {
  return Math.max(Math.min(this, Math.max(min, max)), Math.min(min, max));
};

Number.prototype.toMultipleOf = function(n) {
  return Math.round(this / n) * n;
};

function randSign() {
  return Math.round(Math.random()) == 0 ? 1 : -1;
}
