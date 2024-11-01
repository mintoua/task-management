import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('/logout');
            localStorage.removeItem('token');  // Supprime le token
            navigate('/login');  // Redirige vers la page de connexion
        } catch (error) {
            console.error("Erreur de déconnexion", error);
        }
    };

    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <Link to="/tasks" className="font-bold text-lg">Task Manager Dashboard</Link>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Déconnexion</button>
        </nav>
    );
}

export default Navbar;
