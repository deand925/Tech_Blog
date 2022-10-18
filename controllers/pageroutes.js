const router = require("express").Router();
const { Post, Comment, User } = require("../models");

router.get("/", (req, res) => {
  res.render("homepage", {
    loggedIn: req.session.userID
  });
});

//Edit post
router.get('/post/edit/:id', (req, res) => {
  try {
    const postDb = Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'text_content',
        'created_at',
        'user_id'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'text_content', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    if (!postData) {
      res.status(404).json({ message: "No post found" });
      return;
    }
    const post = postData.get({ plain: true });
    if (post.user_id !== req.session.user_id) {
      console.log('WRONG USER');
      res.redirect('/');
    }
    res.render('edit-post', { post, loggedIn: req.session.loggedIn, user: req.session.username });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/login',(req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }
  res.render('login'); //name of template to use
});

router.get('/signup',(req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }
  res.render('signup'); //name of template to use
});

// Dashboard
router.get('/dashboard', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  try {
    const postDb = Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'created_at'
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    const posts = postDb.map(post => post.get({plain:true}));

    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
      user: req.session.username
  })
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

module.exports = router;