import { useAuth } from '../context/AuthContext';
import { Moon, Sun, LogOut, BookOpen } from 'lucide-react';
import './Header.css';

const Header = ({ darkMode, setDarkMode }) => {
    const { user, logout } = useAuth();

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo">
                    <BookOpen size={28} />
                    <span>Daily Journal</span>
                </div>

                <div className="header-actions">
                    <button
                        className="btn btn-icon"
                        onClick={() => setDarkMode(!darkMode)}
                        title={darkMode ? 'Light Mode' : 'Dark Mode'}
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <div className="header-user">
                        <div className="user-avatar">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <span className="user-name">{user?.username}</span>
                    </div>

                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={logout}
                        title="Logout"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
