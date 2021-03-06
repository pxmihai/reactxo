import {useState} from "react";
import {useRef} from "react";
import './App.css';
import _ from "lodash";

function App() {

    const [xoState, setXoState] = useState([
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""]
    ]);
    const currentPlayer = useRef("X");

    const click = (row, column) => {
        if (xoState[row][column] === "") {
            let newXoState = _.cloneDeep(xoState);
            newXoState[row][column] = currentPlayer.current;

            if (currentPlayer.current === "X") currentPlayer.current = "O";
            else currentPlayer.current = "X";
            setXoState(newXoState);

            if (hasWin("X", newXoState)) alert("X has won!")
            if (hasWin("O", newXoState)) alert("O has won!")

        }

    };

    const hasWin = (player, xoState) => {
        // lines
        for (let row = 0; row < 10; ++row) {
            if (xoState[row][0] === player &&
                xoState[row][1] === player &&
                xoState[row][2] === player &&
                xoState[row][3] === player &&
                xoState[row][4] === player &&
                xoState[row][5] === player &&
                xoState[row][6] === player &&
                xoState[row][7] === player &&
                xoState[row][8] === player &&
                xoState[row][9] === player
            )
                return true;
        }

        // columns
        for (let column = 0; column < 10; ++column) {
            if (xoState[0][column] === player &&
                xoState[1][column] === player &&
                xoState[2][column] === player &&
                xoState[3][column] === player &&
                xoState[4][column] === player &&
                xoState[5][column] === player &&
                xoState[6][column] === player &&
                xoState[7][column] === player &&
                xoState[8][column] === player &&
                xoState[9][column]
            )
                return true;
        }
        //    diagonale principala, secundara
        if (
            xoState[0][0] === player &&
            xoState[1][1] === player &&
            xoState[2][2] === player &&
            xoState[3][3] === player &&
            xoState[4][4] === player &&
            xoState[5][5] === player &&
            xoState[6][6] === player &&
            xoState[7][7] === player &&
            xoState[8][8] === player &&
            xoState[9][9] === player
        )
            return true;

        if (xoState[0][9] === player &&
            xoState[1][8] === player &&
            xoState[2][7] === player &&
            xoState[3][6] === player &&
            xoState[4][5] === player &&
            xoState[5][4] === player &&
            xoState[6][3] === player &&
            xoState[7][2] === player &&
            xoState[8][1] === player &&
            xoState[9][0] === player
        )
            return true;

        return false;
    }

    const generateCells = () => {
        let cellsArray = [];

        for (let row = 0; row < 10; ++row)
            for (let column = 0; column < 10; ++column)
                cellsArray.push(
                    <div className="cell"
                         style={{gridColumnStart: column + 1, gridRowStart: row + 1}}
                         onClick={() => click(row, column)}

                    >{xoState[row][column]}</div>
                )


        return cellsArray
    }

    return (
        <div className="App">
            <div className="xoGrid">{generateCells()}
            </div>
        </div>
    );
}

export default App;
