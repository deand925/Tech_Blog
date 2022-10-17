const router = require('express').Router();

const { Post, Comment, User } = require('../.././models');

router.get('/', async (req, res) => {
    try {
        const dbPosts = await Post.findAll();
        res.json(dbPosts)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    const dbPosts = await Post.findOne({
        where: {
            id: req.params.id,
        },
           include: [{
               model: Comment,
               attributes: ['id', 'text_content', 'post_id', 'timestamps'],
               include: {
                   model: User,
                   attributes: ['username']
               }
           }]
    });

})
router.post('/', async (req, res) => {
    try {
      const newPost = await Post.create({
          include: [
          {
              model: User,
              attributes: ['username'],
          },
        ],
        title: req.body.title,
        timeStamp: req.body.timeStamp,
        text_content: req.body.text_content,       
      });
      res.json(newPost)
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;