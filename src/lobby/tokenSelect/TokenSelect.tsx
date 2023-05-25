import React from 'react';
import Modal from 'react-modal';
import {TokenSelectProps} from '../types';
import './styles.scss';

function TokenSelect(props:TokenSelectProps) {

    const [TokenIsOpen, setIsOpenToken] = React.useState(false);
    const [notification, setNotification] = React.useState('');

    function openToken() {
        setNotification('');
        setIsOpenToken(true);
    }

    function closeToken() {
        setNotification('');
        setIsOpenToken(false);
    }

    function handleClick(token:string) {
        if (props.other === token) {
            setNotification('alreadyIn');
        } else {
            setNotification('');
            props.setToken(token);
            closeToken();
        }
    }

    function NotifyUser(prop:{text:string}) {
        switch(prop.text) {
            case 'alreadyIn':
                return <div className={'notification'}>Token color already in use</div>;
            default:
                return <div className={'notification'}></div>;
        }
    }

    const tokens = ['blue','green','pink','purple','red','yellow'].map((value:string) =>`/tokens/${value}Token.png`);

    const tokenTableData = [];
    while(tokens.length) {
        tokenTableData.push(tokens.splice(0,3));
    }

    const generateToken = (row:string[]) =>
        (
            <tr>
                {row.map((val:string) => <img className={'avatar'} src={val} onClick={() => handleClick(val)}></img>)}
            </tr>
        );

    return (
        <div>
            <button className={'change-token'} onClick={openToken}>Change Colour</button>
            <Modal
                isOpen={TokenIsOpen}
                onRequestClose={closeToken}
                className={'login'}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}>

                <div className={'modal-header'}>
                    <h2>Select a Token Colour</h2>
                    <button onClick={closeToken} className={'close'}>X</button>
                </div>
                <div className={'modal-body'}>
                    <table style={{marginLeft: 'auto',marginRight: 'auto'}}>
                        {tokenTableData.map(generateToken)}
                    </table>
                    <NotifyUser text={notification}/>
                </div>
                <div className={'modal-footer'}>
                    <button onClick={closeToken} className={'modal-button'}>Back</button>
                </div>
            </Modal>
        </div>
    );
}

export default TokenSelect;
