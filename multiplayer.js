// Variáveis globais

// Máximo tentativas de letra
const MAX_FORCA = 6
// Jogadores
let playerName1
let playerName2
// Palavra escolhida
let word = []
// Palavra escolhida convertida em "_ _"
let wordVisual = []
// Contador da forca
let countForca = 0
// Contador de turno e indicação visual dos turnos
let turn = 1
document.querySelector(".left").style = "border: solid green 5px; border-radius: 5px";

/* disableOtherHelp() */

// Botão ajuda letra
let helpAddLetterP1 = document.querySelector("#helpAddLetterP1")
let helpAddLetterP2 = document.querySelector("#helpAddLetterP2")
// Botão ajuda forca
let helpRemoveForcaP1 = document.querySelector("#helpRemoveForcaP1")
let helpRemoveForcaP2 = document.querySelector("#helpRemoveForcaP2")

// Palavras PC
const words = [{
        category: 'frameworks',
        items: ['ionic', 'angular', 'react']
    },
    {
        category: 'linguagens de programação',
        items: ['javascript', 'swift', 'perl', 'sql', 'java', 'python', 'actionscript', 'pascal', 'php', 'euphoria', 'lua', 'matlab', 'rubi']
    }
]

// Teclado
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
for (let i = 0; i < letters.length; i++) {
    document.getElementsByClassName('keyboard')[0].innerHTML += `<button class="bLetters" id="letter${letters[i]}" onclick="useLetter('${letters[i]}')">${letters[i]}</button>`
};

// Função para escolher e representar a palavra e categoria da mesma em HTML
function randomWordAndCategory() {

    let categoryObject = words[Math.floor(Math.random() * words.length)]
    word = categoryObject.items[Math.floor(Math.random() * categoryObject.items.length)].toUpperCase().split("")
    document.getElementById("category").innerHTML = categoryObject.category.toUpperCase()

    for (let i = 0; i < word.length; i++) {
        wordVisual.push(`&nbsp_&nbsp`)
    }

    for (let i = 0; i < wordVisual.length; i++) {
        document.getElementById("pcWord").innerHTML += wordVisual[i]
    }
}
randomWordAndCategory()

// Lójica da parte jogável
function useLetter(letter) {

    // Quando user clica numa letra, desativa essa letra
    document.getElementById(`letter${letter}`).disabled = true;

    // Troca visualmente conjunto (_ _) pela letra quando user acerta
    if (word.includes(letter)) {
        for (let i = 0; i < word.length; i++) {
            if (letter === word[i]) {
                wordVisual[i] = letter
                changeLetterVisual()
            }
        }
        // Mostra visualmente que a letra estava correta com fundo verde no botão
        document.getElementById(`letter${letter}`).style = "background: green;"

        // Altera turno; altera visual da forca e do turno
    } else {
        countForca = countForca + 1
        document.querySelector(".forca").src = `img/f${countForca}.png`
        turn = turn * -1
        changeTurnVisual()
        /* disableOtherHelp() */
    }

    // Ativa modal do game over
    if (countForca === MAX_FORCA) {
        document.querySelector("#pcWordGameOver").innerHTML = word.join("")
        document.querySelector("#modalGameOver").style.display = "block"
        document.querySelector(".right").style = "none"
        document.querySelector(".left").style = "none"
    }

    // Ativa modal da vitória em caso das letras estarem todas selecionadas
    if (word.join("") === wordVisual.join("")) {
        if (turn === 1) {
            document.querySelector("#winnerDif").innerHTML = playerName1
            document.querySelector("#pcWordGameOverDif").innerHTML = word.join("")
            document.querySelector(".right").style = "none"
            document.querySelector(".left").style = "none"

        } else {
            document.querySelector("#winnerDif").innerHTML = playerName2
            document.querySelector("#pcWordGameOverDif").innerHTML = word.join("")
            document.querySelector(".right").style = "none"
            document.querySelector(".left").style = "none"
        }
        document.querySelector("#modalWin").style.display = "block"
        addRanking()
    }

    // Altera conteúdo da modal conforme o vencedor
    if (countForca === MAX_FORCA && turn === 1) {
        document.querySelector("#winner").innerHTML = playerName1
    } else {
        document.querySelector("#winner").innerHTML = playerName2
    }
}

// Substitui letra tentada por visualWord
function changeLetterVisual() {
    document.getElementById("pcWord").innerHTML = ""

    for (let i = 0; i < wordVisual.length; i++) {
        document.getElementById("pcWord").innerHTML += wordVisual[i]
    }
}

// Mudar imagem da forca
document.querySelector(".forca").src = `img/f${countForca}.png`

// Função escolher nomes dos jogadores
function startGame() {
    if (document.querySelector('#inputName1').value === "" || document.querySelector('#inputName2').value === "") {
        alert("Por Favor Escolhe o Teu Nome!")
    } else {
        document.querySelector("#modalNames").style.display = "none"
        playerName1 = document.querySelector("#inputName1").value.toUpperCase()
        playerName2 = document.querySelector("#inputName2").value.toUpperCase()
        document.querySelector(".leftP").innerHTML = playerName1
        document.querySelector(".rightP").innerHTML = playerName2
    }
}
document.querySelector(".btnInputNames").addEventListener("click", startGame);

// Função para trocar visual dos turnos
function changeTurnVisual() {
    if (turn === -1) {
        document.querySelector(".right").style = "border: solid green 5px; border-radius: 5px";
        document.querySelector(".left").style = "";
    } else if (turn === 1) {
        document.querySelector(".left").style = "border: solid green 5px; border-radius: 5px";
        document.querySelector(".right").style = "";
    }
}

// Funções reiniciar jogo
document.querySelector("#playAgain").addEventListener("click", function () {
    location.reload()
});
document.querySelector("#playAgainDif").addEventListener("click", function () {
    location.reload()
});

// Função ajuda de adicionar uma letra à palavra jogador 1
function funcHelpAddLetterP1(btnAddLetter) {

    document.querySelector(btnAddLetter).disabled = true
    document.querySelector(btnAddLetter).style = "background: red; color: #fff; font-size: 12.5px; margin-left: 12.5px; margin-right: 12.5px; transition: 0.5s ease-in-out;"

    let randomLetter = word[Math.floor(Math.random() * word.length)]

    if (word.includes(randomLetter)) {

        if (!wordVisual.includes(randomLetter)) {
            for (let i = 0; i < word.length; i++) {
                if (randomLetter === word[i]) {
                    wordVisual[i] = randomLetter
                    changeLetterVisual()
                    useLetter(randomLetter)
                }
            }
        } else if (wordVisual.includes(randomLetter)) {
            funcHelpAddLetterP1(btnAddLetter)
        }
    }
}

// Função ajuda de adicionar uma letra à palavra jogador 2
function funcHelpAddLetterP2(btnAddLetter) {

    document.querySelector(btnAddLetter).disabled = true
    document.querySelector(btnAddLetter).style = "background: red; color: #fff; font-size: 12.5px; margin-left: 12.5px; margin-right: 12.5px; transition: 0.5s ease-in-out;"

    let randomLetter = word[Math.floor(Math.random() * word.length)]

    if (word.includes(randomLetter)) {

        if (!wordVisual.includes(randomLetter)) {
            for (let i = 0; i < word.length; i++) {
                if (randomLetter === word[i]) {
                    wordVisual[i] = randomLetter
                    changeLetterVisual()
                    useLetter(randomLetter)
                }
            }
        } else if (wordVisual.includes(randomLetter)) {
            funcHelpAddLetterP2(btnAddLetter)
        }
    }
}

// Função ajuda de remover um elemento à forca jogador 1
function funcHelpRemoveForcaP1(btnRemoveForca) {
    if (countForca > 0) {
        countForca = countForca - 1
        document.querySelector(".forca").src = `img/f${countForca}.png`
        document.querySelector(btnRemoveForca).disabled = true
        document.querySelector(btnRemoveForca).style = "background: red; color: #fff; font-size: 12.5px; margin-left: 12.5px; margin-right: 12.5px; transition: 0.5s ease-in-out;"
    }
}

// Função ajuda de remover um elemento à forca jogador 2
function funcHelpRemoveForcaP2(btnRemoveForca) {
    if (countForca > 0) {
        countForca = countForca - 1
        document.querySelector(".forca").src = `img/f${countForca}.png`
        document.querySelector(btnRemoveForca).disabled = true
        document.querySelector(btnRemoveForca).style = "background: red; color: #fff; font-size: 12.5px; margin-left: 12.5px; margin-right: 12.5px; transition: 0.5s ease-in-out;"
    }
}

/* Função de tornar as ajudas disabled para o jogador que não estã a jogar */
/* function disableOtherHelp() {
    if (turn === 1) {
        document.querySelector("#helpAddLetterP2").disabled = true;
        document.querySelector("#helpRemoveForcaP2").disabled = true;

        if (funcHelpAddLetterP1(btnAddLetter).called = true) {
            document.querySelector("#helpAddLetterP1").disabled = true;
        } else {
            document.querySelector("#helpAddLetterP1").disabled = false;
        }

        if (funcHelpRemoveForcaP1(btnRemoveForca).called) {
            document.querySelector("#helpRemoveForcaP1").disabled = true
        } else {
            document.querySelector("#helpRemoveForcaP1").disabled = false
        }
    }

    if (turn === -1) {
        document.querySelector("#helpAddLetterP1").disabled = true;
        document.querySelector("#helpRemoveForcaP1").disabled = true

        if (funcHelpAddLetterP2(btnAddLetter).called = true) {
            document.querySelector("#helpAddLetterP2").disabled = true;
        } else {
            document.querySelector("#helpAddLetterP2").disabled = false;
        }

        if (funcHelpRemoveForcaP2(btnRemoveForca).called) {
            document.querySelector("#helpRemoveForcaP2").disabled = false
        } else {
            document.querySelector("#helpAddLetterP2").disabled = false;
        }
    }
} */

// Funções para botão voltar ao menu principal
let mainMenuButton = document.getElementById("mainMenuButton")
mainMenuButton.addEventListener("click", function () {
    location.href = "index.html"
})
let mainMenuButtonDif = document.getElementById("mainMenuButtonDif")
mainMenuButtonDif.addEventListener("click", function () {
    location.href = "index.html"
})

// Função do Ranking
function addRanking() {

    let ranking = JSON.parse(localStorage.getItem("ranking")) || []

    let currentPlayer = null

    if (turn === 1) currentPlayer = playerName1
    if (turn === -1) currentPlayer = playerName2

    let isUpdated = false
    ranking.map(obj => {
        if (obj.name === currentPlayer) {
            obj.score += 1
            isUpdated = true
        }
    })

    if (isUpdated === false) {
        ranking.push({
            "name": currentPlayer,
            "score": 1
        })
    }
    localStorage.setItem("ranking", JSON.stringify(ranking))
}