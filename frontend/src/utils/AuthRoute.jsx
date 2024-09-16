import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AuthRoute({ element: Component }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get("https://walletwave-peach.vercel.app/api/v1/user/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setIsAuthenticated(true);
            }).catch(() => {
                setIsAuthenticated(false);
            });
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    if (isAuthenticated === null) return <div>Loading...</div>;
    return isAuthenticated ? <Navigate to="/dashboard" /> : Component;
}

export default AuthRoute;
