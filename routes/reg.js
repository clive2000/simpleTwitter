var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');

/* GET users listing. */
router.get('/reg', function(req, res, next) {
  res.render('reg',{
      title: 'User Registration',
      errorMsgFlash : req.flash('error'),
      successMsgFlash : req.flash('success')
  });
});

router.post('/reg', function(req, res, next) {

  //if password do not match, add flash msg and repead 
  if(req.body.password != req.body['password-repeat']){
      console.log('password do not match');
      req.flash('error','Password does not match!');
      return res.redirect('/reg');
  }

  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  var newUser = new User({
    name: req.body.username,
    password : password
  });

  newUser.get(newUser.name, function(err,user){
    if(user){
      err = 'Username Already exits';
      req.flash('error',err);
      return res.redirect('/reg');
    }

    newUser.save(function(err){
      if(err){
        req.flash('error',err);
        return res.redirect('/reg');
      }
      req.session.user = newUser;
      req.flash('success','Registration Completed');
      res.redirect('/reg');
    });

  });
});

module.exports = router;
