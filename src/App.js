import './App.css';
import TicTacToe from "./TicTacToe";
import {useState} from "react";

function App() {
    const PAGES = {MAIN_PAGE: 0, TIC_TAC_TOE: 1, CHESS: 2}
    const [currentGame, setCurrentGame] = useState(PAGES.MAIN_PAGE);

    return (
        <>
            {renderMainPage()}
            {renderGamePage()}
        </>
    );

    function renderMainPage() {
        if (currentGame === PAGES.MAIN_PAGE) {
           return <div className="main_page">
               <h1>Choose a game</h1>
               <div className="game_menu">
                   <div className="game_thumbnail" onClick={() => openPage(PAGES.TIC_TAC_TOE)}>Tic Tac Toe</div>
                   <div className="game_thumbnail">Chess - coming soon</div>
                   <div className="game_thumbnail">Yet to come</div>
               </div>
           </div>
        }
    }

    function renderGamePage() {
      if (currentGame === PAGES.TIC_TAC_TOE) {
          return <div className="game_container">
              <button className="back_to_main_page" onClick={() => openPage(PAGES.MAIN_PAGE)}>Go back to main page</button>
              <TicTacToe></TicTacToe>
          </div>
      }
    }

    function openPage(game) {
        setCurrentGame(game);
    }
}
export default App;
