const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const colors = require('colors');

// /api/v1/users
exports.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find(); // await Users.find(filter or empty) => array of user
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
    // retrieve path variable which is user id
    const { userId } = req.params;

    // retrieve user from database
    const user = await User.findByIdAndDelete(userId);
    // if user is not in the database we need to send error message
    if (!user) throw new ErrorResponse(`No user associated with ${userId}`, 404);

    // if everything is okay, then we send 200 OK status code along with success: true and _data: {}
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

    const userWithDeletedFriend = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: friendId } }
    );

    if (!userWithDeletedFriend)
        throw new ErrorResponse(`No user associated with ${userId}`, 404);

    res.status(200).json({ sucess: true, data: {} });
});
