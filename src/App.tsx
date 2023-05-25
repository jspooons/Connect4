import './App.scss';
import React, {ReactNode, useEffect, useState} from 'react';
import {useNavigate, Routes, Route} from 'react-router-dom';
import Welcome from './welcome/Welcome';
import Lobby from './lobby/Lobby';
import Game from './game/Game';
import {usePlayer} from './usePlayer';
import gameData from './gameData.json';


function App(): ReactNode {
    const [page, setPage] = useState('Welcome');
    const navigate = useNavigate();
    const player1 = usePlayer('/avatars/avatar1.jpeg');
    const player2 = usePlayer('/avatars/avatar2.jpeg');

    const [gameFile, setGameFile] = React.useState(gameData);

    useEffect(() => {
        navigate(page);
    }, [page]);


    return (

      <div className="App">
              <Routes>
                  <Route path="Welcome" element={<Welcome onClick={setPage}
                                                          gameFile={gameFile}
                                                />}
                  />
                  <Route path="Lobby" element={<Lobby onClick={setPage}
                                                      player1={player1}
                                                      player2={player2}
                                                      gameFile={gameFile}
                                                />}
                  />
                  <Route path="Game" element={<Game onClick={setPage}
                                                    player1={player1}
                                                    player2={player2}
                                                    setGameFile={setGameFile}
                                                    gameFile={gameFile}
                                                />}
                  />
              </Routes>
      </div>
    );
}

export default App;
