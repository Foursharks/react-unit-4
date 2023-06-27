import React, {useState, useContext} from 'react'; 
import axios from "axios";
import AuthContext from "../store/authContext";


 
//setting up some variables so we can add values to them
const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)
   const authCtx = useContext(AuthContext); 
 
   const submitHandler = e => {
    //don't reload the page on submit
    e.preventDefault() 
    console.log('submitHandler called')
    //put the user's inputed data in an object 
    const body = {
        username,
        password
    }

    axios.post(register ? `http://localhost:5050/register` : `http://localhost:5050/login`, body)
     .then(({data}) => {
        authCtx.login(data.token, data.exp, data.userId)
        console.log('AFTER AUTH', data);
     })
     .catch((err) => {
        setPassword('')
        setUsername('');
     });
   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                   className='form-input'/>
               <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                   className='form-input'/>
                   {/* //If the user selects "register", form button should say sign up, and otherwise should say login */}
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button className='form-btn' onClick={() => setRegister(!register)}>Need to {register ? 'Login': 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth