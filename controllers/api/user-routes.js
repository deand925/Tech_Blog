const router = require('express').Router();

const { User, Comment, Post  } = require('../.././models');

router.get('/', async (req, res) => {
    try {
        const dbUsers = await User.findAll();
        res.json(dbUsers)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;