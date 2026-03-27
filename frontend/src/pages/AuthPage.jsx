import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, UserCircle } from 'lucide-react';
import './AuthPage.css';

const AuthPage = () => {
    const { login, register } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        gender: 'other',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
        setSuccessMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            if (isLogin) {
                // Login - this will automatically redirect to dashboard via AuthContext
                await login({
                    email: formData.email,
                    password: formData.password,
                });
                // No need to clear form on successful login as user will be redirected
            } else {
                // Register - show success and switch to login
                await register(formData);

                // After successful registration, switch to login mode
                setSuccessMessage('Account created successfully! Please sign in to continue.');
                setIsLogin(true);

                // Clear only username and gender, keep email for convenience
                setFormData({
                    username: '',
                    email: formData.email, // Keep email for easy login
                    password: '',
                    gender: 'other',
                });
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                'An error occurred. Please try again.'
            );
            // DON'T clear form on error - keep user's input
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="auth-title">Daily Journal</h1>
                        <p className="auth-subtitle">
                            {isLogin
                                ? 'Welcome back! Sign in to continue'
                                : 'Create an account to start journaling'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && <div className="alert alert-error">{error}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}

                        {!isLogin && (
                            <div className="form-group">
                                <label className="form-label">
                                    <User size={18} />
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Enter your username"
                                    required={!isLogin}
                                    minLength={3}
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">
                                <Mail size={18} />
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <Lock size={18} />
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter your password"
                                required
                                minLength={6}
                            />
                        </div>

                        {!isLogin && (
                            <div className="form-group">
                                <label className="form-label">
                                    <UserCircle size={18} />
                                    Gender
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="form-select"
                                    required={!isLogin}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <p className="form-help">
                                    This helps personalize your journal theme
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            disabled={loading}
                            style={{ width: '100%' }}
                        >
                            {loading ? (
                                <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                            ) : isLogin ? (
                                'Sign In'
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            {isLogin ? "Don't have an account?" : 'Already have an account?'}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError('');
                                    setSuccessMessage('');
                                }}
                                className="auth-toggle"
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>

                <div className="auth-features">
                    <h3>Why Daily Journal?</h3>
                    <ul>
                        <li> Track your daily thoughts and reflections</li>
                        <li> Monitor your moods and emotions</li>
                        <li> View insightful statistics</li>
                        <li> Personalized themes based on your preferences</li>
                        <li> Dark mode support</li>
                        <li> Secure and private</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
