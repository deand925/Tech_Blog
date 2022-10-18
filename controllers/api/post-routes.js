const router = require('express').Router();

const { Post, Comment, User } = require('../.././models');

// gets all posts
// adds /api/post before
router.get('/', async (req, res) => {
    try {
        const dbPosts = await Post.findAll({});
        console.log(req.session);
        res.json(dbPosts)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get posts by id
// adds /api/post before
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
    res.json(dbPosts)

})

// creates a new post
// adds /api/post before
router.post('/', async (req, res) => {
    try {
        const dbPost = await Post.create({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
            title: req.body.title,
            timeStamp: req.body.timeStamp,
            text_content: req.body.text_content,
            user_id: req.session.userID,
        });
        res.json(dbPost)
    } catch (err) {
        res.status(500).json(err);
    }
});

// updates a post
// adds /api/post before
router.put('/:id', async (req, res) => {
    try {
        const dbPosts = await Post.update(
            {
                title: req.body.title,
                text_content: req.body.text_content,
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        if (!dbPosts) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbPosts)
    } catch (error) {
        res.status(500).json(err);
    }
})

// delets a comment by id
// adds /api/post before
router.delete('/:id', async (req, res) => {
    try {
        const dbPosts = await Comment.destroy(
            {
                where: {
                    id: req.params.id
                }
            })
        if (!dbPosts) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbPosts)
    } catch (error) {
        res.status(500).json(err);
    }
})

module.exports = router;