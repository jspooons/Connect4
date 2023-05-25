import React from 'react';
import {Player} from './types';

export function usePlayer(path:string): Player {
    const [avatar, setAvatar] = React.useState(path);
    const [nickname, setNickname] = React.useState('');
    const [token, setToken] = React.useState('');

    return {avatar, setAvatar, nickname, setNickname, token, setToken};
}
