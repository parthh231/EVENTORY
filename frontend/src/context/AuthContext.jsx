import React, { useEffect, useState } from 'react';
import api from '../utils/axios';

export const AuthContext = React.createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    },[]);

    const login = async (email, password) => {
        try{
            const {data} = await api.post('/auth/login', {email, password});
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            return data;
        }
        catch(err){
            console.error('Login failed', err);
            const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'Login failed';
            // If backend indicates account not verified, surface a needsVerification flag
            if (err.response?.status === 400 && typeof msg === 'string' && /not verified/i.test(msg)) {
                throw { message: msg, needsVerification: true };
            }
            throw msg;
        }
    };

    const register = async (name, email, password) => {
        try{
            const {data} = await api.post('/auth/register', {name, email, password});
            setUser(data);
            return data;
        }
        catch(err){
            console.error("Registration failed:", err);
            const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'Registration failed';
            throw msg;
        }
    };

    const verifyOtp = async (email, otp) => {
        try{
            const {data} = await api.post('/auth/verifyotp', {email, otp});
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            return data;
        }
        catch(err){
            console.error('OTP verification failed:', err);
            const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'OTP verification failed';
            throw msg;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token')
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, verifyOTP: verifyOtp, register }}>
            {children}
        </AuthContext.Provider>
    )
};