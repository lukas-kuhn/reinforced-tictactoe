import { useState } from "react";
import "./App.css";
import MainGame from "./components/MainGame";
import TicTacToeBoard from "./components/TicTacToeBoard";
import { checkDone } from "./components/tictactoegame";
import "./components/Animations.css";

function App() {
  const [moves, setMoves] = useState([]);

  function createBoardFromMove(action, modifyBoard) {
    if (action) {
      let tmp = structuredClone(modifyBoard);
      tmp[action[0]][action[1]] = -1;
      return tmp;
    }
    return null;
  }

  function contemplatingMoves(moves, board) {
    let currentMoves = [];
    let tmp = structuredClone(board);

    let length = moves.length >= 3 ? 3 : moves.length;

    console.log(moves);
    for (let i = 0; i < length; i++) {
      let printableBoard = (
        <TicTacToeBoard
          playable={false}
          board={createBoardFromMove(moves[i][0], tmp)}
          highlight={moves[i][0]}
          small={true}
        />
      );
      currentMoves.push([printableBoard, moves[i][1]]);
    }

    setMoves(currentMoves);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 title mt-4">
          <h1>
            <b>Reinforced</b> TicTacToe
          </h1>
          Play a game of TicTacToe against a Monte Carlo reinforcement algorithm
        </div>
        <div className="col-12 game mt-4">
          <MainGame contemplatingMoves={contemplatingMoves} />
        </div>
      </div>
      <div className="col-12 mt-4 ai-moves">
        <div className="row">
          <div className="col-12 mb-4">
            <h2>
              <b>Contemplated Moves</b>
            </h2>
            <p>
              See the top 3 moves the AI contemplated and what its estimate of
              the winning chance for that move is.
            </p>
          </div>

          {moves.map((move) => {
            return (
              <div
                key={Math.random()}
                className="col-md-12 col-lg-4 flip-in-hor-bottom mb-4"
              >
                {move[0]}
                <p className="winningChance">
                  <b>Winning Chance: </b>
                  {parseInt(move[1] * 100)}%
                </p>
              </div>
            );
          })}

          {moves.length == 0 && (
            <p style={{ fontSize: "120%" }}>
              Place your first <i className="fa-solid fa-xmark" /> to start!
            </p>
          )}
        </div>
      </div>
      <div className="col-12 mt-5 mb-4 about">
        <h2>
          <b>About this project</b>
        </h2>
        <p>
          This project has been created as a demonstration and is completely
          open source. <br />
          <br />
          The opponent AI is based on a reinforcement learning algorithm
          (On-policy first-visit Monte Carlo) that has been trained on 1 million
          matches against a random opponent.<br/><br/>
          <img src="https://marcinbogdanski.github.io/rl-sketchpad/RL_An_Introduction_2018/assets/0504_OnPolicy_MC_Ctrl.png" height={400}></img><br/>
          <i>From Sutton and Barto (2018) Reinforcement Learning: An Introduction, chapter 5.4</i>
          <br/>
          <br /> The algorithm had no model of TicTacToe and discovered the best
          winning strategy play-by-play by discounting a given reward{" "}
          <i>(-1 for a loss / 0 for a draw / 1 for a win)</i> over all previous
          in-game actions after each episode.
        </p>
        <p>
          The source code for training the algorithm is written in Python and
          can be found{" "}
          <a href="https://github.com/lukaskuhn-lku/reinforced-tictactoe/tree/master/training">
            <b>here.</b>
          </a>
        </p>
        <p>
          The website has been written in JavaScript with the React framework
          and the source code can be found{" "}
          <a href="https://github.com/lukaskuhn-lku/reinforced-tictactoe/tree/master/src">
            <b>here.</b>
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
