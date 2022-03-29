const express = require('express');
const router = express.Router();

const postsModel = require('../models/posts.js');

router.get('/', async (req, res) => {
    const posts = await postsModel.getAllPosts();

    return res.json({ data: posts });
});

module.exports = router;
