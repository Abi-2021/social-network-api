const express = require('express');
const {
    getThoughts,
    createThought,
    getThought,
    updateThought,
    deleteThought, createReactionForAThought, deleteReactionForAThought
} = require('../controllers/thoughts');
const router = express.Router();

router.route('/').get(getThoughts).post(createThought);
router
.route('/:thoughtId')
.get(getThought)
.put(updateThought)
.delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(createReactionForAThought);


router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReactionForAThought);


module.exports = router;