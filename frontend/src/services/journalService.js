import api from './api';

// Auth Services
export const authService = {
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('darkMode');
    },

    getMe: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    updateProfile: async (userData) => {
        const response = await api.put('/auth/profile', userData);
        return response.data;
    },

    changePassword: async (passwords) => {
        const response = await api.put('/auth/change-password', passwords);
        return response.data;
    },
};

// Journal Services
export const journalService = {
    getAll: async (params = {}) => {
        const response = await api.get('/journal', { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/journal/${id}`);
        return response.data;
    },

    create: async (journalData) => {
        const response = await api.post('/journal', journalData);
        return response.data;
    },

    update: async (id, journalData) => {
        const response = await api.put(`/journal/${id}`, journalData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/journal/${id}`);
        return response.data;
    },

    getStats: async () => {
        const response = await api.get('/journal/stats/summary');
        return response.data;
    },

    toggleFavorite: async (id) => {
        const response = await api.patch(`/journal/${id}/favorite`);
        return response.data;
    },
};
