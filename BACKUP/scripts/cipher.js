let cipher = {};

cipher.alphabet = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";

cipher.encode = function(input) {
  let output = "";
  
  if (input.cipher == 1) {
    if (input.key === "" || typeof(input.key) != "number") return;
    while (input.key < 0) input.key += 26;
    while (input.key >= 26) input.key -= 26;
    input.key = Math.floor(input.key);
    for (let i = 0; i < input.text.length; i++) {
      let j;
      if (!cipher.alphabet.includes(input.text[i].toLowerCase())) j = input.text[i];
      else j = cipher.alphabet[cipher.alphabet.indexOf(input.text[i].toLowerCase()) + input.key];
      if (input.text[i].toUpperCase() == input.text[i]) j = j.toUpperCase();
      output += j;
    }
  }
  
  if (input.cipher == 2) {
    if (input.key === "" || typeof(input.key) != "string") return;
    for (let i = 0; i < input.key.length; i++) {
      if (!cipher.alphabet.includes(input.key[i].toLowerCase())) return;
    }
    input.key = input.key.toLowerCase();
    let repeated_key = "";
    for (let i = 0; i < input.key.length; i++) {
      if (!cipher.alphabet.includes(input.key[i].toLowerCase())) return;
    }
    let j = 0;
    for (let i = 0; i < input.text.length; i++) {
      if (!cipher.alphabet.includes(input.text[i].toLowerCase())) repeated_key += input.text[i];
      else {
        repeated_key += input.key[j];
        j++;
      }
      if (j > input.key.length - 1) j = 0;
    }
    for (let i = 0; i < input.text.length; i++) {
      let j;
      if (!cipher.alphabet.includes(input.text[i].toLowerCase())) j = input.text[i];
      else j = cipher.alphabet[cipher.alphabet.indexOf(input.text[i].toLowerCase()) + cipher.alphabet.indexOf(repeated_key[i])];
      if (input.text[i].toUpperCase() == input.text[i]) j = j.toUpperCase();
      output += j;
    }
  }
  
  if (input.cipher == 3) {
    if (input.key === "" || typeof(input.key[0]) != "number" || typeof(input.key[1]) != "number" || typeof(input.key) != "object") return;
    let a = Math.floor(input.key[0]);
    let b = Math.floor(input.key[1]);
    for (let i = 0; i < input.text.length; i++) {
      let j;
      let n = ((a * cipher.alphabet.indexOf(input.text[i].toLowerCase())) + b) % 26;
      while (n < 0) n += 26;
      while (n >= 26) n -= 26;
      console.log(n);
      if (!cipher.alphabet.includes(input.text[i].toLowerCase())) j = input.text[i];
      else j = cipher.alphabet[n];
      if (input.text[i].toUpperCase() == input.text[i]) j = j.toUpperCase();
      output += j;
    }
  }
  
  return output;
};

cipher.decode = function(input) {
  let output = "";
  
  if (input.cipher == 1) {
    while (input.key < 0) input.key += 26;
    while (input.key >= 26) input.key -= 26;
    input.key = Math.floor(input.key);
    for (let i = 0; i < input.text.length; i++) {
      let j;
      if (!cipher.alphabet.includes(input.text[i].toLowerCase())) j = input.text[i];
      else j = cipher.alphabet[cipher.alphabet.indexOf(input.text[i].toLowerCase()) + (26 - input.key)];
      if (input.text[i].toUpperCase() == input.text[i]) j = j.toUpperCase();
      output += j;
    }
  }
  
  if (input.cipher == 2) {
    if (input.key === "" || typeof(input.key) != "string") return;
    for (let i = 0; i < input.key.length; i++) {
      if (!cipher.alphabet.includes(input.key[i].toLowerCase())) return;
    }
    input.key = input.key.toLowerCase();
    let repeated_key = "";
    for (let i = 0; i < input.key.length; i++) {
      if (!cipher.alphabet.includes(input.key[i].toLowerCase())) return;
    }
    let j = 0;
    for (let i = 0; i < input.text.length; i++) {
      if (!cipher.alphabet.includes(input.text[i].toLowerCase())) repeated_key += input.text[i];
      else {
        repeated_key += input.key[j];
        j++;
      }
      if (j > input.key.length - 1) j = 0;
    }
    for (let i = 0; i < input.text.length; i++) {
      let j;
      if (!cipher.alphabet.includes(input.text[i].toLowerCase())) j = input.text[i];
      else j = cipher.alphabet[cipher.alphabet.indexOf(input.text[i].toLowerCase()) + (26 - cipher.alphabet.indexOf(repeated_key[i]))];
      if (input.text[i].toUpperCase() == input.text[i]) j = j.toUpperCase();
      output += j;
    }
  }
  
  return output;
};
