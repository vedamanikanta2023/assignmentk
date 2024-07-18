import * as React from 'react';

const User = (props)=>{
    const [userDetails,setUserDetails] = React.useState(undefined);
    const [preveousValues,setPrviousValues] = React.useState([]);
    const [inputVal,setInputVal] = React.useState(1);
    const [nameWithLength,setNamesWithLength]=React.useState([]);
    console.log('userDetails',userDetails?userDetails.results[0].name:'N.A');
    const getTheName = (obj)=>{
        return `${obj.title}. ${obj.first} ${obj.last}`;
    }
    const fetchApi = ()=>{
        console.log('calling fetching api');
      fetch('https://randomuser.me/api/?results='+String(inputVal))
      .then(responce=>responce.json())
      .then(data=>{
        if (userDetails&&userDetails.results&&userDetails.results.length>0){
            setPrviousValues(userDetails.results);
        }
        setUserDetails(data);
    })
      .catch(e=>{
        console.log(e);
      })
    }

    const addingLength =(users)=>{
        console.log('addingLength',users)
        const sortedArray = users.map(user => {
            let length = (user.name.first+user.name.last).length;
            user.nameLength=length
            return user;
        });
        setNamesWithLength(sortedArray);
    }

    const sortingTheUserWithNameLength =()=>{
        const sortedArra= [];

        let hasNobigger = false;

        while(!hasNobigger){
            for(let i=0;i<nameWithLength.length;i++){
                console.log('inside for loop',nameWithLength[i].nameLength)
            if (nameWithLength[i].nameLength>nameWithLength[i+1].nameLength){
                let first = nameWithLength[i];
                hasNobigger=false;
                nameWithLength[i]=nameWithLength[i+1];
                nameWithLength[i+1]=first;

            }
            hasNobigger=true;
        }
        }
        
        console.log('nameWithLength',nameWithLength)
    }

    console.log('nameWithLength',nameWithLength);
    return<div>
        <input type='number' value={inputVal} onChange={(e)=>setInputVal(e.target.value)} />
        <button onClick={fetchApi}>
        submit
        </button>
        <p>{preveousValues.length}</p>
        {
            userDetails &&userDetails.results&&
            userDetails.results.map((user,index)=><p key={index}>{getTheName(user.name)}</p>)
            
        }
        <button onClick={()=>addingLength(userDetails &&userDetails.results?userDetails.results:[])}>sort</button>
        <button onClick={sortingTheUserWithNameLength}>sorting</button>
    </div>
}

export default User;