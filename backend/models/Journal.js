import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
            index: true, // Index for faster queries
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
            minlength: [10, 'Content must be at least 10 characters'],
        },
        mood: {
            type: [{
                type: String,
                enum: {
                    values: [
                        'happy',
                        'sad',
                        'angry',
                        'stressed',
                        'calm',
                        'motivated',
                        'tired',
                        'grateful',
                        'anxious',
                        'peaceful',
                        'excited',
                        'bored',
                        'confused',
                        'proud',
                        'lonely',
                        'hopeful',
                        'overwhelmed',
                        'content',
                    ],
                    message: '{VALUE} is not a valid mood',
                }
            }],
            required: true,
            validate: {
                validator: function (v) {
                    return v && v.length > 0;
                },
                message: 'At least one mood is required',
            },
            index: true,
        },
        date: {
            type: Date,
            default: Date.now,
            index: true,
        },
        wordCount: {
            type: Number,
            default: 0,
        },
        tags: {
            type: [String],
            default: [],
            validate: {
                validator: function (tags) {
                    return tags.length <= 10;
                },
                message: 'Cannot have more than 10 tags',
            },
        },
        activities: {
            type: [String],
            default: [],
        },
        dayScore: {
            type: Number,
            min: [1, 'Day score must be at least 1'],
            max: [10, 'Day score cannot be more than 10'],
        },
        location: {
            type: String,
            trim: true,
            maxlength: [100, 'Location cannot exceed 100 characters'],
        },
        weather: {
            type: String,
            enum: ['sunny', 'cloudy', 'rainy', 'snowy', 'windy', 'stormy', 'clear'],
        },
        isFavorite: {
            type: Boolean,
            default: false,
        },
        isPrivate: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt
    }
);

// Compound index for efficient querying
journalSchema.index({ userId: 1, date: -1 });
journalSchema.index({ userId: 1, mood: 1 });

// Calculate word count before saving
journalSchema.pre('save', function (next) {
    if (this.isModified('content')) {
        this.wordCount = this.content.trim().split(/\s+/).filter(Boolean).length;
    }
    next();
});

// Virtual for formatted date
journalSchema.virtual('formattedDate').get(function () {
    return this.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
});

// Ensure virtuals are included in JSON
journalSchema.set('toJSON', { virtuals: true });
journalSchema.set('toObject', { virtuals: true });

const Journal = mongoose.model('Journal', journalSchema);

export default Journal;
