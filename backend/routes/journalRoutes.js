import express from 'express';
import {
    getJournals,
    getJournalById,
    createJournal,
    updateJournal,
    deleteJournal,
    getStats,
    toggleFavorite,
} from '../controllers/journalController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(authenticateToken);

// Journal CRUD
router.route('/').get(getJournals).post(createJournal);

router.route('/:id').get(getJournalById).put(updateJournal).delete(deleteJournal);

// Additional routes
router.get('/stats/summary', getStats);
router.patch('/:id/favorite', toggleFavorite);

export default router;
