// import logo from './logo.svg';
import * as React from 'react';
import './App.css';

const initialState = {
  usernameType:'mail',
  username:'',
  password:''
}

const reduder =(state,action)=>{
  switch (action.type) {
    case 'onchange':
      return ({...state,[action.payload.key]:action.payload.value})  
    default:
      break;
  }
}

function App() {
  const [state,dispatch] = React.useReducer(reduder,initialState);

  const [showOtpPage,setOtpPage] = React.useState(false);
  const [otp,setOtp] = React.useState('');
  const [userOtp,setUserOtp] = React.useState('');
  console.log('state',state);
  const onChange = (e)=>{
    const key = e.target.name;
    const value = e.target.value;
    dispatch({type:'onchange',payload:{key,value}});
  }

  const validate = ()=>{
    let isvalid;
    if(state.usernameType==='mail'){
      isvalid = String(state.username).includes('gmail');
      // return isvalid; 
    }
    if(state.usernameType==='phone'){
      isvalid = String(state.username).length===10;
    }

    if(String(state.password).length===0){
      // alert("Please enter valid password");
      // return;
    }
    return isvalid;

  }

  const generateOtp=()=>{
    let otp=""
    for (let i=0;i<Math.round(Math.random()*10);i++){
      otp=otp+(Math.round(Math.random()*10))
    }
    setOtp(otp);
  }

  const login = ()=>{
    const validateDetails = validate();
    console.log(validateDetails);
    if (validateDetails===true){
      setOtpPage(true);
      generateOtp();
    }
  }

  const otpChanging =(e)=>{
    setUserOtp(userOtp+String(e.target.value));
    console.log("userOtp===otp",userOtp===otp)
    if (userOtp===otp){
      console.log('successfully logedin');
    }
  }

  return (
    <div className="App">
      {
showOtpPage?
        <div>
          <h1>{otp}</h1>
          <>
          {otp.split('').map((single,ind)=><input type='number' value={userOtp.split("")[ind]} onChange={(e)=>otpChanging(e)} key={ind} />)}
          </>
          <button>submit</button>
        </div>
        :
        <>
        <div>
          <select name="usernameType"  onChange={e=>onChange(e)}>
            <option value='mail' selected>mail</option>
            <option value='phone'>phone</option>
          </select>
        <input name="username" onChange={e=>onChange(e)} />
        </div>
        {/* <input name="password" onChange={e=>onChange(e)} /> */}
        <button onClick={login}>login</button>
      </>
      }
    </div>
  );
}

export default App;
