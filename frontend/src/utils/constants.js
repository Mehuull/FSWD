export const MOODS = [
    { value: 'happy', label: 'Happy', emoji: '😊', color: '#FFD700' },
    { value: 'sad', label: 'Sad', emoji: '😢', color: '#4682B4' },
    { value: 'angry', label: 'Angry', emoji: '😠', color: '#DC143C' },
    { value: 'stressed', label: 'Stressed', emoji: '😰', color: '#FF6347' },
    { value: 'calm', label: 'Calm', emoji: '😌', color: '#87CEEB' },
    { value: 'motivated', label: 'Motivated', emoji: '💪', color: '#32CD32' },
    { value: 'tired', label: 'Tired', emoji: '😴', color: '#9370DB' },
    { value: 'grateful', label: 'Grateful', emoji: '🙏', color: '#FF69B4' },
    { value: 'anxious', label: 'Anxious', emoji: '😟', color: '#FFA500' },
    { value: 'peaceful', label: 'Peaceful', emoji: '☮️', color: '#98FB98' },
    { value: 'excited', label: 'Excited', emoji: '🤩', color: '#FF8C00' },
    { value: 'bored', label: 'Bored', emoji: '🥱', color: '#A9A9A9' },
    { value: 'confused', label: 'Confused', emoji: '😕', color: '#DDA0DD' },
    { value: 'proud', label: 'Proud', emoji: '😎', color: '#FFD700' },
    { value: 'lonely', label: 'Lonely', emoji: '😔', color: '#708090' },
    { value: 'hopeful', label: 'Hopeful', emoji: '✨', color: '#00FA9A' },
    { value: 'overwhelmed', label: 'Overwhelmed', emoji: '🤯', color: '#CD5C5C' },
    { value: 'content', label: 'Content', emoji: '🥰', color: '#FFB6C1' },
];
export const GENDER_THEMES = {
    male: {
        primary: '#1e3a5f',
        secondary: '#2980b9',
        accent: '#3498db',
    },
    female: {
        primary: '#d63384',
        secondary: '#e91e63',
        accent: '#f06292',
    },
    other: {
        primary: '#6c5ce7',
        secondary: '#a29bfe',
        accent: '#b19cd9',
    },
};

export const getMoodColor = (mood) => {
    const moodObj = MOODS.find((m) => m.value === mood);
    return moodObj ? moodObj.color : '#808080';
};

export const getMoodEmoji = (mood) => {
    const moodObj = MOODS.find((m) => m.value === mood);
    return moodObj ? moodObj.emoji : '😐';
};

export const getMoodLabel = (mood) => {
    const moodObj = MOODS.find((m) => m.value === mood);
    return moodObj ? moodObj.label : mood;
};
