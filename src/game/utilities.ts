import {CheckWinProps, Position, PositionExtended} from './types';

export function checkWin(winProps:CheckWinProps) {

    // x and y coordinates used to offset the highlighted win (the offset changes varying on the win type)
    const offsets = {
        vertical:{x:-376,y:-560},
        horizontal:{x:-148,y:-558},
        major:{x:-384,y:-204},
        minor:{x:-364,y:-558}
    };

    function checkDown(subProps: Position) {
        // Sets 'prev' as the currently placed token
        // Checks if the 3 tokens below it are the same colour as the colour set in 'prev'
        // Returns false if no win (when a token of another colour appears in the sequence
        // Returns first and last position of the winning sequence

        let prev = winProps.gameBoard[subProps.i][subProps.j][0];
        for (let k=1; k<4; k++) {
            const current = winProps.gameBoard[subProps.i][subProps.j+k][0];
            if (prev !== current) {
                return false;
            }
            prev = current;
        }
        return {winType:'vertical-win', offset: offsets.vertical, rotate:0, first:[subProps.i, subProps.j], last:[subProps.i, subProps.j+3]};
    }

    function checkHorizontal(subProps: PositionExtended) {
        // tracks the number of tokens with the same colour in a row in the for loop
        // resets to 1 every time a token of a different colour to its predecessor is detected
        let counter = 1;

        // starting position (horizontally) that the algorithm will check while still including the currently placed
        // token in a sequence (of length 4) to check if it is a winning sequence.
        const start = subProps.i - subProps.left;

        // end position
        const end = subProps.i + subProps.right;


        for (let k=start+1; k<=end; k++) {

            const prev = winProps.gameBoard[k-1][subProps.j];
            const current = winProps.gameBoard[k][subProps.j];

            // is the current token equal considered in this iteration the same colour as the current players token
            if (current[0] === prev[0] && current[0] === winProps.token && current[1] === 1.0 && prev[1] === 1.0) {
                counter += 1;
            } else {
                counter = 1;
            }

            // when the counter reaches a value of 4, return the winning sequence location
            if (counter === 4) {
                return {winType:'horizontal-win', offset: offsets.horizontal, rotate:0, first:[k - 4, subProps.j], last:[k, subProps.j]};
            }
        }

        return false;
    }

    function checkMajorDiagonal(subProps: PositionExtended) {
        let counter = 1;

        // starting position vertically
        const start = subProps.j - subProps.left;

        // starting position horizontally
        const startI = subProps.i - subProps.left;

        // end position vertically
        const end = subProps.j + subProps.right;

        let tmp = 1;
        for (let k=start+1; k<=end; k++) {
            const current = winProps.gameBoard[startI+tmp][k];
            const prev = winProps.gameBoard[startI+tmp-1][k-1];

            if (current[0] === prev[0] && current[0] === winProps.token && current[1] === 1.0  && prev[1] === 1.0) {
                counter += 1;
            } else {
                counter = 1;
            }

            if (counter === 4) {
                return {winType:'major-win', offset: offsets.major, rotate:-50, first:[startI+tmp-3, k-3], last:[startI+tmp, k]};
            }

            tmp+=1;
        }

        return false;
    }

    function checkMinorDiagonal(subProps: PositionExtended) {
        let counter = 1;
        // starting position vertically
        const start = subProps.j - subProps.right;

        // starting position horizontally
        const startI = subProps.i + subProps.right;

        // starting position vertically
        const end = subProps.j + subProps.left;

        let tmp = 1;
        for (let k=start+1; k<=end; k++) {
            const current = winProps.gameBoard[startI-tmp][k];
            const prev = winProps.gameBoard[startI-tmp+1][k-1];

            if (current[0] === prev[0] && current[0] === winProps.token && current[1] === 1.0 && prev[1] === 1.0) {
                counter += 1;
            } else {
                counter = 1;
            }

            if (counter === 4) {
                return {winType:'minor-win', offset: offsets.minor, rotate:50, first:[startI-tmp+3, k-3], last:[startI-tmp, k]};
            }

            tmp+=1;
        }

        return false;
    }

    // Defining the game board GUI dimensions
    const rows = 6;
    const cols = 7;

    // Given the position of the recently placed token, how far LEFT can we go in the game table but still include
    // the recently placed token in a sequence of 4 tokens.
    const left = Math.min(winProps.i, 3);

    // ...
    const right = Math.min(cols - 1 - winProps.i, 3);
    const up = Math.min(winProps.j, 3);
    const down = Math.min(rows - 1 - winProps.j, 3);

    // Connect4 rules state that a win can occur on a diagonal
    // The major diagonal is '\'
    // The minor diagonal is '/'

    // This value states the LOWEST position in the MAJOR diagonal, while still including the placed token in a
    // sequence of 4 tokens, that the checkWin function should check
    const majorLeftUp = Math.min(left, up);

    // This value states the HIGHEST position in the MAJOR diagonal, while still including the placed token in a
    // sequence of 4 tokens, that the checkWin function should check
    const majorRightDown = Math.min(right, down);

    // ...
    const minorLeftDown = Math.min(left, down);
    const minorRightUp = Math.min(right, up);

    // Only triggers if there are 3 tokens below the recently placed token
    if (down === 3) {
        const result = checkDown(winProps);
        if (result) {
            return result;
        }
    }

    // Only triggers if there are at least a total of 3 tokens on either side of the currently placed token
    if (left + right >= 3) {
        const result = checkHorizontal({i:winProps.i, j:winProps.j, left:left,right:right});

        // truthy if statement, only returns result if the result has contents and isn't false
        if (result) {
            return result;
        }
    }

    if (majorLeftUp + majorRightDown >= 3) {
        const result = checkMajorDiagonal({i:winProps.i,j:winProps.j,left:majorLeftUp,right:majorRightDown});
        if (result) {
            return result;
        }
    }

    if (minorLeftDown + minorRightUp >= 3) {
        const result = checkMinorDiagonal({i:winProps.i,j:winProps.j,left:minorLeftDown,right:minorRightUp});
        if (result) {
            return result;
        }
    }

    return;
}
