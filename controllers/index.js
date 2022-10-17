const router = require('express').Router();
const apiRoutes = require('./api');
const pageRoutes = require('./pageroutes.js')

router.use('/api', apiRoutes);
router.use('/', pageRoutes);

module.exports = router;