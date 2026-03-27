import { BarChart3, FileText, PenTool } from 'lucide-react';
import { getMoodColor } from '../utils/constants';
import './StatsPanel.css';

const StatsPanel = ({ stats }) => {
    if (!stats) {
        return (
            <div className="stats-panel">
                <h3>Statistics</h3>
                <div className="flex justify-center p-lg">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    const { totalEntries, totalWords, moodBreakdown } = stats;

    return (
        <div className="stats-panel">
            <h3>
                <BarChart3 size={20} />
                Statistics
            </h3>

            <div className="stats-grid">
                <div className="stat-card">
                    <FileText size={24} className="stat-icon" />
                    <div>
                        <div className="stat-value">{totalEntries}</div>
                        <div className="stat-label">Total Entries</div>
                    </div>
                </div>

                <div className="stat-card">
                    <PenTool size={24} className="stat-icon" />
                    <div>
                        <div className="stat-value">{totalWords.toLocaleString()}</div>
                        <div className="stat-label">Total Words</div>
                    </div>
                </div>
            </div>

            {Object.keys(moodBreakdown).length > 0 && (
                <div className="mood-stats">
                    <h4>Mood Breakdown</h4>
                    {Object.entries(moodBreakdown)
                        .sort(([, a], [, b]) => b - a)
                        .map(([mood, count]) => (
                            <div key={mood} className="mood-stat-item">
                                <div className="mood-stat-label">
                                    <span
                                        className="mood-dot"
                                        style={{ backgroundColor: getMoodColor(mood) }}
                                    ></span>
                                    <span className="capitalize">{mood}</span>
                                </div>
                                <div className="mood-stat-bar">
                                    <div
                                        className="mood-stat-fill"
                                        style={{
                                            width: `${(count / totalEntries) * 100}%`,
                                            backgroundColor: getMoodColor(mood),
                                        }}
                                    ></div>
                                </div>
                                <span className="mood-stat-count">{count}</span>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default StatsPanel;
