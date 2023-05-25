export interface Player {
    avatar:string;
    setAvatar:(value:string)=>void;
    nickname:string;
    setNickname:(value:string)=>void;
    token:string;
    setToken:(value:string)=>void;
}

export interface GameData {
    players:{nickname:string;wins:number;avatar:string}[];
}
