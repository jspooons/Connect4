import React from 'react';
import './styles.scss';
import Rules from '../popups/Rules';
import Joining from './joining/Joining';
import {LobbyProps} from './types';


function Lobby(props:LobbyProps)
{
    const Notification = {
        default: '',
        p1Joined: 'p1',
        p2Joined: 'p2',
        bothJoined: 'both',
        tokensSame: 'token'
    } as const;

    type Notifications = typeof Notification[keyof typeof Notification];

    const [p1Join, setP1Join] = React.useState(false);
    const [p2Join, setP2Join] = React.useState(false);
    const [tokensSame, setTokensSame] = React.useState(false);
    const [notification, setNotification] = React.useState<Notifications>(Notification.default);

    React.useEffect(() => {
        if (p1Join && !p2Join) {
            setNotification(Notification.p1Joined);
        } else if (p2Join && !p1Join) {
            setNotification(Notification.p2Joined);
        } else if (p1Join && p2Join) {
            setNotification(Notification.bothJoined);

            if (tokensSame) {
                setNotification(Notification.tokensSame);
            }
        } else {
            setNotification('');
        }
    }, [p1Join, p2Join, tokensSame]);

    React.useEffect(() => {
        if (props.player2.token === props.player1.token) {
            setTokensSame(true);
        } else {
            setTokensSame(false);
        }
    }, [props.player2.token, props.player1.token]);

    function NotifyPlayers(prop:{text:string}) {
        switch(prop.text) {
            case 'p1':
                return <h3>Player 1 has joined, Player 2 still needs to join</h3>;
            case 'p2':
                return <h3>Player 2 has joined, Player 1 still needs to join</h3>;
            case 'both':
                return <h3>Both Players have joined the lobby, press 'Start Game' to play</h3>;
            case 'token':
                return <h3>One player needs to change their token colour to Start</h3>;
            default:
                return <h3>Player 1 and Player 2 are yet to join the Lobby</h3>;
        }
    }


    return (
        <div className={'lobby-screen'}>
            <div className={'header'}>
                <h1>Lobby</h1>
                <button className='back' onClick={() => {
                    props.onClick('Welcome');
                    props.player1.setAvatar('/avatars/avatar1.jpeg');
                    props.player2.setAvatar('/avatars/avatar1.jpeg');
                    props.player1.setNickname('');
                    props.player2.setNickname('');}}>

                    {'<'}
                </button>
            </div>
            <div className={'body'} >
                <Rules initiallyOpen={false}/>
                <div>
                    <div className={'join'}>
                        <div className={'separator'}></div>
                        <h4 className={'hp1'}>Player 1</h4>
                        <h4 className={'hp2'}>Player 2</h4>
                        <div className={'wrapper'}>
                            <div className={'first'}>
                                <Joining setPJoin={setP1Join}
                                         pJoin={p1Join}
                                         player={props.player1}
                                         classNameImg={'p1-image'}
                                         classNameLeave={'leave-button1'}
                                         classNameButton={'p1-button'}
                                         defaultToken={'/tokens/redToken.png'}
                                         otherToken={props.player2.token}
                                         otherNickname={props.player2.nickname}
                                         gameFile={props.gameFile}
                                />
                            </div>
                            <div className={'second'}>
                                <Joining setPJoin={setP2Join}
                                         pJoin={p2Join}
                                         player={props.player2}
                                         classNameImg={'p2-image'}
                                         classNameLeave={'leave-button2'}
                                         classNameButton={'p2-button'}
                                         defaultToken={'/tokens/yellowToken.png'}
                                         otherToken={props.player1.token}
                                         otherNickname={props.player1.nickname}
                                         gameFile={props.gameFile}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{paddingTop: '35px'}} className={'footer'}>
                <NotifyPlayers text={notification}/>
                <div style={{paddingTop: '15px'}}>
                    <button disabled={!(p1Join && p2Join && !tokensSame)} className={'start'} onClick={() => props.onClick('Game')}>Start Game</button>
                </div>
            </div>
        </div>
    );
}

export default Lobby;
