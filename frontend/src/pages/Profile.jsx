import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const updateProfile = async () => {
        setLoading(true);
        try {
            await axios.put("https://walletwave-peach.vercel.app/api/v1/user", {
                password,
                firstName,
                lastName
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setSuccessMessage(`Updated your profile`);
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (e) {
            console.error("Error during update:", e);
        }
        setPassword('');
        setFirstName('');
        setLastName('');
        setLoading(false);
    }

    return (
        <div className='flex justify-center h-screen bg-gray-100'>
            <div className='h-full flex flex-col justify-center'>
                <div className='border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg'>
                    <div className="flex flex-col space-y-1.5 p-6" style={{ marginTop: '0px' }}> {/* Override margin here */}
                        <h2 className="text-3xl font-bold text-center">Update Profile</h2>
                    </div>
                    <div className='p-6' style={{ marginTop: '0px' }}> {/* Set marginTop to 0 to ensure no margin */}
                        <div className='space-y-4'>
                            <div className='space-y-2'>
                                <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70' htmlFor='amount'>
                                    New Password
                                </label>
                                <input
                                    type='text'
                                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                                    id='amount'
                                    placeholder='Enter new Password'
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                                <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70' htmlFor='amount'>
                                    First Name
                                </label>
                                <input
                                    type='text'
                                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                                    id='amount'
                                    placeholder='Enter First Name'
                                    value={firstName}
                                    onChange={(e)=>setFirstName(e.target.value)}
                                />
                                <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70' htmlFor='amount'>
                                    Last Name
                                </label>
                                <input
                                    type='text'
                                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                                    id='amount'
                                    placeholder='Enter Last Name'
                                    value={lastName}
                                    onChange={(e)=>setLastName(e.target.value)}
                                />
                                {successMessage && <div className='text-green-600'>{successMessage}</div>}
                            </div>
                            <button
                                disabled={password.length==0 || firstName.length==0  || lastName.length==0 || loading}
                                onClick={updateProfile}
                                className={`justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full text-white ${(firstName.length > 0 && lastName.length>0 && password.length>6 && !loading) ? 'bg-green-500 hover:underline' : 'bg-green-900'}`}>
                                {!loading ? 'Update Profile' : (
                                    <div className='flex justify-center'>
                                        <span className='pr-1 text-md'>updating...</span>
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

export default Profile;
