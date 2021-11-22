
let deck = [];

const cardsData = [
  {
    type: "deafening",
    image:  "deafening",
    flipped: false,
    matched: false
  },
  {
    type: "silverflame",
    image: "silverflame",
    flipped: false,
    matched: false
  },
  {
    type: "realm",
    image: "realm",
    flipped: false,
    matched: false
  },
  {
    type: "acclaimed",
    image: "acclaimed",
    flipped: false,
    matched: false
  },
  {
    type: "knight",
    image: "knight",
    flipped: false,
    matched: false
  },
  {
    type: "shining",
    image: "shining",
    flipped: false,
    matched: false
  }
];

function buildDeck() {

  let cards = [];
  // duplicate so we have two of each
  cardsData.forEach(x=>{
    cards.push({...x});
    cards.push({...x})
  });

  // shuffle
  const length = cards.length;
  for (let i=0; i<length; ++i) {
    const randomIndex = Math.floor(Math.random()*length);
    let temp = cards[i];
    cards[i] = cards[randomIndex];
    cards[randomIndex] = temp;
  }

  for (let i=0; i<length;++i) {
    cards[i].index = i;
  }
  return cards;
}

function updateStatus() {
  const statusEl = document.getElementById('status');
  if (deck.filter(x=>!x.flipped).length===0) {
    statusEl.innerHTML = '<h2>You won!</h2>';
  }
  else {
    statusEl.innerHTML = '<h2>Try again</h2>';
  }
}

function updateImage(index, showBlank, showCard) {
  const blankImg = document.getElementById(`img-blank-${index}`);
  const cardImg = document.getElementById(`img-card-${index}`);
  blankImg.style.display = showBlank?"block":"none";
  cardImg.style.display = showCard?"block":"none";
}

function onCardClicked(index) {
  if (!deck[index].matched) {
    deck[index].flipped = !deck[index].flipped;
    const openCards = deck.filter(x=>x.flipped && !x.match);
    if (openCards.length === 2) {
      const [first, second] = openCards;
      if (first.type === second.type)  {
        first.match = true;
        second.match = true;
        updateImage(second.index, false, true);
        updateStatus();
      }
      else {
        updateImage(second.index, false, true);

        setTimeout.current = setTimeout(()=> {
          first.flipped = false;
          second.flipped = false;

          updateImage(first.index, true, false);
          updateImage(second.index, true, false);

          updateStatus();
        }, 1000);
      }  
    } 
    else {
      updateImage(index, false, true);
    }
  }
}

function clickImg() {
  console.log("clicked");
}
function buildCardGrid() {
  
  const cardGridEl = document.getElementById('card-grid');
  
  const gridHTML = deck.map((card, index) => {
    return `
      <div>
        <img id="img-blank-${index}" src="images/blank.jpg" alt=""  onclick="onCardClicked(${index});" />
        <img style="display:none"  id="img-card-${index}" src="images/${card.image}.png" alt=""  onclick="()=> { onCardClicked(${index}); }" />
      </div>
      `
  }).join("");

  cardGridEl.innerHTML = gridHTML;
}
  
function setupGame() {
  const btnEl = document.getElementById('restart-btn');
  btnEl.addEventListener('click', ()=> {
    deck = buildDeck();
    buildCardGrid();
  });
}

setupGame();



