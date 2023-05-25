import React from 'react';
import Rules from '../popups/Rules';
import './styles.scss';
import GameTable from './GameTable';
import {GameProps} from './types';


function Game(props:GameProps) {

    const resetPlayerData = (() => {
        props.player1.setAvatar('/avatars/avatar1.jpeg');
        props.player2.setAvatar('/avatars/avatar1.jpeg');
        props.player1.setNickname('');
        props.player2.setNickname('');
    });

    return (
        <div className={'game-screen'}>
            <div className={'header'}>
                <h1>Connect4! Game</h1>
                <button
                    className='back'
                    onClick={() => {
                        props.onClick('Lobby');
                        resetPlayerData();
                    }}
                >{'<'}
                </button>
            </div>
            <div className={'body'}>
                <Rules initiallyOpen={true}/>
                <div className={'p1'}>
                    <h4 className={'nickname'}>{props.player1.nickname}</h4>
                    <div>
                        <img className={'avatar'} src={props.player1.avatar}/>
                    </div>
                    <div>
                        <img className={'token'} src={props.player1.token}/>
                    </div>

                </div>
                <div className={'game'}>
                    <GameTable currentPlayer={props.player1}
                               otherPlayer={props.player2}
                               gameFile={props.gameFile}
                               setGameFile={props.setGameFile}
                    />
                </div>
                <div className={'p2'}>
                    <h4 className={'nickname'}>{props.player2.nickname}</h4>
                    <div>
                        <img className={'avatar'} src={props.player2.avatar}/>
                    </div>
                    <div>
                        <img className={'token'} src={props.player2.token}/>
                    </div>
                </div>
            </div>
            <div className={'footer'}>
                <button className={'exit'} onClick={() => {props.onClick('Welcome'); resetPlayerData();}}>Exit</button>
            </div>
        </div>
    );
}

export default Game;
