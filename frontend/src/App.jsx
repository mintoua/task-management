import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    Outlet,
    RouterProvider,
    createBrowserRouter
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskBoard from './pages/TaskBoard';
import PrivateRoute from './components/PrivateRoute';
import { useSelector } from "react-redux";

function App() {
    const isAuthenticated = !!localStorage.getItem('token'); // Vérifie si l'utilisateur est connecté

    const Layout =  () => {
        return(
            <>
                <div>
                    <Navbar/>
                </div>
                <div>
                    <Outlet/>
                </div>
            </>
        );
    }
    const router = createBrowserRouter([
        { path: "/", exact: true, element:  isAuthenticated ?   <Navigate to="/tasks" /> : <Navigate to="/login" />},
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },

        {
            path: "/tasks",
            element: isAuthenticated ?  <Layout /> : <Navigate to="/login" />,
            children: [
                {
                    path: "/tasks",
                    element: <TaskBoard />
                },
            ]
        },
    ])

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
/*    return (
        <Router>
            <Navbar />
            <Routes>
                {/!* Route de connexion *!/}
                <Route path="/login" element={<Login />} />

                {/!* Route d'inscription *!/}
                <Route path="/register" element={<Register />} />

                {/!* Tableau de bord protégé *!/}
                <Route
                    path="/tasks"
                    element={
                        <PrivateRoute>
                            <TaskBoard />
                        </PrivateRoute>
                    }
                />

                {/!* Route par défaut - Redirection vers /login si l'utilisateur n'est pas connecté *!/}
                <Route
                    path="*"
                    element={isAuthenticated ? <Navigate to="/tasks" /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );*/
}

export default App;
