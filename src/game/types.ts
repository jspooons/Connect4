import {GameData, Player} from '../types';

export interface GameProps {
    onClick:(value:string)=>void;
    player1:Player;
    player2:Player;
    setGameFile:(value:GameData)=>void;
    gameFile:GameData;
}

export interface GameTableProps {
    currentPlayer:Player;
    otherPlayer:Player;
    setGameFile:(value:GameData)=>void;
    gameFile:GameData;
}

export interface Position {
    i:number;
    j:number;
}

export interface CheckWinProps extends Position {
    gameBoard:Array<Array<[string,number]>>;
    token:string;
}

export interface PositionExtended extends Position {
    left:number;
    right:number;
}

export interface GameInfoProps {
    /* details which row, in the 'board' below, that the token will be assigned to. If P1 clicks in the first
    *           column in the GUI game board, then they will be using the matrix row of 0 in gameInfo.board. The column
    *           in this gameInfo.board that will be used to note down the users turn is determined by move[0]. Each
    *           element in move determines where to place the token in the game board as in Connect4, the tokens fall
    *           to the bottom of the game table. Hence, 5 is the starting position of a token. */
    tokenRowEntry:number[];

    /* the game board (7x6 matrix), displayed as a 6x7 game board in the GUI by the CreateContent() function.
    *           Each row in the gameInfo.board represents a column in the game board GUI. The bottom token entry in each
    *           column of the GUI starts at the final elements in each row of the matrix. Thus, element 5 in row 0 of
    *           matrix represents position 1, column 1 in the GUI */
    board:Array<Array<[string,number]>>;

    // details the player who is currently taking their turn
    player:{nickname:string;token:string;avatar:string};

    // details the player that will take their turn after the current player has made their turn
    otherPlayer:{nickname:string;token:string;avatar:string};

    // details the player who has won
    winner:string;
}

export interface RematchProps {
    hasWon:boolean;
    winner:string;
    setReset:(value:boolean)=>void;
    player1:Player;
    player2:Player;
}