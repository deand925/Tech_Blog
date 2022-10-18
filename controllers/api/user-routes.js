const router = require('express').Router();

const { User } = require('../.././models');

// gets all users
router.get('/', async (req, res) => {
    try {
        const dbUsers = await User.findAll();
        res.json(dbUsers)
    } catch (err) {
        res.status(500).json(err)
    }
})

// creates a new user
router.post('/', async (req, res) => {
    try {
        const dbUser = await User.create(
            req.body,
        )
        res.json(dbUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

// logins a user
router.post('/login', async (req, res) => {
    try {
        const dbUser = await User.findOne({
           where: {
            username: req.body.username,
           } 
        })
        if(!dbUser){
            res.status(500).json('Username not found. Please try again or signup.')
        }

        const pwValidate = dbUser.checkPassword(req.body.password);
        
        if(!pwValidate){
            res.status(500).json('Password is incorrect. Please try again.')
        } 
        req.session.save(() => {
            req.session.userID = dbUser.id;
            res.json('You are now logged in!');
        })
    } catch (err) {
        res.status(404).json(err)
    }
})


module.exports = router;