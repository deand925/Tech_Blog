const router = require("express").Router();
const { Post, Comment, User } = require("../models");

router.get("/", (req, res) => {
  res.render("homepage", {
    loggedIn: req.session.userID
  });
});

router.get('/dashboard',  (req, res) => {
  
  res.render('dashboard', {
    loggedIn: req.session.userID
  });
});

router.get('/login', (req, res) => {
  res.render('login', {
    loggedIn: req.session.userID
  });
});

router.get('/home', (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.userID
  });
});

router.get('/signup', (req, res) => {
  res.render('signup', {
    loggedIn: req.session.userID
  });
});

module.exports = router;