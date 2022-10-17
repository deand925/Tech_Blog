const router = require('express').Router();

const { Comment, User, Post } = require('../.././models');

router.get('/', async (req, res) => {
    try {
        const dbComments = await Comment.findAll();
        res.json(dbComments)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    try {
      const newComment = await Comment.create({
          include: [
          {
              model: User,
              attributes: ['username'],
          }
        ],
        timeStamp: req.body.timeStamp,
        text_content: req.body.text_content,       
      });
      res.json(newComment)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;