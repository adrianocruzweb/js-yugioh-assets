const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementsByClassName('score_points'),
    },
    cardSprites: {
        avatar: document.getElementById('card_image'),
        name: document.getElementById('card_name'),
        type: document.getElementById('card_type'),
    },
    playerSides: {
        player: "player_cards",
        playerBOX: document.getElementById('player_cards'),
        computer: "computer_cards",
        computerBOX: document.getElementById('computer_cards'),
    },
    fieldCards: {
        player: document.getElementById('player_field_card'),
        computer: document.getElementById('computer_field_card'),
    },
    actions: {
        button: document.getElementById('next_duel')
    }
};

const pathImg = "./src/assets/icons/";

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

const resetDuel = async () => {
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
}

const playAudio = async (status) => {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    try {
        audio.play();
    } catch (error) {
        console.error("OK não temos som de empate");
    }

}

const getRandomCardId = async () => {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

const removeAllCardsImages = async () => {
    let {computerBOX, playerBOX} = state.playerSides;
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = playerBOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}

const checkDuelResults = async (playerCardId, computerCardId) => {
    let duelResults = "draw";
    let playerCard = cardData[playerCardId];

    if(playerCard.WinOf.includes(computerCardId)){
        duelResults = "WIN";
        state.score.playerScore++;
    }

    if(playerCard.LoseOf.includes(computerCardId)){
        duelResults = "LOSE";
        state.score.computerScore++;
    }

    await playAudio(duelResults.toLowerCase());

    return duelResults;

}

const hiddenCardDetails = async () => {
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
}

const drawButton = async (text) => {
    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";

}

const updateScore = async () => {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore}
     | Lose: ${state.score.computerScore}`;
}

const showHiddenCardDetails = async (value) => {
    if(value === true) {
        state.fieldCards.player.style.display = 'block';
        state.fieldCards.computer.style.display = 'block';
    }

    if(value === false) {
        state.fieldCards.player.style.display = 'none';
        state.fieldCards.computer.style.display = 'none';
    }
}

const drawCardsInField = async (cardID, computerCardID) => {
    state.fieldCards.player.src = cardData[cardID].img;
    state.fieldCards.computer.src = cardData[computerCardID].img;
}

const setCardsField = async (cardID) => {
    await removeAllCardsImages();

    let computerCardID = await getRandomCardId();

    await showHiddenCardDetails(true);

    await hiddenCardDetails();

    await drawCardsInField(cardID, computerCardID);

    let duelResults = await checkDuelResults(cardID, computerCardID);

    await updateScore();
    await drawButton(duelResults);

}

const drawSelectCard = async (index) => {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Atribute : " + cardData[index].type;
}

const createCardImage = async (randomIdCard, fieldSide) => {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height","100px");
    cardImage.setAttribute("src","./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", randomIdCard);
    cardImage.classList.add("card");

    if(fieldSide === state.playerSides.player){
        cardImage.addEventListener("click", ()=>{
            setCardsField(cardImage.getAttribute("data-id"));
        })
    }

    cardImage.addEventListener("mouseover", ()=>{
        drawSelectCard(randomIdCard);
    })

    return cardImage;
}

const drawCards = async (cardNumbers, fieldSide) => {
    for(let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

const init = () => {
    showHiddenCardDetails(false);

    const bgm = document.getElementById("bgm");
    bgm.play();

    drawCards(5,state.playerSides.player);
    drawCards(5,state.playerSides.computer);
}

init();