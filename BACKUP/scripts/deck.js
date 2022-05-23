class Card {
  read() {
    console.log(`${this.value} of ${this.suit}`);
  }
}

let deck = [];
for (let i = 0; i < 52; i++) {
  let new_card = new Card();
  new_card.value = i;
  if (i <= 13) new_card.suit = 'Spades';
  if (i > 13 && i <= 26) new_card.suit = 'Hearts';
  if (i > 26 && i <= 39) new_card.suit = 'Clubs';
  if (i > 39) new_card.suit = 'Diamonds';
  deck.push(new_card);
}
