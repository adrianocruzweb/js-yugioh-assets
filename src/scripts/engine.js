const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementsByClassName('score_points'),
    },
    cardsSprites: {
        avatar: document.getElementById('card_image'),
        name: document.getElementById('card_name'),
        type: document.getElementById('card_type'),
    },
    fieldCards: {
        player: document.getElementById('player_field_card'),
        computer: document.getElementById('computer_field_card'),
    },
    button: document.getElementById('next_duel')
};

const pathImg = ".src/assets/icons/";

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImg}dragon.png`,
        WinOf: [1],
        LoseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImg}magician.png`,
        WinOf: [2],
        LoseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImg}exodia.png`,
        WinOf: [0],
        LoseOf: [1],
    },
];

const playerSides = {
    player1: "player_field_card",
    computer: "computer_field_card",
};

const getRamdomCardId = async () => {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

const drawCards = async (cardNumbers, fieldSide) => {
    for(let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

const init = () => {
    drawCards(5,playerSides.player1);
    drawCards(5,playerSides.computer);
}

init();