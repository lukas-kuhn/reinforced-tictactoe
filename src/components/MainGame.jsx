import { useState } from "react";
import TicTacToeBoard from "./TicTacToeBoard";
import { checkDone } from "./tictactoegame";
import "./MainGame.css";
import { getAIMove } from "./montecarlo";
import "./Animations.css";

function MainGame(props) {
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  let done = checkDone(board);

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [lastAIMove, setLastAIMove] = useState([]);

  function restart() {
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setCurrentPlayer(1);
    props.contemplatingMoves([]);
  }

  function aiMove(tmpBoard) {
    let moves = getAIMove(tmpBoard);
    if(!moves){
      setLastAIMove(null);
      return tmpBoard;
    }

    props.contemplatingMoves(moves, board);
    let move = moves[0][0];
    setLastAIMove(move);
    tmpBoard[move[0]][move[1]] = -1;
    return tmpBoard;
  }

  function boardClick(action) {
    let tmpBoard = board;
    tmpBoard[action[0]][action[1]] = 1;

    setBoard(tmpBoard);

    done = checkDone(tmpBoard)

    if(done == 0){
      setTimeout(() => {
        tmpBoard = aiMove(tmpBoard);
        setBoard(tmpBoard);
      }, 200);
    }else{
      setLastAIMove(null);
    }    
  
    
  
  }

  done = checkDone(board);
  if (done == 0) {
    return (
      <div className="main-game">
        <TicTacToeBoard
          playable={true}
          board={board}
          boardClick={boardClick}
          currentPlayer={currentPlayer}
          highlight={lastAIMove}
        />
        <button className="btn btn-primary refresh" onClick={restart}>
          <i className="fa-solid fa-repeat"></i>&nbsp;Restart
        </button>
      </div>
    );
  } else {
    let winner;
    if (done == -2) {
      winner = <p className="puff-in-center">Draw!</p>;
    } else if (done == -1) {
      winner = (
        <p className="puff-in-center">
          <i className="fa-solid fa-o" /> has won!
        </p>
      );
    } else if (done == 1) {
      winner = (
        <p className="puff-in-center">
          <i className="fa-solid fa-xmark" /> has won!
        </p>
      );
    }

    return (
      <div className="main-game">
        <TicTacToeBoard
          playable={false}
          board={board}
          boardClick={boardClick}
          currentPlayer={currentPlayer}
          highlight={lastAIMove}
        />
        <button className="btn btn-primary refresh" onClick={restart}>
          <i className="fa-solid fa-repeat"></i>&nbsp;Restart
        </button>
        <div>
          <h3>{winner}</h3>
        </div>
      </div>
    );
  }
}

export default MainGame;
