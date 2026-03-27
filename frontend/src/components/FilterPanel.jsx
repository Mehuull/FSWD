import { Search, Filter } from 'lucide-react';
import { MOODS } from '../utils/constants';
import './FilterPanel.css';

const FilterPanel = ({ filters, setFilters }) => {
    const handleFilterChange = (key, value) => {
        setFilters({
            ...filters,
            [key]: value,
        });
    };

    const clearFilters = () => {
        setFilters({
            mood: '',
            search: '',
            startDate: '',
            endDate: '',
        });
    };

    const hasActiveFilters =
        filters.mood || filters.search || filters.startDate || filters.endDate;

    return (
        <div className="filter-panel">
            <div className="filter-header">
                <h3>
                    <Filter size={20} />
                    Filters
                </h3>
                {hasActiveFilters && (
                    <button className="btn-link" onClick={clearFilters}>
                        Clear All
                    </button>
                )}
            </div>

            <div className="filter-group">
                <label className="filter-label">
                    <Search size={16} />
                    Search
                </label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Search entries..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                />
            </div>

            <div className="filter-group">
                <label className="filter-label">Mood</label>
                <select
                    className="form-select"
                    value={filters.mood}
                    onChange={(e) => handleFilterChange('mood', e.target.value)}
                >
                    <option value="">All Moods</option>
                    {MOODS.map((mood) => (
                        <option key={mood.value} value={mood.value}>
                            {mood.emoji} {mood.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label className="filter-label">Date Range</label>
                <input
                    type="date"
                    className="form-input"
                    placeholder="Start Date"
                    value={filters.startDate}
                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                />
                <input
                    type="date"
                    className="form-input"
                    placeholder="End Date"
                    value={filters.endDate}
                    onChange={(e) => handleFilterChange('endDate', e.target.value)}
                />
            </div>
        </div>
    );
};

export default FilterPanel;
