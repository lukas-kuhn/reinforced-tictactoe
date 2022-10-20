import { qActionValues } from "./actionValues";

function parseTuple(tupleString) {
  tupleString = tupleString.replace("(", "").replace(")", "");
  let elems = tupleString.split(",");

  let tuple = [];
  elems.forEach((elem) => {
    tuple.push(parseInt(elem));
  });

  return tuple;
}

export function getAIMove(tmpBoard) {
  let boardStr = `[[${tmpBoard[0][0]}, ${tmpBoard[0][1]}, ${tmpBoard[0][2]}], [${tmpBoard[1][0]}, ${tmpBoard[1][1]}, ${tmpBoard[1][2]}], [${tmpBoard[2][0]}, ${tmpBoard[2][1]}, ${tmpBoard[2][2]}]]`;

  let data = qActionValues[boardStr];

  if (data) {
    let dict = data;

    var items = Object.keys(dict).map(
        (key) => { return [parseTuple(key), dict[key]] });

    items.sort(
        (first, second) => { return second[1] - first[1] }
    );


    return items
  } else {
    let possible = [];
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (tmpBoard[row][column] == 0) {
          possible.push([row, column]);
        }
      }
    }

    if(possible.length == 0){
      return null;
    }

    let randomChoice = Math.floor(Math.random() * possible.length);

    let action = [[possible[randomChoice], 0]];
    return action;
  }
}
