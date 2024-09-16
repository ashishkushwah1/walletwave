import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { balanceState } from '../utils/recoilState';

const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useRecoilState(balanceState);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const handleAmountChange = (e) => {
        setAmount(parseFloat(e.target.value) || 0);
    }
    const sendMoney = async () => {
        setLoading(true);
        try {
            await axios.post("https://walletwave-peach.vercel.app/api/v1/account/transfer", {
                to: id,
                amount
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            const res = await axios.get("https://walletwave-peach.vercel.app/api/v1/account/balance", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setBalance(res.data.balance.toFixed(2));
            setSuccessMessage(`Rs. ${amount} sent to ${name}`);
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (e) {
            console.error("Error during transfer:", e);
        }
        setLoading(false);
    }

    return (
        <div className='flex justify-center h-screen bg-gray-100'>
            <div className='h-full flex flex-col justify-center'>
                <div className='border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg'>
                    <div className="flex flex-col space-y-1.5 p-6" style={{ marginTop: '0px' }}> {/* Override margin here */}
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className='p-6' style={{ marginTop: '0px' }}> {/* Set marginTop to 0 to ensure no margin */}
                        <div className="flex items-center space-x-4 space-y-0">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold mt-0">{name}</h3>
                        </div>
                        <div className='space-y-4'>
                            <div className='space-y-2'>
                                <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70' htmlFor='amount'>
                                    Amount (in Rs)
                                </label>
                                <input
                                    type='number'
                                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                                    id='amount'
                                    placeholder='Enter amount'
                                    onChange={handleAmountChange}
                                />
                                {amount > balance && <div className='text-red-600'>Amount excedded the balance</div>}
                                {successMessage && <div className='text-green-600'>{successMessage}</div>}
                            </div>
                            <button
                                disabled={amount <= 0 || amount > balance || loading}
                                onClick={sendMoney}
                                className={`justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full text-white ${(amount > 0 && amount <= balance && !loading) ? 'bg-green-500 hover:underline' : 'bg-green-900'}`}>
                                {!loading ? 'Initiate Transfer' : (
                                    <div className='flex justify-center'>
                                        <span className='pr-1 text-md'>Sending...</span>
                                        <div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                                            <span class="sr-only"></span>
                                        </div>
                                    </div>
                                )}
                            </button>
                            <button
                                className='justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full text-white bg-green-500 hover:underline'
                                onClick={() => navigate('/dashboard')}>
                                Go to dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendMoney;
