import Journal from '../models/Journal.js';

// @desc    Get all journal entries for logged-in user
// @route   GET /api/journal
// @access  Private
export const getJournals = async (req, res, next) => {
    try {
        const { mood, startDate, endDate, search, isFavorite, page = 1, limit = 10 } = req.query;

        // Build filter
        const filter = { userId: req.userId };

        if (mood) filter.mood = mood;
        if (isFavorite) filter.isFavorite = isFavorite === 'true';

        // Date range filter
        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }

        // Search in title and content
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
            ];
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Execute query
        const journals = await Journal.find(filter)
            .sort({ date: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination
        const total = await Journal.countDocuments(filter);

        res.json({
            success: true,
            count: journals.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            journals,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single journal entry
// @route   GET /api/journal/:id
// @access  Private
export const getJournalById = async (req, res, next) => {
    try {
        const journal = await Journal.findById(req.params.id);

        if (!journal) {
            return res.status(404).json({
                success: false,
                message: 'Journal entry not found',
            });
        }

        // Check if journal belongs to user
        if (journal.userId.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this journal',
            });
        }

        res.json({
            success: true,
            journal,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new journal entry
// @route   POST /api/journal
// @access  Private
export const createJournal = async (req, res, next) => {
    try {
        const { title, content, mood, date, tags, isFavorite, isPrivate, location, weather, dayScore } = req.body;

        // Validate required fields
        if (!title || !content || !mood || (Array.isArray(mood) && mood.length === 0)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide title, content, and at least one mood',
            });
        }

        const journalData = {
            userId: req.userId,
            title,
            content,
            mood,
            date: date ? new Date(date) : new Date(),
            tags: tags || [],
            isFavorite: isFavorite || false,
            isPrivate: isPrivate !== undefined ? isPrivate : true,
            location: location || '',
        };
        if (weather) journalData.weather = weather;
        if (dayScore) journalData.dayScore = dayScore;

        // Create journal
        const journal = await Journal.create(journalData);

        res.status(201).json({
            success: true,
            message: 'Journal entry created successfully',
            journal,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update journal entry
// @route   PUT /api/journal/:id
// @access  Private
export const updateJournal = async (req, res, next) => {
    try {
        const journal = await Journal.findById(req.params.id);

        if (!journal) {
            return res.status(404).json({
                success: false,
                message: 'Journal entry not found',
            });
        }

        // Check if journal belongs to user
        if (journal.userId.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this journal',
            });
        }

        // Update fields
        const { title, content, mood, date, tags, isFavorite, isPrivate, location, weather, dayScore } = req.body;

        if (title !== undefined) journal.title = title;
        if (content !== undefined) journal.content = content;
        if (mood !== undefined) journal.mood = mood;
        if (date !== undefined) journal.date = new Date(date);
        if (tags !== undefined) journal.tags = tags;
        if (isFavorite !== undefined) journal.isFavorite = isFavorite;
        if (isPrivate !== undefined) journal.isPrivate = isPrivate;
        if (location !== undefined) journal.location = location;
        if (weather !== undefined) {
            weather ? (journal.weather = weather) : (journal.weather = undefined);
        }
        if (dayScore !== undefined) {
            dayScore ? (journal.dayScore = dayScore) : (journal.dayScore = undefined);
        }

        await journal.save();

        res.json({
            success: true,
            message: 'Journal entry updated successfully',
            journal,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete journal entry
// @route   DELETE /api/journal/:id
// @access  Private
export const deleteJournal = async (req, res, next) => {
    try {
        const journal = await Journal.findById(req.params.id);

        if (!journal) {
            return res.status(404).json({
                success: false,
                message: 'Journal entry not found',
            });
        }

        // Check if journal belongs to user
        if (journal.userId.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this journal',
            });
        }

        await Journal.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Journal entry deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user statistics
// @route   GET /api/journal/stats/summary
// @access  Private
export const getStats = async (req, res, next) => {
    try {
        const journals = await Journal.find({ userId: req.userId });

        // Calculate statistics
        const totalEntries = journals.length;
        const totalWords = journals.reduce((sum, journal) => sum + journal.wordCount, 0);

        // Mood breakdown
        const moodBreakdown = {};
        journals.forEach((journal) => {
            const moods = Array.isArray(journal.mood) ? journal.mood : [journal.mood];
            moods.forEach((m) => {
                if (m) {
                    moodBreakdown[m] = (moodBreakdown[m] || 0) + 1;
                }
            });
        });

        // Entries per month (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const recentEntries = journals.filter(
            (journal) => new Date(journal.date) >= sixMonthsAgo
        );

        const entriesPerMonth = {};
        recentEntries.forEach((journal) => {
            const month = new Date(journal.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
            });
            entriesPerMonth[month] = (entriesPerMonth[month] || 0) + 1;
        });

        // Average word count

        // Favorite entries count
        const favoriteCount = journals.filter((j) => j.isFavorite).length;

        res.json({
            success: true,
            stats: {
                totalEntries,
                totalWords,
                favoriteCount,
                moodBreakdown,
                entriesPerMonth,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle favorite status
// @route   PATCH /api/journal/:id/favorite
// @access  Private
export const toggleFavorite = async (req, res, next) => {
    try {
        const journal = await Journal.findById(req.params.id);

        if (!journal) {
            return res.status(404).json({
                success: false,
                message: 'Journal entry not found',
            });
        }

        // Check if journal belongs to user
        if (journal.userId.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized',
            });
        }

        journal.isFavorite = !journal.isFavorite;
        await journal.save();

        res.json({
            success: true,
            message: `Journal ${journal.isFavorite ? 'added to' : 'removed from'} favorites`,
            journal,
        });
    } catch (error) {
        next(error);
    }
};
