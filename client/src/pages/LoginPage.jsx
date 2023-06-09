import { Link, Navigate } from "react-router-dom";
import { useState,useContext } from "react";
import axios from 'axios';
import { UserContext } from "../UserContext";



const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [IsRedirect,setIsRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post('/login', {
        email,
        password,
      });
      setUser(data);
      alert('login successful');
      setIsRedirect(true);
    }catch(err){
      alert('Unauthorized');
    }
  }
  if (IsRedirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
        <div className='mb-28'>
        <h1 className='text-2xl text-center mb-4 font-semibold'>Login</h1>
        <form className='max-w-sm mx-auto' onSubmit={handleLoginSubmit}>
            <input type="email"
                   placeholder='your@gmail.com'
                   className=''
                   value={email}
                   onChange={(e) => setEmail(e.target.value)} />
            <input type="password" 
                   placeholder='yourpassword'
                   value={password}
                   onChange={(e) => setPassword(e.target.value)} />
            <button className='primary mt-2 hover:scale-105'>Login</button>
            <div className='flex items-center justify-center mt-4 gap-2'>
                <p>Don't have an account yet?</p>
                <Link to={'/register'}className='underline hover:scale-105'>Register</Link>
            </div>
        </form>
        </div>
    </div>
  )
}

export default LoginPage;