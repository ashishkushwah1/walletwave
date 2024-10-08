import React, { useState } from 'react'
import axios from 'axios';
import { BottomWarning } from '../components/BottomWarning'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, serPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  return <div className='bg-slate-300 h-screen flex justify-center'>
    <div className='flex flex-col justify-center'>
      <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputBox placeholder="John" label={"First Name"} onChange={e => setFirstName(e.target.value)} />
        <InputBox placeholder="Doe" label={"Last Name"} onChange={e => setLastName(e.target.value)} />
        <InputBox placeholder="example@gmail.com" label={"Email"} onChange={e => setUsername(e.target.value)} />
        <InputBox placeholder="123456" label={"Password"} onChange={e => serPassword(e.target.value)} />
        {
          errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )
        }
        <div className='pt-4'>
          <Button label={loading?"Signing up..":"Sign up"} onClick={async () => {
            setLoading(true);
            try{
              const response = await axios.post("https://walletwave-peach.vercel.app/api/v1/user/signup", {
                username,
                password,
                firstName,
                lastName
              });
              localStorage.setItem("token",response.data.token);
              navigate('/dashboard');
              setLoading(false);
            } catch(error){
              if (error.response && error.response.status === 411) {
                setErrorMessage("Email already exists");
              } else if(error.response && error.response.status === 401){
                setErrorMessage("Wrong input format")
              } else {
                setErrorMessage("An error occurred. Please try again later.");
              }
            }
            setLoading(false);
          }} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}

export default Signup