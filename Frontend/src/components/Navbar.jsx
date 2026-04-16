import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.container}>
                <Link to="/" style={styles.logo}>
                    Auth App
                </Link>
                <div style={styles.links}>
                    {user ? (
                        <>
                            <span style={styles.welcome}>Welcome, {user.name}</span>
                            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
                            <button onClick={handleLogout} style={styles.logoutBtn}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* <Link to="/login" style={styles.link}>Login</Link>
                            <Link to="/signup" style={styles.link}>Signup</Link> */}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: '#333',
        padding: '1rem',
        color: 'white'
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    logo: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },
    links: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        padding: '0.5rem'
    },
    welcome: {
        color: '#4CAF50',
        marginRight: '1rem'
    },
    logoutBtn: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default Navbar;