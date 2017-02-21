var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');

/* GET users listing. */
router.get('/login', checkNotLogin);
router.get('/login', function(req, res, next) {
  res.render('login',{
      title : 'User login',
      errorMsgFlash : req.flash('error'),
      successMsgFlash : req.flash('success'),
  });
});

router.post('/login', checkNotLogin);
router.post('/login', function(req, res, next) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  User.prototype.getUser(req.body.username, function(err, user){
    if (!user){
        req.flash('error','User does not exist');
        return res.redirect('/login');
    }
    if (user.password != password){
        req.flash('error','Wrong Password');
        return res.redirect('/login');
    }
    req.session.user = user;
    req.flash('success', 'successfully logged in');
    res.redirect('/');

  });
});

function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', 'Not Logged in');
    return res.redirect('/login');
  }
  next();
}

function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', 'Already Logged in');
      return res.redirect('/');
    }
    next();
}


module.exports = router;
