function start() {
        document.getElementById('inicio').style.display = 'none';

        document.getElementById('memory-game').style.display = 'flex';
    
}

const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;


function flipCard() {
    if(this === firstCard) return; 
    if(lockBoard) return;

    this.classList.add('flip');

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false; 
    chechForMatch();
    if(firstCard != secondCard) {
        return animationCard()
    } 
}

function chechForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return
    } else {
    unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('animation2');
    secondCard.classList.add('animation2');

    resetBoard();
    
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        firstCard.classList.remove('animation');
        secondCard.classList.remove('animation');
        
       resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
       let randomPosition = Math.floor(Math.random() * 12);
       card.style.order = randomPosition;
    });
 })();

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

function animationCard() {
     firstCard.classList.add('animation');
     secondCard.classList.add('animation');
} 
