import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers, sendMessage } from './usersSlice';

const AddUser = (props)=>{
    const storeDispatch = useDispatch();   
     const {storeusers,messages} = useSelector(state=>({storeusers:state.users.users,messages:state.users.messages}));
    console.log('messages',messages);
    const [userName,setUsers] = React.useState('');
    const [msg,setMsg] = React.useState('');
    const [currentUser,setCurrentUser] = React.useState(undefined);

    console.log('adduser.jsx',storeusers)
    const addUserToStore = ()=>{
        storeDispatch(addUsers(userName));
        setUsers('');
    }

    const  sendMessage1 = ()=>{
        if(!!!currentUser){
            alert("Please select user");
            return;
        }
        storeDispatch(sendMessage({currentUser,message:msg}))
    }

    const userChange = (e)=>{
        const username = e.target.value;
        console.log('username',username);
        setCurrentUser(e.target.value);
    }

    return <>
    <input onChange={(e)=>setUsers(e.target.value)} value={userName} />
    <button onClick={addUserToStore}>Add User</button>
    <div>
        <div>
            <p>{console.log(messages)}{messages&&messages.length>0?messages[0].currentUser:'na'}</p>
            {
                messages&&messages.length>0&&
                messages.map((message,index)=><p>{message.message}</p>)
                
            }
        </div>
       {
        storeusers && Array.isArray(storeusers) &&storeusers.length>0&&
            <select value={currentUser} onChange={(e)=>userChange(e)}>
                {
                storeusers.map((user,index)=><option>{user}</option>)
                }
                
            </select>
        } 
        {
            storeusers && Array.isArray(storeusers) &&storeusers.length>0&&
            <>
            <input value={msg} onChange={(e)=>setMsg(e.target.value)}/>
        <button onClick={sendMessage1}>send</button>
            </>
        }
    </div>
    
    </>
}

export default AddUser;