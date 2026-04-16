import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <Navbar user={user} setUser={setUser} />
                <Routes>
                    <Route 
                        path="/login" 
                        element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} 
                    />
                    <Route 
                        path="/signup" 
                        element={user ? <Navigate to="/dashboard" /> : <Signup setUser={setUser} />} 
                    />
                    <Route 
                        path="/dashboard" 
                        element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/" 
                        element={<Navigate to={user ? "/dashboard" : "/login"} />} 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;