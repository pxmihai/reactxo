import {useState} from "react";
import {useRef} from "react";
import './App.css';
import _ from "lodash";

function App() {

    const [xoState, setXoState] = useState([
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
    ]);
    const currentPlayer = useRef("X");

    const click = (row, column) => {
        if (xoState[row][column] === "") {
            let newXoState = _.cloneDeep(xoState);
            newXoState[row][column] = currentPlayer.current;

            if (currentPlayer.current === "X") currentPlayer.current = "O";
            else currentPlayer.current = "X";
            setXoState(newXoState);

            if (hasWin("X", newXoState)) alert("A castigat X!")
            if (hasWin("O", newXoState)) alert("A castigat O!")

        }

    };

    const hasWin = (player, xoState) => {
        //liniile
        for (let row = 0; row < 4; ++row) {
            if (xoState[row][0] === player &&
                xoState[row][1] === player &&
                xoState[row][2] === player &&
                xoState[row][3] === player
            )
                return true;
        }

        //coloanele
        for (let column = 0; column < 4; ++column) {
            if (xoState[0][column] === player &&
                xoState[1][column] === player &&
                xoState[2][column] === player &&
                xoState[3][column] === player
            )
                return true;
        }
        //    diagonalele, principala, secundara
        if (
            xoState[0][0] === player &&
            xoState[1][1] === player &&
            xoState[2][2] === player &&
            xoState[3][3] === player
        )
            return true;

        if (xoState[0][3] === player &&
            xoState[2][2] === player &&
            xoState[1][1] === player &&
            xoState[3][0] === player)
            return true;

        return false;
    }

    const generateCells = () => {
        let cellsArray = [];

        for (let row = 0; row < 4; ++row)
            for (let column = 0; column < 4; ++column)
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
