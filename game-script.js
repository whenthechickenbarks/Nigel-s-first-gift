console.log("JS is connected");

const buttonPanel = {
    action: document.querySelector("#action-button"),
    left: document.querySelector("#left-button"),
    right: document.querySelector("#right-button")
};

const displayImage = document.querySelector(".display-image");
const mainScreen = document.querySelector(".main-screen");
const messageScreen = document.querySelector(".message-screen")

const cards = {
    current: 0,
    thumbnails: [
        "./images/bananagrams.png",
        "./images/questBoard.png",
        "./images/pokeball.png",
        "./images/cat.png",
        "./images/folder.png"
    ],
    images: [
        "./images/tiles.png",
        "./images/crazy-seal-seal.gif",
        "./images/axew.png",
        "./images/chipi.gif",
        "./images/us.png"
    ],
    thumbnailMessages: [
        "its a computerrr turn it on!",
        "oh its a fridgeee, open it!",
        "It's a pokeball! I wonder what's inside?",
        "EEE YERR A GHOSTTT",
        "Last one :( its a folder",
    ],
    contentMessages: [
        "OHHH ELVY GIVING YOU FLOWERSSS, I hope you can forgive me for ragebaiting you so much hehe",
        "OMG ITS YOU",
        "It's your favourite pokemon hehhehe",
        "Oh its your POLAR BEARRRRR",
        "It's us :') I love you so much, Happy Valentines Day!"
    ],
    getCurrentThumbnail: function () {
        return this.thumbnails[this.current];
    },
    getCurrentImage: function () {
        return this.images[this.current];
    },
    getCurrentThumbnailMessage: function () {
        return this.thumbnailMessages[this.current];
    },
    getCurrentContentMessage: function () {
        return this.contentMessages[this.current];
    },
    canScrollRight: function () {
        return this.current < (this.thumbnails.length - 1);
    },
    canScrollLeft: function () {
        return this.current > 0;
    },
    scroll: function (direction) { this.current += direction; }
};

const phase = {
    START: 0,
    MAILBOX: 1,
    LETTER: 2
}

const direction = {
    RIGHT: 1,
    LEFT: -1
}

let currentPhase = phase.START;

buttonPanel.action.addEventListener("click", () => {
    switch (currentPhase) {
        case phase.START:
        case phase.LETTER:
            goToMailbox();
            break;
        case phase.MAILBOX:
            goToCard();
            break;
    }
});

buttonPanel.right.addEventListener("click", () => {
    if (cards.canScrollRight()) {
        scrollThumnails(direction.RIGHT);
    }
});

buttonPanel.left.addEventListener("click", () => {
    if (cards.canScrollLeft()) {
        scrollThumnails(direction.LEFT);
    }
});

function scrollThumnails(direction) {
    cards.scroll(direction);
    updateMailBox();
}

function goToMailbox() {
    currentPhase = phase.MAILBOX;
    buttonPanel.action.textContent = "Open";
    mainScreen.style['align-items'] = "center";
    displayImage.classList.add("bounce");
    updateMailBox();
}

function goToCard() {
    currentPhase = phase.LETTER;
    buttonPanel.action.textContent = "Back";
    messageScreen.textContent = cards.getCurrentContentMessage();
    displayImage.src = cards.getCurrentImage();
    setButtons();
}

function updateMailBox() {
    displayImage.src = cards.getCurrentThumbnail();
    messageScreen.textContent = cards.getCurrentThumbnailMessage();
    setButtons();
}

function setButtons() {
    buttonPanel.left.disabled = (currentPhase === phase.LETTER) || !cards.canScrollLeft();
    buttonPanel.right.disabled = (currentPhase === phase.LETTER) || !cards.canScrollRight();
}