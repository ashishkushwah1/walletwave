import React, { useEffect, useState } from 'react'
import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { balanceState } from '../utils/recoilState'
const Dashboard = () => {
    const [balance, setBalance] = useRecoilState(balanceState);
    useEffect(()=>{
        try{
        axios.get("https://walletwave-peach.vercel.app/api/v1/account/balance",{
            headers:{
                Authorization: "Bearer "+localStorage.getItem("token")
            }
        })
        .then(res=>setBalance(res.data.balance.toFixed(2)));
    } catch(error){
        console.error("Error fetching balance:"+ error);
    }
    },[]);
  return (
    <div>
      <Appbar />
      <div className='m-8' >
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  )
}

export default Dashboard
