var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/logout',checkLogin)
router.get('/logout', function(req, res, next) {
    req.session.user = null;
    res.redirect('/');
});

function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', 'Not Logged in');
    return res.redirect('/login');
  }
  next();
}


module.exports = router;
