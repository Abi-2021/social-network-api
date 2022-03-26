const express = require('express');
const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    createUserFriend,
    deleteUserFriend,
} = require('../controllers/users');
const router = express.Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);
router
    .route('/:userId/friends/:friendId')
    .post(createUserFriend)
    .delete(deleteUserFriend);

module.exports = router;