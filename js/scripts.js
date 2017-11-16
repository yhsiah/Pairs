const cards = []
const suits = ["Spades", "Clubs", "Diamonds", "Hearts"]
const pictures = ["Jack", "Queen", "King", "Ace"]
const selectedCards = document.getElementsByClassName('selected')

const createNumberCards = (suit) => {
    for (let index = 2; index < 11; index++) {
        const card = document.createElement("div")
        card.className = "card " + index + " unmatched " + assignCardColour(suit)
        card.id = index + "-of-" + suit
        card.innerHTML = index + " of " + suit
        cards.push(card)
    }
}

const createPictureCards = (suit) => {
    pictures.forEach(picture => {
        const card = document.createElement("div")
        card.className = "card " + picture + " unmatched " + assignCardColour(suit)
        card.id = picture + "-of-" + suit
        card.innerHTML = picture + " of " + suit
        cards.push(card)
    })
}

const assignCardColour = (suit) => {
    if (suit == "Spades" || suit == "Clubs") {
        return "black"
    }
    else {
        return "red"
    }
}

const createCards = () => {
    suits.forEach((suit) => {
        createNumberCards(suit)
        createPictureCards(suit)
        console.log("Cards created")
    })
}

const randomizeCards = () => {
    let currentIndex = cards.length
    let temporaryValue
    let randomIndex
      
    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        temporaryValue = cards[currentIndex]
        cards[currentIndex] = cards[randomIndex]
        cards[randomIndex] = temporaryValue
    }
    console.log("Cards randomized")
}

const renderCards = () => {
    const container = document.getElementById("container")
    cards.forEach(card => {
        container.appendChild(card)
    })
    console.log("Cards rendered")
}

const addCardListeners = () => {
    document.querySelectorAll('.card').forEach(card => {
        card.onclick = e => clickCard(e.target)
    })
    console.log("Card listeners added")
}

const clickCard = (card) => {
    console.log("Card clicked")
    if (selectedCards.length > 1) {
        cardMatchChecker(selectedCards)
        deselectCards()
    }
    else {
        selectCard(card)
    }
}

const selectCard = (card) => {
    if (card.classList.contains('matched')) {
        console.log("Cannot select an already matched card")
    }
    else {
        card.classList.toggle('selected')
        console.log("Selected cards = " + selectedCards.length)
    }
}

const deselectCards = () => {
    document.querySelectorAll('.selected').forEach(card => {
        card.classList.remove("selected")
    })
    console.log("Selected cards reset to " + selectedCards.length)
}

const cardMatchChecker = (selectedCards) => {
    console.log("Checking two cards...")
    if (selectedCards[0].className == selectedCards[1].className) {
        console.log("Match!")
        document.querySelectorAll('.selected').forEach(card => {
            card.classList.remove("unmatched")
            card.classList.add("matched")
            card.classList.remove("selected")
            console.log("Removing matching cards")
            gameFinishedChecker()
        })
    }
    else {
        console.log("No matching cards found")
    }
}

const gameFinishedChecker = () => {
    const unmatchedCards = document.getElementsByClassName('unmatched')
    if (unmatchedCards.length == 0) {
        alert("Well done! You've got too much time on your hands...")
    }
}

const initialize = () => {
    createCards()
    randomizeCards()
    renderCards()
    addCardListeners()
}

window.onload = () => {
    initialize()

}