type Cell = "" | "X" | "O"
type TicTacToeBoard = [
    [Cell, Cell, Cell],
    [Cell, Cell, Cell],
    [Cell, Cell, Cell]
]
type Coordinate = [number, number]
type Victory = [Coordinate, Coordinate, Coordinate]


let boardState: TicTacToeBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]
let currentMove: "X" | "O" = "X"
let winner: Cell | "Draw" = "";

const appElement = document.getElementById('app') as HTMLElement
const boardElement = document.getElementById('board') as HTMLElement
const ROW_COUNT: number = 3;
const COL_COUNT: number = 3;
const victories: Victory[] = [
    // Conditiile de castig pe rand, coloana si diagonala in functie de
    // coordonatele butoanelor, incepand de la 0 cu 0 din stanga sus
[
    [0, 0],
    [0, 1],
    [0, 2]
],
[
    [1, 0],
    [1, 1],
    [1, 2]
],
[
    [2, 0],
    [2, 1],
    [2, 2]
],
[
    [0, 0],
    [1, 0],
    [2, 0],
],
[
    [0, 1],
    [1, 1],
    [2, 1],
],
[
    [0, 2],
    [1, 2],
    [2, 2],
],
[
    [0, 0],
    [1, 1],
    [2, 2],
],
[
    [0, 2],
    [1, 1],
    [2, 0],
]
]

function createCell(row: number, col: number, content: Cell = "") {
    // Acesta functie defineste butonul si atributele pe care le va contine
    const cell = document.createElement("button")
    cell.setAttribute("data-row", row.toString())
    cell.setAttribute("data-col", col.toString())
    cell.setAttribute("data-content", content)
    cell.classList.add('cell')

    // Adaugam un even listener pentru a identifica butonul apasat
    // si pentru a popula butonul cu valoare jucatorului

    cell.addEventListener('click', () => {
        if(winner) return;
        if(boardState[row][col] === '') {
            boardState[row][col] = currentMove;
            currentMove = currentMove === 'X' ? 'O' : 'X'
            // Aici vom adauga valuarea returnata de functia checkBoard
            // care stabilete castigatorul
            winner = checkBoard();
            // urmatoare functie va construi tabala de joc
            renderBoard()
        }
    })
    return cell
}

function renderBoard(): void {
    // Acesta functie genereaza tabla de joc
    // vom folosi un for loop pentru functia createCell care va genera 9
    // butoane si la va lega de elementul parinte
    if(!appElement) throw new Error("Cannot find app")
    if(!boardElement) throw new Error("Cannot find app")
    boardElement.innerHTML = ''
    for (let i = 0; i < ROW_COUNT; i++) {
        for (let j = 0; j < COL_COUNT; j++) {
            boardElement.appendChild(createCell(i, j, boardState[i][j]))
        }
    }
    // Aici vom construi blocul care afiseaza jucatorul si castigatorul/egalitatea
    // Mai intai vom inlatura elementul daca acesta exista
    const oldMoveElement = document.getElementById("move-element") as HTMLElement

    if (oldMoveElement) {
        oldMoveElement.remove()
    }

    const moveElement = document.createElement("p")
    moveElement.id = 'move-element';
    moveElement.innerText = winner ? `Winner ${winner}!` : `Next Move: ${currentMove}`
    moveElement.classList.add("current-move")
    appElement.insertBefore(moveElement, document.getElementById('reset'))
}

// Aceasta functie va cauta in fiecare buton combinatia castigatoare sau
// de egalitate

function checkBoard(): Cell | "Draw" {
    for (let victory of victories) {
        // Aici iteram prin cate trei celule/butane pentru combinatia
        // castigatoare.
        const cell1 = boardState[victory[0][0]][victory[0][1]]
        const cell2 = boardState[victory[1][0]][victory[1][1]]
        const cell3 = boardState[victory[2][0]][victory[2][1]]
        // Aici spunem: daca prima celula nu este goale si prima celula
        // este egala cu ceula a doua si celula a doua este egala cu\
        // celula a treia atunci vom returna prima celula
        // Deci aici este verificarea de castigator
        if (cell1 !== "" && cell1 === cell2 && cell2 === cell3) {
            return cell1
        }
    }
    // Acum vom verifica daca este egalitate.
    let isDraw = true;
    for (let i = 0; i < ROW_COUNT; i++) {
        for (let j = 0; j < COL_COUNT; j++) {
            // Mai intai verificam conditia de egalitate
            if (boardState[i][j] === "") isDraw = false
        }
    }
    if (isDraw) return 'Draw'

    return ''
    // Acesta functie va returna castigatorul sau egalitatea sau nimic
    // in cazul in care jocul nu s-a terminat
}

// Aceasta functie initializeaza butonul de reset, sterge tabla, desmneaza
// jucatorul curent ca X si initiaza renderizarea tablei de joc

function init():void {
    const resetButton = document.getElementById('reset') as HTMLElement
    if (!resetButton) throw new Error ('No reset button')
    resetButton.addEventListener('click', () => {
        boardState = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
        currentMove = 'X'
        winner = ""
        renderBoard()
    })
renderBoard()
}

init()