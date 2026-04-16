import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/api';
import { hashPassword } from '../utils/passwordUtils';

const Login = ({ setUser }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Hash password before sending
            const hashedPassword = hashPassword(formData.password);
            
            console.log('Login attempt for:', formData.email);
            console.log('Password hashed successfully');
            
            const response = await authService.login({
                email: formData.email,
                password: hashedPassword
            });
            
            const { token, user } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Login</h2>
                {error && <div style={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={styles.passwordContainer}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                style={styles.passwordInput}
                                required
                                autoComplete="current-password"
                                placeholder="Enter password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={styles.showPasswordBtn}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        style={{...styles.button, opacity: loading ? 0.7 : 1}}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p style={styles.text}>
                    Don't have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundColor: '#f5f5f5'
    },
    formContainer: {
        width: '100%',
        maxWidth: '400px',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        backgroundColor: 'white'
    },
    title: {
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#333',
        fontSize: '2rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    label: {
        fontWeight: '600',
        color: '#555',
        fontSize: '0.9rem'
    },
    input: {
        padding: '0.75rem',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        transition: 'border-color 0.3s',
        outline: 'none',
        ':focus': {
            borderColor: '#4CAF50'
        }
    },
    passwordContainer: {
        display: 'flex',
        gap: '0.5rem'
    },
    passwordInput: {
        flex: 1,
        padding: '0.75rem',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        outline: 'none'
    },
    showPasswordBtn: {
        padding: '0.75rem',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        ':hover': {
            backgroundColor: '#e0e0e0'
        }
    },
    button: {
        padding: '0.75rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '1rem',
        transition: 'background-color 0.3s',
        ':hover': {
            backgroundColor: '#45a049'
        }
    },
    error: {
        backgroundColor: '#ffebee',
        color: '#c62828',
        padding: '0.75rem',
        borderRadius: '4px',
        marginBottom: '1rem',
        textAlign: 'center',
        fontSize: '0.9rem'
    },
    text: {
        textAlign: 'center',
        marginTop: '1rem',
        color: '#666'
    },
    link: {
        color: '#4CAF50',
        textDecoration: 'none',
        fontWeight: '600',
        ':hover': {
            textDecoration: 'underline'
        }
    }
};

export default Login;