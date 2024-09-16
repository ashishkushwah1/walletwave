import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const usersPerPage = 10;
    axios.defaults.withCredentials = true;
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage); // Update the page
        }
    };
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // Make the API call only after the timeout
            setIsLoading(true);
            axios.get(`https://walletwave-peach.vercel.app/api/v1/user/bulk?filter=${filter}&page=${currentPage}&limit=${usersPerPage}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                setUsers(response.data.user);
                setTotalPages(Math.ceil(response.data.totalUsers/usersPerPage));
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
        }, 500);

        // Cleanup the timeout if the filter changes before the delay
        return () => clearTimeout(timeoutId);
    }, [filter,currentPage]);

    return (
        <div className="flex flex-col justify-center">
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input
                    type="text"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    placeholder="Search Users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div>
                {isLoading ? <div>Loading...</div> : null}
                {!isLoading && users.length !== 0 ? (
                    users.map(user => <User user={user} key={user._id} />)
                ) : (
                    !isLoading && <div>No users matched with filter</div>
                )}
            </div>
            <div className="flex justify-center mt-4 space-x-4 w-40 m-auto">
                <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className={`w-full text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${currentPage===1?'bg-gray-400':'bg-gray-800 hover:bg-gray-900 cursor-pointer'}`} 
                >Previos</button>
                <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className={`w-full text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${currentPage===totalPages?'bg-gray-400':'bg-gray-800 hover:bg-gray-900 cursor-pointer'}`} 
                >Next</button>
                
            </div>
        </div>
    );
}

function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>{user.firstName} {user.lastName}</div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-full">
                <Button
                    onClick={() => {
                        navigate("/send?id=" + user._id + "&name=" + user.firstName);
                    }}
                    label={"Send Money"}
                />
            </div>
        </div>
    );
}
