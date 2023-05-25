import React from 'react';
import Modal from 'react-modal';
import {useNavigate} from 'react-router-dom';
import {RematchProps} from './types';

function Rematch(props:RematchProps) {
    const [isOpen, setIsOpen] = React.useState(props.hasWon);
    const navigate = useNavigate();

    function openRematch() {
        setIsOpen(true);
    }

    function closeRematch() {
        setIsOpen(false);
    }

    function returnToWelcome() {
        props.player1.setAvatar('/avatars/avatar1.jpeg');
        props.player2.setAvatar('/avatars/avatar2.jpeg');
        props.player1.setNickname('');
        props.player2.setNickname('');
        navigate('/Welcome');
        closeRematch();
    }

    return (
        <div>
            <button className={'modal-button'} onClick={openRematch}>Rematch</button>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeRematch}
                className={'login'}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}>

                <div className={'modal-header'}>
                    <h2>Rematch?</h2>
                    <button onClick={closeRematch} className={'close'}>X</button>
                </div>
                <div className={'modal-body'}>
                    <h4></h4>
                    <div style={{margin:'10px 10px 50px'}}>If you would like a rematch, confirm by clicking the Yes button. Or press Exit to return to the Welcome screen</div>
                </div>
                <div className={'modal-footer'}>
                    <button onClick={returnToWelcome} className={'modal-button'}>Exit</button>
                    <button onClick={() => props.setReset(true)} className={'rematch-yes'}>Yes</button>
                </div>
            </Modal>
        </div>
    );
}

export default Rematch;
