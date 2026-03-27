import React, { useState, useMemo } from 'react';
import { Calendar, Eye, Edit2, Trash2, ArrowLeft, X } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import { getMoodEmoji, getMoodColor } from '../utils/constants';
import './AllEntriesArchive.css';

const AllEntriesArchive = ({ journals, onEdit, onDelete }) => {
    const years = useMemo(() => {
        if (!journals || journals.length === 0) return [new Date().getFullYear()];
        const allYears = journals.map(j => {
            const d = new Date(j.date);
            return isNaN(d.getFullYear()) ? new Date().getFullYear() : d.getFullYear();
        });
        const validYears = [...new Set(allYears)].filter(y => y).sort((a, b) => b - a);
        return validYears.length > 0 ? validYears : [new Date().getFullYear()];
    }, [journals]);

    const [selectedYear, setSelectedYear] = useState(years[0]);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [viewingJournal, setViewingJournal] = useState(null);

    // Specifically handle when journals are loaded asynchronously
    React.useEffect(() => {
        // If the selected year is no longer in the list of valid years, reset it
        if (years.length > 0 && (!selectedYear || !years.includes(Number(selectedYear)))) {
            setSelectedYear(years[0]);
        }
    }, [years, selectedYear]);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const getEntriesForMonth = (monthIndex) => {
        return journals.filter(j => {
            const d = new Date(j.date);
            if (isNaN(d.getFullYear())) return false;
            return d.getFullYear() === Number(selectedYear) && d.getMonth() === monthIndex;
        }).sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    if (viewingJournal) {
        return (
            <div className="archive-view-modal">
                <div className="archive-header">
                    <button className="btn btn-secondary" onClick={() => setViewingJournal(null)}>
                        <ArrowLeft size={16} /> Back to Entries
                    </button>
                </div>
                <div className="full-entry-card fade-in">
                    <div className="entry-header">
                        <h2>{viewingJournal.title}</h2>
                        <div className="entry-meta">
                            <span className="date"><Calendar size={16} /> {formatDate(viewingJournal.date)}</span>
                        </div>
                    </div>

                    <div className="entry-moods">
                        {(Array.isArray(viewingJournal.mood) ? viewingJournal.mood : [viewingJournal.mood]).map((m, idx) => (
                            <span key={idx} className="mood-badge" style={{ backgroundColor: getMoodColor(m) }}>
                                {getMoodEmoji(m)} {m}
                            </span>
                        ))}
                        {viewingJournal.dayScore && (
                            <span className="mood-badge" style={{ backgroundColor: '#10b981', color: '#fff' }}>
                                Score: {viewingJournal.dayScore}/10
                            </span>
                        )}
                        {viewingJournal.location && (
                            <span className="mood-badge" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                                📍 {viewingJournal.location}
                            </span>
                        )}
                    </div>

                    <div className="entry-content">
                        {viewingJournal.content}
                    </div>
                </div>
            </div>
        );
    }

    if (selectedMonth !== null) {
        const monthEntries = getEntriesForMonth(selectedMonth);
        return (
            <div className="archive-entries-view fade-in">
                <div className="archive-header">
                    <button className="btn btn-secondary" onClick={() => setSelectedMonth(null)}>
                        <ArrowLeft size={16} /> Back to Months
                    </button>
                    <h2>{months[selectedMonth]} {selectedYear}</h2>
                </div>
                {monthEntries.length === 0 ? (
                    <div className="empty-state">No entries in this month.</div>
                ) : (
                    <div className="entries-grid">
                        {monthEntries.map(journal => (
                            <div key={journal._id} className="entry-card">
                                <div className="entry-card-header">
                                    <h3>{journal.title}</h3>
                                    <span className="date"><Calendar size={14} /> {new Date(journal.date).getDate()} {months[selectedMonth].substring(0, 3)}</span>
                                </div>
                                <p className="preview">{journal.content.substring(0, 100)}{journal.content.length > 100 ? '...' : ''}</p>
                                <div className="actions">
                                    <button className="btn btn-sm btn-primary" onClick={() => setViewingJournal(journal)}>
                                        <Eye size={14} /> View
                                    </button>
                                    <button className="btn btn-sm btn-secondary" onClick={() => onEdit(journal)}>
                                        <Edit2 size={14} /> Edit
                                    </button>
                                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(journal._id)}>
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="archive-container fade-in">
            <div className="archive-controls">
                <h3>Filter by Year</h3>
                <div className="year-filters">
                    {years.map(year => (
                        <button
                            key={year}
                            className={`year-btn ${Number(selectedYear) === year ? 'active' : ''}`}
                            onClick={() => setSelectedYear(year)}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>

            <div className="months-grid">
                {months.map((month, index) => {
                    const count = getEntriesForMonth(index).length;
                    return (
                        <div
                            key={month}
                            className={`month-block ${count > 0 ? 'has-entries' : 'empty'}`}
                            onClick={() => count > 0 && setSelectedMonth(index)}
                        >
                            <h3>{month}</h3>
                            <span className="count-badge">{count} {count === 1 ? 'Entry' : 'Entries'}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AllEntriesArchive;
