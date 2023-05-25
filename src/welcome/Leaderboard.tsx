import React from 'react';
import {GameData} from '../types';

function Leaderboard(props:{gameFile:GameData}) {
    const table = props.gameFile;

    const header = Object.keys(table.players[0]);
    const players = table.players.sort((a,b) => {
        if (a.wins > b.wins) {
            return -1;
        } else if (a.wins < b.wins) {
            return 1;
        }
        return 0;
    });
    const gameInfo = players.map((player:{nickname:string;wins:number;avatar:string}, index:number) => {
        const {nickname, wins, avatar} = player;
        return (
            <tr className={'l-row'} key={nickname}>
                <td className={'l-cell'}>{index+1}</td>
                <td className={'l-cell'}>{nickname}</td>
                <td className={'l-cell'}>{wins}</td>
            </tr>
        );
    });

    header.splice(2);
    const headerMap = header.map((key, index) =>
        <th className={'lHead'} key={index}>
            {key.toUpperCase()}
        </th>
    );

    return (
        <table className={'l-table'}>
            <thead>
            <tr className={'header'}>
                <td></td>
                {headerMap}
            </tr>
            </thead>
            <tbody className={'l-body'}>
            {gameInfo}
            </tbody>
        </table>
    );
}

export default Leaderboard;
