import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { journalService } from '../services/journalService';
import Header from '../components/Header';
import JournalList from '../components/JournalList';
import JournalEditor from '../components/JournalEditor';
import StatsPanel from '../components/StatsPanel';
import FilterPanel from '../components/FilterPanel';
import AllEntriesArchive from '../components/AllEntriesArchive';
import { PlusCircle, Calendar as CalendarIcon } from 'lucide-react';
import './DashboardPage.css';

const DashboardPage = ({ darkMode, setDarkMode }) => {
    const { user } = useAuth();
    const [journals, setJournals] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEditor, setShowEditor] = useState(false);
    const [editingJournal, setEditingJournal] = useState(null);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'archive'
    const [filters, setFilters] = useState({
        mood: '',
        search: '',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        fetchJournals();
        fetchStats();
    }, [filters, viewMode]);

    const fetchJournals = async () => {
        try {
            setLoading(true);
            const data = await journalService.getAll({
                ...filters,
                limit: viewMode === 'archive' ? 1000 : 10
            });
            setJournals(data.journals || []);
        } catch (error) {
            console.error('Error fetching journals:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const data = await journalService.getStats();
            setStats(data.stats);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleCreateJournal = async (journalData) => {
        try {
            await journalService.create(journalData);
            setShowEditor(false);
            fetchJournals();
            fetchStats();
        } catch (error) {
            console.error('Error creating journal:', error);
            throw error;
        }
    };

    const handleUpdateJournal = async (id, journalData) => {
        try {
            await journalService.update(id, journalData);
            setShowEditor(false);
            setEditingJournal(null);
            fetchJournals();
            fetchStats();
        } catch (error) {
            console.error('Error updating journal:', error);
            throw error;
        }
    };

    const handleDeleteJournal = async (id) => {
        if (window.confirm('Are you sure you want to delete this journal entry?')) {
            try {
                await journalService.delete(id);
                fetchJournals();
                fetchStats();
            } catch (error) {
                console.error('Error deleting journal:', error);
            }
        }
    };

    const handleEdit = (journal) => {
        setEditingJournal(journal);
        setShowEditor(true);
    };

    const handleCloseEditor = () => {
        setShowEditor(false);
        setEditingJournal(null);
    };

    return (
        <div className="dashboard">
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />

            <div className="dashboard-container">
                <aside className="dashboard-sidebar">
                    <StatsPanel stats={stats} />
                    <FilterPanel filters={filters} setFilters={setFilters} />
                </aside>

                <main className="dashboard-main">
                    <div className="dashboard-header">
                        <div>
                            <h1>Welcome back, {user?.username}! 👋</h1>
                            <p className="text-secondary">
                                {journals.length > 0
                                    ? `You have ${journals.length} journal ${journals.length === 1 ? 'entry' : 'entries'}`
                                    : 'Start writing your first journal entry'}
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowEditor(true)}
                            >
                                <PlusCircle size={20} />
                                New Entry
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setViewMode(viewMode === 'list' ? 'archive' : 'list')}
                            >
                                <CalendarIcon size={20} />
                                {viewMode === 'list' ? 'Your All Entries' : 'Back to List'}
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-xl">
                            <div className="spinner"></div>
                        </div>
                    ) : viewMode === 'list' ? (
                        <JournalList
                            journals={journals}
                            onEdit={handleEdit}
                            onDelete={handleDeleteJournal}
                        />
                    ) : (
                        <AllEntriesArchive
                            journals={journals}
                            onEdit={handleEdit}
                            onDelete={handleDeleteJournal}
                        />
                    )}
                </main>
            </div>

            {showEditor && (
                <JournalEditor
                    journal={editingJournal}
                    onSave={editingJournal ? handleUpdateJournal : handleCreateJournal}
                    onClose={handleCloseEditor}
                />
            )}
        </div>
    );
};

export default DashboardPage;
