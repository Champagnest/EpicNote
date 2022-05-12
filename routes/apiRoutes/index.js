const router = require('express').Router();
const notesRoutes = require('../apiRoutes/notesRoutes');

router.use(require('./notes'));
router.use(notesRoutes);

module.exports = router;