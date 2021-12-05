import './TicTacToe.css';
import {useState} from "react";

function TicTacToe() {
    const GAMESTATES = {IN_PROGRESS: 0, WIN: 1, OVER: 2}
    const initialAreas = ["", "", "", "", "", "", "", "", ""];
    const [areas, setAreas] = useState(initialAreas);
    const [count, setCount] = useState(0);
    const [gameState, setGameState] = useState(GAMESTATES.IN_PROGRESS);
    const [winner, setWinner] = useState("");

    return (
        <>
            {renderGame()}
            {renderWinningScreen()}
            {renderGameOverScreen()}
        </>
    );

    function renderGame() {
        if (gameState !== GAMESTATES.IN_PROGRESS) return null;
        return <div className="game_field">
            {areas.map((v, i) =>
                (<div key={i}
                      className="square"
                      onClick={(event) => handleClick(i)}>
                    {v}
                </div>))}
        </div>
    }

    function renderWinningScreen() {
        if (gameState !== GAMESTATES.WIN) return null;
        return <div className="message_container">
                <div className="winner_message">{winner + ' won!'}</div>
                <button onClick={() => initGame()}>Start new game</button>
        </div>
    }

    function renderGameOverScreen() {
        if (gameState !== GAMESTATES.OVER) return null;

        return <div className="message_container">
                <div className="game_over_message">{"Game over"}</div>
                <button onClick={() => initGame()}>Start new game</button>
        </div>
    }

    function initGame() {
        setGameState(GAMESTATES.IN_PROGRESS);
        setAreas(initialAreas);
        setCount(0);
    }

    function handleClick(i) {
        if (gameState !== GAMESTATES.IN_PROGRESS) return;
        const newAreas = [...areas];
        if (!newAreas[i]) {
            newAreas[i] = count%2 === 0? "X" : "O";
            setCount(count +1);
        }
        setAreas(newAreas);
        checkWinning(newAreas, i);
        checkAllFull(newAreas);
    }

    function checkWinning(areas, i) {

       let isWinning = false;

       //horizontal
        for (let i = 0; i <= areas.length - 3; i += 3) {
            if (areas[i] && areas[i] === areas[i+1] && areas[i+1] === areas[i+2]) {
                isWinning = true;
            }
        }

        //vertical
        for (let i = 0; i <= 2; i++) {
            if (areas[i] && areas[i] === areas[i+3] && areas[i+3] === areas[i+6]) {
                isWinning = true;
            }
        }

       //diagonal
        let diagonal1 = areas[0] && areas[0] === areas[4] && areas[4] === areas[8];
        let diagonal2 = areas[2] && areas[2] === areas[4] && areas[4] === areas[6];
        if (diagonal1 || diagonal2) isWinning = true;

        //setState
        if (isWinning) {
            setGameState(GAMESTATES.WIN);
            setWinner(areas[i]);
        }
    }

    function checkAllFull(areas) {
       if (areas.every(a => !!a)) setGameState(GAMESTATES.OVER);
    }
}

export default TicTacToe;

