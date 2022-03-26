const asyncHandler = require('express-async-handler');
const Thought = require('../models/Thought');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.getThoughts = asyncHandler(async (req, res) => {
    const thoughts = await Thought.find();
    res.status(200).json({ success: true, data: thoughts });
});

exports.getThought = asyncHandler(async (req, res) => {
    const { thoughtId } = req.params;
    const thought = await Thought.findById(thoughtId);

    if (!thought)
        throw new ErrorResponse(`No thought associated with ${thoughtId}`, 404);

    res.status(200).json({ success: true, data: thought });
});

exports.createThought = asyncHandler(async (req, res) => {
    const thought = await Thought.create(req.body);
    const { _id } = thought;
    const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: _id } },
        { new: true }
    );

    if (!user)
        throw new ErrorResponse(`No user associated with ${body.username}`, 404);

    res.status(201).json({ success: true, data: { thought } });
});

exports.updateThought = asyncHandler(async (req, res) => {
    const { thoughtId } = req.params;
    const updatedThought = await Thought.findByIdAndUpdate(thoughtId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedThought)
        throw new ErrorResponse(`No thought associated with ${thoughtId}`, 404);

    res.status(200).json({ success: true, data: updatedThought });
});

exports.deleteThought = asyncHandler(async (req, res) => {
    const { thoughtId } = req.params;
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);

    if (!deletedThought)
        throw new ErrorResponse(`No thought associated with ${thoughtId}`, 404);

    res.status(200).json({ success: true, data: {} });
});

exports.createReactionForAThought = asyncHandler(async (req, res) => {
    const { thoughtId } = req.params;
    const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
    );

    if (!thought)
        throw new ErrorResponse(`No thought associated with ${thoughtId}`, 404);

    res.status(201).json({ success: true, data: thought });
});

exports.deleteReactionForAThought = asyncHandler(async (req, res) => {
    const { thoughtId } = req.params;
    const thought = await Thought.findOneAndDelete(
        { _id: thoughtId },
        { $push: { reactions: body } },
        { new: true }
    );

    if (!thought)
        throw new ErrorResponse(`No thought associated with ${thoughtId}`, 404);

    res.status(201).json({ success: true, data: {} });
});
