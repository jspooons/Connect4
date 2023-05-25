import React from 'react';
import Modal from 'react-modal';
import {JoinProps} from '../types';
import './styles.scss';

function Join(props:JoinProps)
{
    const [createIsOpen, setIsOpenCreate] = React.useState(false);
    const [avatarIsOpen, setIsOpenAvatar] = React.useState(false);
    const [notification, setNotification] = React.useState('');

    const [login, setLogin] = React.useState(false);

    const players = props.gameFile.players.map((player:{nickname:string;wins:number}, index:number) =>
        {
            const {nickname, wins} = player;
            return nickname;
        }
    );

    function openLogin() {
        setNotification('');
        setLogin(true);
    }

    function closeLogin() {
        setNotification('');
        setLogin(false);
    }

    function openCreate() {
        closeLogin();
        setNotification('');
        setIsOpenCreate(true);
    }

    function closeCreate() {
        setNotification('');
        setIsOpenCreate(false);
    }

    function closeLoginAndCreate() {
        closeCreate();
        closeLogin();
    }

    function openAvatar() {
        setIsOpenAvatar(true);
    }

    function closeAvatar() {
        setIsOpenAvatar(false);
    }

    function closeAll() {
        closeAvatar();
        closeCreate();
        closeLogin();
    }

    const handleSubmit1 = (sEvent: any) => {
        sEvent.preventDefault(sEvent);
        if (sEvent.target.nickname.value === '') {
            setNotification('empty');
        } else if (!players.includes(sEvent.target.nickname.value)){
            setNotification('unique');
        } else if (sEvent.target.nickname.value === props.other) {
            setNotification('alreadyIn');
        } else {
            props.setNickname(sEvent.target.nickname.value);
            const playerAvatar = props.gameFile.players.filter(({nickname}) => nickname === sEvent.target.nickname.value).map(({avatar}) => avatar);
            props.setAvatar(playerAvatar.toString());
            props.setPJoin(true);
            props.setToken(props.token);
            setNotification('');
            closeAll();
        }
    };

    const handleSubmit2 = (sEvent: any) => {
        sEvent.preventDefault(sEvent);
        if (players.includes(sEvent.target.nickname.value)) {
            setNotification('notUnique');
        } else if (sEvent.target.nickname.value === '') {
            setNotification('empty');
        } else if (sEvent.target.nickname.value === props.other) {
            setNotification('alreadyIn');
        } else {
            props.setNickname(sEvent.target.nickname.value);
            props.setPJoin(true);
            props.setToken(props.token);
            setNotification('');
            closeAll();
        }
    };

    function AvatarModal() {
        const avatars = [];
        for (let i=0; i<6; i++) {
            avatars.push(`/avatars/avatar${i+1}.jpeg`);
        }

        const avatarTableData = [];
        while(avatars.length) {
            avatarTableData.push(avatars.splice(0,3));
        }

        const generateAvatar = (row:string[]) =>
            (
                <tr>
                    {row.map((val:string) => <img className={'avatar'} src={val} onClick={() => {props.setAvatar(val); closeAvatar();}}></img>)}
                </tr>
            );

        return (
            <Modal
                isOpen={avatarIsOpen}
                onRequestClose={closeAvatar}
                className={'login'}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}>

                <div className={'modal-header'}>
                    <h2>Select an Avatar</h2>
                    <button onClick={closeAll} className={'close'}>X</button>
                </div>
                <div className={'modal-body'}>
                    <table style={{marginLeft: 'auto',marginRight: 'auto'}}>
                        {avatarTableData.map(generateAvatar)}
                    </table>
                </div>
                <div className={'modal-footer'}>
                    <button onClick={closeAvatar} className={'modal-button'}>Back</button>
                </div>
            </Modal>
        );
    }

    function NotifyUser(prop:{text:string}) {
        switch(prop.text) {
            case 'empty':
                return <div className={'notification'}>Enter a nickname</div>;
            case 'notUnique':
                return <div className={'notification'}>This nickname is taken</div>;
            case 'unique':
                return <div className={'notification'}>This nickname does not exist</div>;
            case 'alreadyIn':
                return <div className={'notification'}>This user has already joined</div>;
            default:
                return <div className={'notification'}></div>;
        }
    }

    return (
        <div >
            <button className={props.classNameButton} onClick={openLogin}>Join</button>
            <Modal
                isOpen={login}
                onRequestClose={closeLogin}
                className={'login'}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}>
                <Modal
                    isOpen={createIsOpen}
                    onRequestClose={closeCreate}
                    className={'login'}
                    shouldCloseOnOverlayClick={false}
                    shouldCloseOnEsc={false}>

                    <AvatarModal/>

                    <div className={'modal-header'}>
                        <h2>Create New Profile</h2>
                        <button className={'close'} onClick={closeLoginAndCreate}>X</button>
                    </div>
                    <div className={'modalBody'}>
                        <div className={'nickname-text'}>Enter a new nickname and select your avatar</div>
                        <form onSubmit={handleSubmit2} className={'enter-nickname-create'}>
                            <label>
                                Nickname:
                            </label>
                            <input type={'text'} name={'nickname'} onChange={(e:any) => (props.setNickname(e.target.value))}/>
                            <input type={'submit'} className={'modal-enter-login'} value={'Enter'}/>

                        </form>
                        <div className={'container'}>
                            <img className={'image'} src={props.avatar}>
                                <div className='middle'>
                                    <button className='text' onClick={openAvatar}>Change</button>
                                </div>
                            </img>
                        </div>
                        <NotifyUser text={notification}/>
                    </div>
                    <div className={'modal-footer'}>
                        <button onClick={() => {closeCreate(); props.setNickname(''); props.setAvatar('/avatars/avatar1.jpeg');}} className={'modal-button'}>back</button>
                    </div>

                </Modal>
                <div className={'modal-header'}>
                    <h2>Login to Profile</h2>
                    <button onClick={closeLogin} className={'close'}>X</button>
                </div>
                <div className={'modalBody'}>
                    <div className={'nickname-text'}>Enter your previously used Nickname</div>
                    <form onSubmit={handleSubmit1} className={'enter-nickname-login'}>
                        <div>
                            <label>
                                Nickname:
                            </label>
                            <input type={'text'} name={'nickname'}/>
                            <NotifyUser text={notification}/>
                        </div>
                        <button type={'submit'} className={'modal-enter-login'}>Enter</button>
                    </form>
                    <div className={'register-text'}>Create a new profile by clicking register </div>
                </div>
                <div className={'modal-footer'}>
                    <button onClick={openCreate} className={'modal-button'}>register</button>
                </div>
            </Modal>

            <Modal
                isOpen={createIsOpen}
                onRequestClose={closeCreate}
                className={'login'}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}>

                <AvatarModal/>

                <div className={'modal-header'}>
                    <h2>Create New Profile</h2>
                    <button className={'close'} onClick={closeLoginAndCreate}>X</button>
                </div>
                <div style={{height:'140px'}}>
                    <div className={'nickname-text'}>Enter a new nickname and select your avatar</div>
                    <form onSubmit={handleSubmit2} className={'enter-nickname-create'}>
                            <label>
                                Nickname:
                            </label>
                            <input type={'text'} name={'nickname'}/>
                            <input type={'submit'} className={'modal-enter-create'} value={'Enter'}/>
                            <NotifyUser text={notification}/>
                    </form>
                    <div className={'container'}>
                        <img className={'image'} src={props.avatar}/>
                        <div className='middle'>
                            <button className='text' onClick={openAvatar}>Change</button>
                        </div>
                    </div>
                </div>
                <div className={'modal-footer'}>
                    <button onClick={() => {closeCreate(); props.setAvatar('/avatars/avatar1.jpeg'); openLogin();}} className={'modal-button'}>back</button>
                </div>

            </Modal>
        </div>
    );
}

export default Join;
