import {GameData} from '../types';

export interface WelcomeProps {
    onClick:(value:string)=>void;
    gameFile:GameData;
}
