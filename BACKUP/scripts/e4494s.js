const e4494s = {};

// Averages around 60% density or so, favors orange/yellow/green, little to no purple
e4494s.random = function() {
  if (typeof this.s == 'undefined') this.s = [Date.now() % 574, Date.now() % 39581929];
  //this.s = [Date.now(), Date.now() % 26];
  let a = this.s[0] * 2;
  let b = this.s[1] * 3;
  
  this.s[0] = b;
  a ^= a << 23;
  a ^= a >> 18;
  a ^= b;
  a ^= b >> 5;
  this.s[1] = a;
  return Number('.' + ((a + b) * 2));
};

// Bitwise digit-by-digit randomization using Math.random()

e4494s.random = function() {
  let result = '';
  for (let i = 0; i < 16; i++) {
    let byte = '';
    for (let j = 0; j < 4; j++) {
      byte += String(Math.round(Math.random()));
    }
    result += byte;
  }
  return Number('.' + parseInt(result, 2));
};

// Numberwise digit-by-digit randomization using Math.random()

/*e4494s.random = function() {
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return Number('.' + result);
};*/
