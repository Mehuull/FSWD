import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { MOODS } from '../utils/constants';
import './JournalEditor.css';

const JournalEditor = ({ journal, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        mood: ['happy'],
        date: new Date().toISOString().split('T')[0],
        location: '',
        weather: '',
        dayScore: 5,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (journal) {
            setFormData({
                title: journal.title || '',
                content: journal.content || '',
                mood: Array.isArray(journal.mood) ? journal.mood : (journal.mood ? [journal.mood] : ['happy']),
                date: journal.date ? new Date(journal.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                location: journal.location || '',
                weather: journal.weather || '',
                dayScore: journal.dayScore || 5,
            });
        }
    }, [journal]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (journal) {
                await onSave(journal._id, formData);
            } else {
                await onSave(formData);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save journal');
        } finally {
            setLoading(false);
        }
    };

    const wordCount = formData.content.trim().split(/\s+/).filter(Boolean).length;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{journal ? 'Edit Entry' : 'New Journal Entry'}</h2>
                    <button className="btn btn-icon" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="journal-form">
                    {error && <div className="alert alert-error">{error}</div>}

                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Give your entry a title..."
                            required
                            maxLength={200}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">How are you feeling? (Select multiple)</label>
                        <div className="mood-selector">
                            {MOODS.map((mood) => {
                                const isActive = Array.isArray(formData.mood) && formData.mood.includes(mood.value);
                                return (
                                    <button
                                        key={mood.value}
                                        type="button"
                                        className={`mood-option ${isActive ? 'active' : ''}`}
                                        onClick={() => {
                                            const currentMoods = Array.isArray(formData.mood) ? formData.mood : [formData.mood];
                                            const newMoods = isActive
                                                ? currentMoods.filter((m) => m !== mood.value)
                                                : [...currentMoods, mood.value];

                                            if (newMoods.length > 0) {
                                                setFormData({ ...formData, mood: newMoods });
                                            }
                                        }}
                                        style={{
                                            borderColor: isActive ? mood.color : 'transparent',
                                        }}
                                    >
                                        <span className="mood-emoji">{mood.emoji}</span>
                                        <span className="mood-label">{mood.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Where are you right now?"
                            maxLength={100}
                        />
                    </div>

                    <div className="grid-2-col">
                        <div className="form-group">
                            <label className="form-label">Weather</label>
                            <select
                                name="weather"
                                value={formData.weather}
                                onChange={handleChange}
                                className="form-input"
                            >
                                <option value="">None (Optional)</option>
                                <option value="clear">☀️ Clear</option>
                                <option value="sunny">🌞 Sunny</option>
                                <option value="cloudy">☁️ Cloudy</option>
                                <option value="rainy">🌧️ Rainy</option>
                                <option value="snowy">❄️ Snowy</option>
                                <option value="windy">💨 Windy</option>
                                <option value="stormy">⛈️ Stormy</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Day Score (1-10): {formData.dayScore}</label>
                            <input
                                type="range"
                                name="dayScore"
                                min="1"
                                max="10"
                                value={formData.dayScore}
                                onChange={handleChange}
                                className="form-slider"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <div className="flex justify-between items-center mb-sm">
                            <label className="form-label" style={{ marginBottom: 0 }}>
                                Content
                            </label>
                            <span className="word-count-badge">{wordCount} words</span>
                        </div>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="form-textarea"
                            placeholder="Write your thoughts..."
                            required
                            minLength={10}
                            rows={12}
                        />
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                            ) : (
                                <>
                                    <Save size={18} />
                                    {journal ? 'Update' : 'Save'} Entry
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JournalEditor;
