const router = require('express').Router();

const { Post, Comment, User } = require('../.././models');


router.get('/', async (req, res) => {
    try {
        const dbPosts = await Post.findAll({});
        console.log(req.session);
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
    res.json(dbPosts)

})
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

// findAll
//findOne
//create
// put route to update by id
// delete by id
module.exports = router;