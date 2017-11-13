const cards = []
const suits = ["Spades", "Clubs", "Diamonds", "Hearts"]
const pictures = ["Jack", "Queen", "King", "Ace"]
const selectedCards = document.getElementsByClassName('selected')

const createNumberCards = (suit) => {
    for (let index = 2; index < 11; index++) {
        const card = document.createElement("div")
        card.className = "card"
        card.id = "card-" + index + "-of-" + suit
        card.innerHTML = index + " of " + suit
        cards.push(card)
    }
}

const createPictureCards = (suit) => {
    pictures.forEach(picture => {
        const card = document.createElement("div")
        card.className = "card"
        card.id = "card-" + picture + "-of-" + suit
        card.innerHTML = picture + " of " + suit
        cards.push(card)
    })
}

const createCards = () => {
    suits.forEach((suit) => {
        createNumberCards(suit)
        createPictureCards(suit)
        console.log(cards)
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
}

const renderCards = () => {
    const container = document.getElementById("container")
    cards.forEach(card => {
        container.appendChild(card)
    })
}

const addCardListeners = () => {
    document.querySelectorAll('.card').forEach(card => {
        card.onclick = e => selectCard(e.target)
    });
}

const selectCard = (card) => {
    if (selectedCards.length > 1) {
        deselectCards()
    }
    else {
        card.classList.toggle('selected')
        console.log("selected cards = " + selectedCards.length)
    }
}

const deselectCards = () => {
        document.querySelectorAll('.selected').forEach(card => {
            card.classList.remove("selected")
        })
        console.log("selected cards reset to " + selectedCards.length)
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

