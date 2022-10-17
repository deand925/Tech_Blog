const router = require('express').Router();
const { Post, Comment, User } = require('../models')

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    res.render('logout');
});

router.get('/home', (req, res) => {
    res.render('homepage');
});

module.exports = router;