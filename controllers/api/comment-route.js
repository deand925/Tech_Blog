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

router.get('/:id', async (req, res) => {
    try {
        const dbComments = await Comment.findOne({
            where: {
                id: req.params.id,
            }
        })
        res.json(dbComments);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            timeStamp: req.body.timeStamp,
            text_content: req.body.text_content,
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
        });
        res.json(newComment)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const dbComments = await Comment.update({
            where: {
                id: req.params.id
            }
        })
        if (!dbComments) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbComments);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const dbComments = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        if(!dbComments){
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbComments)
    } catch (error) {
        res.status(500).json(err);
    }
})


module.exports = router;