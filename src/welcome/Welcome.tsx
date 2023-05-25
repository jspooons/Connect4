import React from 'react';
import './styles.scss';
import Rules from '../popups/Rules';
import Leaderboard from './Leaderboard';
import {WelcomeProps} from './types';


function Greet() {
    const greeting = 'Welcome to Connect4 !';

    return (
        <div>
            <h1>{greeting}</h1>
            <div className={'welcome-text'}>To get started, click the 'Start' button below to setup a game with another player. The rules for Connect 4! can be found by clicking the 'Help' button in the top right of this window. See who is winning in the leaderboard!</div>
        </div>
        );
}

function Welcome(props:WelcomeProps) {

    return (
        <div className={'temp'}>
            <div>
                <Greet/>
            </div>

            <div>
                <h1 id='title'>Leaderboard</h1>
            </div>

            <div className={'leaderboard'}>
                <Leaderboard gameFile={props.gameFile}/>
            </div>

            <div>
                <button className='start' onClick={() => props.onClick('Lobby')}>Start</button>
                <Rules initiallyOpen={false}/>
            </div>

        </div>
    );
}

export default Welcome;
