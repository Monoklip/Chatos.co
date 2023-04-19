import { useState } from 'react';
import './user-item.scss';

const UserItem = (props: { elem: { name: string; email: string; id: number; age: number; }; getUsers: any; users: any; }) => {

    const { name, email, id, age } = props.elem;

    const [newName, setNewName] = useState<string>('');
    const [newEmail, setNewEmail] = useState<string>('');
    const [newAge, setNewAge] = useState<number>(0);

    const [url, setUrl] = useState<string>(`https://642ae4e300dfa3b54751e864.mockapi.io/user/${id}`)

    const [renameBlock, setRenameBlock] = useState<boolean>(false);

    const deleteUser = async() => {
        await fetch(url, {
            method: 'DELETE'
        }).finally(()=>{
            props.getUsers();
        });
    };

    const renameUser = () => {
        props.users.some(async (elem: { email: string; }) => {
            if(elem.email !== newEmail){
                if(newName && newEmail && newAge){
                    await fetch(url, {
                        method: 'PUT',
                        body: JSON.stringify({
                            name: newName,
                            email: newEmail,
                            age: Number(newAge)
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).finally(()=>{
                        props.getUsers();
                        setRenameBlock(false);
        
                        setNewName('');
                        setNewEmail('');
                        setNewAge(0);
                    });
                }
            }
            else{
                alert('bb')
            }
        })
    };

    const openRenameBlock = () => {
        setRenameBlock(true);
    };

    const cancelRenameUser = () => {
        setRenameBlock(false);
    };

    return(
        <>
            <div className='user-item'>
                <div className="user-item-title">{id}</div>
                <div className="user-item-title">{name}</div>
                <div className="user-item-title">{email}</div>
                <div className="user-item-title">{age}</div>
                <button className='rename-user' onClick={openRenameBlock}>Rename</button>
                <button className='delete-user' onClick={deleteUser}>Delete</button>
            </div>
            {renameBlock && 
                <div className="user-item-rename">
                    <input type="text" placeholder="Введіть нове ім'я"  onChange={(e)=>{setNewName(e.target.value)}}/>
                    <input type="text" placeholder="Введіть новий E-mail" onChange={(e)=>{setNewEmail(e.target.value)}}/>
                    <input type="number" placeholder="Введіть новий вік" onChange={(e)=>{setNewAge(e.target.value as unknown as number)}}/>
                    <button onClick={renameUser} style={{background: `green`}}>Save</button>
                    <button onClick={cancelRenameUser} style={{background: `orange`}}>Cancel</button>
                </div>
            }
        </>
    )
};

export default UserItem;