const mongoose = require('mongoose');
const dayjs = require('dayjs');

const ReactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: new mongoose.Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: [280, 'Reaction can not be more than 280 characters'],
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: String,
            default: Date.now(),
            get: (at) => dayjs(at).format('dddd, MMMM D, YYYY h:mm A'),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const ThoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxLength: [280, 'Thought text can not be more than 280 characters'],
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (at) => dayjs(at).format('dddd, MMMM D, YYYY h:mm A'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

module.exports = mongoose.model('Thought', ThoughtSchema);