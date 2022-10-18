const express = require('express');
const router = express.Router();

const login = require('./login.js');
const join = require('./join.js');
const post = require('./post.js');
const comment = require('./comment.js');

router.use('/signup',[join])
router.use('/login',[login])
router.use('/posts',[post])
router.use('/comments',[comment])

module.exports = router;
