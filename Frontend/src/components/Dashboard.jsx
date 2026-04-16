import React, { useState, useEffect } from 'react';
import { authService } from '../../services/api';

const Dashboard = ({ user }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); // Fixed: Added closing quote

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await authService.getProfile();
            setProfile(response.data.user);
        } catch (err) {
            setError('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div style={styles.loading}>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Dashboard</h2>
                {error && <div style={styles.error}>{error}</div>}
                
                <div style={styles.info}>
                    <h3>Welcome, {user?.name}!</h3>
                    <p><strong>Email:</strong> {user?.email}</p>
                    {profile && (
                        <p><strong>Member since:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
                    )}
                </div>

                <div style={styles.success}>
                    ✅ You are successfully logged in!
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh'
    },
    card: {
        width: '100%',
        maxWidth: '500px',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        backgroundColor: 'white'
    },
    title: {
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#333'
    },
    info: {
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px'
    },
    success: {
        padding: '1rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        borderRadius: '4px',
        textAlign: 'center'
    },
    loading: {
        textAlign: 'center',
        marginTop: '2rem',
        fontSize: '1.2rem',
        color: '#666'
    },
    error: {
        backgroundColor: '#ffebee',
        color: '#c62828',
        padding: '0.75rem',
        borderRadius: '4px',
        marginBottom: '1rem',
        textAlign: 'center'
    }
};

export default Dashboard;