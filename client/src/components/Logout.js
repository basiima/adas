import React from 'react';
import AuthService from '../services/auth.service';
import Login from '../pages/Login';

export default function Logout() {
    AuthService.logout();

    return (
    <Login />
    );
}