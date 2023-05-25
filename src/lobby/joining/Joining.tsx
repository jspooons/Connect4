import React from 'react';
import './styles.scss';
import {JoiningProps} from '../types';
import TokenSelect from '../tokenSelect/TokenSelect';
import Join from '../join/Join';

function Joining(props:JoiningProps) {

    const playerLeave = () => {
        props.player.setAvatar('/avatars/avatar1.jpeg');
        props.player.setNickname('');
        props.setPJoin(false);
        props.player.setToken('');
    };

    if (props.pJoin) {
        return (
            <div>
                <h4 className={props.classNameImg}>{props.player.nickname}</h4>
                <img className={props.classNameImg} src={props.player.avatar} style={{paddingBottom:'10px'}}/>
                <div>
                    <img style={{height:'64px'}} src={props.player.token}/>
                </div>
                <div>
                    <TokenSelect setToken={props.player.setToken} other={props.otherToken}/>
                </div>
                <div style={{paddingTop:'20px'}}>
                    <button className={props.classNameLeave} onClick={playerLeave}>Leave</button>
                </div>
            </div>
        );
    } else {
        return (
            <Join classNameButton={props.classNameButton}
                  pJoin={props.pJoin}
                  setPJoin={props.setPJoin}
                  avatar={props.player.avatar}
                  setAvatar={props.player.setAvatar}
                  nickname={props.player.nickname}
                  setNickname={props.player.setNickname}
                  setToken={props.player.setToken}
                  token={props.defaultToken}
                  other={props.otherNickname}
                  gameFile={props.gameFile}
            />
        );
    }
}

export default Joining;
