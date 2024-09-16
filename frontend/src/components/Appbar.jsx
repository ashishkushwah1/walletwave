import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigate = useNavigate();
    const [dropDownOpen, setDropDownOpen] = useState(false);
    function handleLogout(){
        localStorage.removeItem("token");
        navigate('/signin');
    }
    function handleProfileChange(){
        navigate('/changeprofile');
    }
    function toggleDropdown(){
        setDropDownOpen(!dropDownOpen);
    }
    return <div className="shadow h-16 flex justify-between">
        <div className="flex flex-col font-bold text-lg justify-center h-full ml-4 mt-1 cursor-pointer hover:underline hover:text-blue-400">
            WalletWave
        </div>
        <div className="flex mr-2 mt-2">
            <div className="flex flex-col font-semibold justify-center h-full mr-4">
                Hello!
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mr-2 cursor-pointer">
                <div className="flex flex-col justify-center h-full text-xl" onClick={toggleDropdown}>
                    U
                </div>
                {dropDownOpen && (
                    <div className="absolute right-0 mt-12 w-32 bg-white border rounded-lg shadow-lg">
                        <button 
                            onClick={handleLogout} 
                            className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                        >
                            Log out
                        </button>
                        <button 
                            onClick={handleProfileChange} 
                            className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                        >
                            Edit profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
}