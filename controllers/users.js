const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json({ sucess: true, data: users });
});

exports.getUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) throw new ErrorResponse(`No user associated with ${userId}`, 404);

    res.status(200).json({ sucess: true, data: user });
});

exports.createUser = asyncHandler(async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json({ sucess: true, data: user });
});

exports.updateUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!user) throw new ErrorResponse(`No user associated with ${userId}`, 404);

    res.status(200).json({ sucess: true, data: user });
});

exports.deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findOneAndDelete(userId);

    if (!user) throw new ErrorResponse(`No user associated with ${userId}`, 404);

    res.status(200).json({ sucess: true, data: {} });
});

exports.createUserFriend = asyncHandler(async (req, res) => {
    const { userId, friendId } = req.params;
    if (userId === friendId) {
        throw new ErrorResponse(`User id and friend id can not be same`);
    }
    const friend = await User.findById(friendId);

    if (!friend)
        throw new ErrorResponse(`No friend associated with ${friendId}`, 404);

    const userWithFriend = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { friends: friendId } },
        { new: true, runValidators: true }
    );

    if (!userWithFriend)
        throw new ErrorResponse(`No user associated with ${userId}`, 404);

    res.status(200).json({ sucess: true, data: userWithFriend });
});

exports.deleteUserFriend = asyncHandler(async (req, res) => {
    const { userId, friendId } = req.params;
    if (userId === friendId) {
        throw new ErrorResponse(`User id and friend id can not be same`);
    }
    const friend = await User.findById(friendId);

    if (!friend)
        throw new ErrorResponse(`No friend associated with ${friendId}`, 404);

    const userWithDeletedFriend = await User.findOneAndDelete(
        { _id: userId },
        { $pull: { friends: friendId } }
    );

    if (!userWithDeletedFriend)
        throw new ErrorResponse(`No user associated with ${userId}`, 404);

    res.status(200).json({ sucess: true, data: {} });
});
