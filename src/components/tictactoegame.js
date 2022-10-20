export function checkDone(tmpBoard) {
  let possible = [];

  for (let i = 0; i < 3; i++) {
    possible.push(tmpBoard[i][0] + tmpBoard[i][1] + tmpBoard[i][2]);
    possible.push(tmpBoard[0][i] + tmpBoard[1][i] + tmpBoard[2][i]);
  }

  possible.push(tmpBoard[0][0] + tmpBoard[1][1] + tmpBoard[2][2]);
  possible.push(tmpBoard[0][2] + tmpBoard[1][1] + tmpBoard[2][0]);

  if (possible.includes(3)) {
    return 1;
  } else if (possible.includes(-3)) {
    return -1;
  }

  let optionsLeft = false;
  tmpBoard.forEach((elem) => {
    if (elem.includes(0)) {
      optionsLeft = true;
    }
  });

  if (!optionsLeft) {
    return -2;
  }

  return 0;
}