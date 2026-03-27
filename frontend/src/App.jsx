import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
    const { isAuthenticated, user, loading } = useAuth();
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('darkMode') === 'true'
    );

    useEffect(() => {
        // Set theme attributes
        document.documentElement.setAttribute(
            'data-theme',
            darkMode ? 'dark' : 'light'
        );
        document.documentElement.setAttribute(
            'data-gender',
            user?.gender || 'other'
        );
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode, user]);

    if (loading) {
        return (
            <div className="flex items-center justify-center" style={{ minHeight: '100vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="app">
            <Routes>
                <Route
                    path="/auth"
                    element={
                        isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />
                    }
                />
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <DashboardPage darkMode={darkMode} setDarkMode={setDarkMode} />
                        ) : (
                            <Navigate to="/auth" replace />
                        )
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default App;
