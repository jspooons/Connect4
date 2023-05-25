import React from 'react';
import Rematch from './Rematch';
import {GameInfoProps, GameTableProps} from './types';
import {checkWin} from './utilities';


export function GameTable(props:GameTableProps) {

    const o = '/tokens/empty.png';

    const initialState : GameInfoProps = {
        tokenRowEntry: [5, 5, 5, 5, 5, 5, 5],
        board: [[[o,1.0], [o,1.0], [o,1.0], [o,1.0], [o,1.0], [o,1.0]],
                [[o,1.0], [o,1.0], [o,1.0], [o,1.0], [o,1.0], [o,1.0]],
                [[o,1.0], [o,1.0], [o,1.0], [o,1.0], [o,1.0], [o,1.0]],
                [[o,1.0], [o,1.0], [o,1.0], [o,1.0], [o,1.0], [o,1.0]],
                [[o,1.0], [o,1.0], [o,1.0], [o,1.0], [o,1.0], [o,1.0]],
                [[o,1.0], [o,1.0], [o,1.0], [o,1.0], [o,1.0], [o,1.0]],
                [[o,1.0], [o,1.0], [o,1.0], [o,1.0], [o,1.0], [o,1.0]]],
        player: {nickname:props.currentPlayer.nickname, token:props.currentPlayer.token, avatar:props.currentPlayer.avatar},
        otherPlayer: {nickname:props.otherPlayer.nickname, token:props.otherPlayer.token, avatar:props.otherPlayer.avatar},
        winner: ''
    };

    const [highlightWin, setHighlightWin] = React.useState({
        winType:'',
        rotate:0,
        offset:{x:-1,y:-1},
        x:-1,
        y:-1
    });

    const [gameInfo, setGameInfo] = React.useState<GameInfoProps>(initialState);

    const [reset, setReset] = React.useState(false);

    React.useEffect(() => {
        if (reset) {
            setGameInfo(initialState);
            setReset(false);
        }
    },[reset]);

    function ShowRematch() {
        if (gameInfo.winner !== '') {
            return (
            <Rematch
                hasWon={true}
                winner={gameInfo.winner}
                setReset={setReset}
                player1={props.currentPlayer}
                player2={props.otherPlayer}
            />);

        } else {
            return <div></div>;
        }
    }

    function logGameWin(winner:string,other:string) {

        const playerData = props.gameFile.players.slice();

        let location;
        let locationOther;

        for (let i=0; i<playerData.length; i++) {
            if (playerData[i].nickname === winner) {
                location = i;
            }
            if (playerData[i].nickname === other) {
                locationOther = i;
            }
        }

        if (location || location === 0) {
            playerData[location].wins = playerData[location].wins + 1;
        } else {
            playerData.push({nickname:winner, wins:1, avatar:gameInfo.player.avatar});
        }

        if (!(locationOther || location !== 0)) {
            playerData.push({nickname:other, wins:0, avatar:gameInfo.otherPlayer.avatar});
        }

        props.setGameFile({players:playerData});
    }

    function showCell(column:number) {

        const board = gameInfo.board.slice();
        const tokenRowEntry = gameInfo.tokenRowEntry.slice();

        let winner;
        let result;

        // The function of the if statement below is to make sure that when the user clicks an already full column,
        //  then the code does not try to edit the gameInfo.board state with an out of bound index, also, the user
        //  cannot enter a token if there is a winner
        // The same if statement is repeated in hoverEnter() and hoverLeave() so that when a user hovers over a column,
        //  again, the gameBoard cannot be changed using an out of bound index.
        if (tokenRowEntry[column] >= 0 && gameInfo.winner === '') {

            board[column][tokenRowEntry[column]] = [gameInfo.player.token,1.0];

            result = checkWin({i:Number(column),j:tokenRowEntry[column], gameBoard:board, token:gameInfo.player.token});
            if (result) {
                winner = gameInfo.player.nickname;
                logGameWin(winner, gameInfo.otherPlayer.nickname);
                setHighlightWin({winType: result.winType, offset:result.offset, rotate:result.rotate, x:result.first[0], y:result.first[1]});
            }

            tokenRowEntry[column] = tokenRowEntry[column]-1;

            // This if statement below fixes as bug where if a column is clicked, it will show a 'hovered' token above
            //  the recently placed token. This hovered token is of the other players token colour.
            // The control statement of the if statement also makes sure that the gameBoard cannot be changed using an
            //  out of bound index.
            if (tokenRowEntry[column] > 0 && !winner) {
                board[column][tokenRowEntry[column]] = [gameInfo.otherPlayer.token,0.3];
            }
        }

        if (winner) {
            setGameInfo({...gameInfo, tokenRowEntry:tokenRowEntry, board:board, winner:gameInfo.player.nickname});
        } else {
            setGameInfo({...gameInfo, tokenRowEntry:tokenRowEntry, board:board, player:gameInfo.otherPlayer, otherPlayer:gameInfo.player});
        }
    }

    function hoverEnter(column:number) {
        const board = gameInfo.board.slice();
        const move = gameInfo.tokenRowEntry.slice();

        if (move[column] >= 0 && gameInfo.winner === '') {
            board[column][move[column]] = [gameInfo.player.token,0.3];
            setGameInfo({...gameInfo, board:board});
        }
    }

    function hoverLeave(column:number) {
        const board = gameInfo.board.slice();
        const move = gameInfo.tokenRowEntry.slice();

        if (move[column] >= 0 && gameInfo.winner === '') {
            board[column][move[column]] = [o, 1.0];
            setGameInfo({...gameInfo, board: board});
        }
    }

    function HighlightWin() {
        if (gameInfo.winner) {
            return (
                <div style={{height:'0px'}}>
                    <div className={highlightWin.winType} style={{paddingBottom:'-10px', transform:`translate(${highlightWin.offset.x+highlightWin.x*90}px,${highlightWin.offset.y+highlightWin.y*75}px) rotate(${highlightWin.rotate}deg)`}}></div>
                </div>
            );
        } else {
            return null;
        }
    }

    function CreateContent() {

        const generateBoard = (row:Array<[string,number]>, index:number) =>
            (
                <div className={'game-table-col'}
                     id={String(index)}
                     onClick={() => showCell(index)}
                     onMouseEnter={() => hoverEnter(index)}
                     onMouseOut={() => hoverLeave(index)}
                >
                    {row.map((val:[string,number], position:number) =>
                        <div id={String(position)} className={'game-table-cell'}>
                            <img style={{height:'48px', opacity:val[1]}} src={val[0]}/>
                        </div>
                        )
                    }
                </div>
            );

        return (
            <div className={'game-table'}>
                {gameInfo.board.map(generateBoard)}
            </div>
        );
    }

    return (
        <div>
            <div>
                <CreateContent/>
                <HighlightWin/>
            </div>
            <h2 style={{paddingTop:'50px'}}>{(gameInfo.winner === '') ? `${gameInfo.player.nickname}, it is your turn` : `${gameInfo.winner} WINS!!!`}</h2>
            <ShowRematch/>
        </div>
    );
}

export default GameTable;
