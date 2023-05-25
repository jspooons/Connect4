import React from 'react';
import Modal from 'react-modal';
import './styles.scss';

function Rules(props:{initiallyOpen:boolean}) {
    const [modalIsOpen, setIsOpen] = React.useState(props.initiallyOpen);

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button className='help' onClick={openModal}>?</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={'rules'}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}>

                <div className={'modal-header'}>
                    <h2>Rules</h2>
                </div>
                <div className={'modalBody'}>
                    <ul>
                        <li >Two player game where each player select a distinct token colour to play with</li>
                        <li >The players take turns dropping a token in a 7x6 vertically suspended grid</li>
                        <li >A token can be placed in a non-empty column and falls to the lowest available space within the column</li>
                        <li >A winner emerges when there exists a horizontal, vertical or diagonal line of four of the same coloured token</li>
                    </ul>
                </div>
                <div className={'modal-footer'}>
                    <button className={'modal-button'} onClick={closeModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
}

export default Rules;
