import React, { useState } from 'react'
import axios from 'axios';
import { BottomWarning } from '../components/BottomWarning'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom';
const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, serPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  return <div className='bg-slate-300 h-screen flex justify-center'>
    <div className='flex flex-col justify-center'>
      <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="example@gmail.com" label={"Email"} onChange={e => setUsername(e.target.value)} />
        <InputBox placeholder="123456" label={"Password"} onChange={e => serPassword(e.target.value)} />
        {
          errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )
        }
        <div className='pt-4'>
          <Button label={"Sign in"} onClick={async () => {
            try{
              const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password
              });
              localStorage.setItem("token",response.data.token);
              navigate('/dashboard');
            } catch (error){
              if (error.response && error.response.status === 411) {
                setErrorMessage("Incorrect username or password. Please try again.");
              } else {
                setErrorMessage("An error occurred. Please try again later.");
              }
            }
          }} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}

export default Signin