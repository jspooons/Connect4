import {GameData, Player} from '../types';

export interface LobbyProps {
    onClick:(value:string)=>void;
    player1:Player;
    player2:Player;
    gameFile:GameData;
}

export interface JoinProps extends Player {
    classNameButton:string;
    pJoin:boolean;
    setPJoin:(value:boolean)=>void;
    setToken:(value:string)=>void;
    token:string;
    other:string;
    gameFile:GameData;
}

export interface JoiningProps {
    pJoin:boolean;
    setPJoin:(value:boolean)=>void;
    classNameImg:string;
    classNameLeave:string;
    classNameButton:string;
    defaultToken:string;
    player:Player;
    otherToken:string;
    otherNickname:string;
    gameFile:GameData;
}

export interface TokenSelectProps {
    setToken:(value:string)=>void;
    other:string;
}
