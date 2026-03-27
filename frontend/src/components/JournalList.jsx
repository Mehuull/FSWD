import { Edit2, Trash2, Calendar, MapPin, CloudSun, Target } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import { getMoodEmoji, getMoodColor } from '../utils/constants';
import './JournalList.css';

const JournalList = ({ journals, onEdit, onDelete }) => {
    if (journals.length === 0) {
        return (
            <div className="empty-state">
                <h3>No journal entries yet</h3>
                <p>Start writing your first entry to track your thoughts and moods!</p>
            </div>
        );
    }

    const getWeatherEmoji = (weather) => {
        const emojis = {
            sunny: '🌞', cloudy: '☁️', rainy: '🌧️', snowy: '❄️',
            windy: '💨', stormy: '⛈️', clear: '☀️'
        };
        return emojis[weather] || '';
    };

    return (
        <div className="journal-list">
            {journals.map((journal) => (
                <div key={journal._id} className="journal-card fade-in">
                    <div className="journal-card-header">
                        <div className="journal-mood" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {(Array.isArray(journal.mood) ? journal.mood : [journal.mood]).map((m, idx) => (
                                <div key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                    <span className="mood-emoji" style={{ fontSize: '1.5rem' }}>
                                        {getMoodEmoji(m)}
                                    </span>
                                    <span
                                        className="mood-badge"
                                        style={{ backgroundColor: getMoodColor(m) }}
                                    >
                                        {m}
                                    </span>
                                </div>
                            ))}
                            {journal.dayScore && (
                                <span className="mood-badge" style={{ backgroundColor: '#10b981', color: '#fff' }}>
                                    <Target size={12} style={{ display: 'inline', marginRight: '4px' }} />
                                    {journal.dayScore}/10
                                </span>
                            )}
                        </div>
                        <div className="journal-date">
                            <Calendar size={16} />
                            {formatDate(journal.date)}
                        </div>
                    </div>

                    <h3 className="journal-title">{journal.title}</h3>

                    {(journal.location || journal.weather) && (
                        <div className="journal-meta" style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
                            {journal.location && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <MapPin size={14} /> {journal.location}
                                </span>
                            )}
                            {journal.weather && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {getWeatherEmoji(journal.weather)} {journal.weather}
                                </span>
                            )}
                        </div>
                    )}

                    <p className="journal-content">
                        {journal.content.length > 200
                            ? `${journal.content.substring(0, 200)}...`
                            : journal.content}
                    </p>

                    <div className="journal-card-footer">
                        <span className="word-count">{journal.wordCount} words</span>
                        <div className="journal-actions">
                            <button
                                className="btn btn-sm btn-secondary"
                                onClick={() => onEdit(journal)}
                            >
                                <Edit2 size={16} />
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => onDelete(journal._id)}
                            >
                                <Trash2 size={16} />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JournalList;
