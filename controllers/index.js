const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.get('/*', (req, res) => {
    try {
      res.render("login", {
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err)};
    });

module.exports = router;