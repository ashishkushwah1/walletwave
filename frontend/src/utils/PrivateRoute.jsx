import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function PrivateRoute({ element: Component }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:3000/api/v1/user/me', {
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
    return isAuthenticated ? Component : <Navigate to="/signin" />;
}

export default PrivateRoute;
