import { useEffect, useState } from 'react';
import './reg.scss';
import UserItem from './UserItem/UserItem';

const Reg = () => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [age, setAge] = useState<number>(0);

    const [error, setError] = useState<string>('');

    const [users, setUsers] = useState([]);
    const [url, setUrl] = useState<string>('https://642ae4e300dfa3b54751e864.mockapi.io/user');    

    const getUsers = async() => {
        const response = await fetch(url);
        const data = await response.json();
        setUsers(data);
    };
    
    const sortId = () => {
        users.sort((a: any, b: any) => b.id - a.id);
    };

    const sortName = () => {
        users.sort((a: any, b: any) => b.name - a.name);
    };

    const sortEmail = () => {
        users.sort((a: any, b: any) => b.email - a.email);
    };

    const sortAge = () => {
        users.sort((a: any, b: any) => b.age - a.age);
    };

    const addUser = async() => {
        users.some(async (elem: { email: string; }) => {
            if(elem.email !== email){
                if(name && email && age){
                    await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            age: Number(age)
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).finally(()=>{
                        getUsers();
        
                        setName('');
                        setEmail('');
                        setAge(0);

                        setError('');
                    });
                }
                else{
                    setError('Заповніть всі поля');
                }
            }
            else{
                setError('Такий E-mail вже використовується');
            }
        });

        if(users.length < 1){
            if(name && email && age){
                await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        age: age
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).finally(()=>{
                    getUsers();
    
                    setName('');
                    setEmail('');
                    setAge(0);

                    setError('');
                });
            }
            else{
                setError('Заповніть всі поля');
            }
        }
    };

    useEffect(()=>{ getUsers() },[]);

    return(
        <div className='reg'>
            <h1>Реєстрація користувача</h1>
            <div className="reg-user">
                <input type="text" placeholder="Введіть ім'я" onChange={(e)=>{setName(e.target.value)}}/>
                <input type="text" placeholder='Введіть e-mail' onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="number" placeholder='Введіть вік' onChange={(e)=>{setAge(e.target.value as unknown as number)}}/>
                <button onClick={addUser}>Додати користувача</button>
            </div>
            <div className="reg-error">
                <p>{error}</p>
            </div>
            <h1>Користувачі</h1>
            <div className="reg-box">
                <div className="reg-box-title" onClick={sortId} style={{width: `5%`}}>ID</div>
                <div className="reg-box-title" onClick={sortName} style={{width: `25%`}}>Name</div>
                <div className="reg-box-title" onClick={sortEmail} style={{width: `40%`}}>Email</div>
                <div className="reg-box-title" onClick={sortAge} style={{width: `15%`}}>Age</div>
                <div className='reg-box-btn'></div>
                <div className='reg-box-btn'></div>
            </div>
            {users.map((elem: { name: string; email: string; id: number; age: number; }) => {
                return <UserItem key={elem.id} elem={elem} getUsers={getUsers} users={users}/>
            })}
        </div>
    )
};

export default Reg;