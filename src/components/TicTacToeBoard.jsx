import "./TicTacToeBoard.css";
import "./Animations.css"

function TicTacToeBoard(props) {
  function renderBoard(tmpBoard, callback) {
    let boardTiles = [];

    let counter = 1;
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        let player = "";
        if (tmpBoard[row][column] == 1) {
          player = <i className="fa-solid fa-xmark scale-up-center"></i>;
        } else if (tmpBoard[row][column] == -1) {
          player = <i className="fa-solid fa-o scale-up-center"></i>;
        }

        if (player == "" && props.playable) {
          let className = counter % 2 == 0 ? "playable" : "playable colored";

          boardTiles.push(
            <div
              key={counter}
              className={className}
              onClick={() => {
                callback([row, column]);
              }}
            >
              {player}
            </div>
          );
        } else {
          let className = counter % 2 == 0 ? "" : "colored";
          
          if(props.highlight && props.highlight[0] == row && props.highlight[1] == column){
            className += " highlight-play";
          }

          boardTiles.push(
            <div key={counter} className={className}>
              {player}
            </div>
          );
        }

        counter++;
      }
    }
    if (!props.small) {
      return <div className="main-grid">{boardTiles}</div>;
    } else {
      return <div className="small-grid">{boardTiles}</div>;
    }
  }

  let tmpBoard = props.board;
  let currentBoard = renderBoard(tmpBoard, props.boardClick);

  return <div>{currentBoard}</div>;
}

export default TicTacToeBoard;
