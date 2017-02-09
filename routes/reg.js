var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/reg', function(req, res, next) {
  res.render('reg',{
      title: 'User Registration',
      expressFlash : req.flash('error')
  });
});

router.post('/reg', function(req, res, next) {
  if(req.body['password'] != req.body['password-repeat']){
      console.log('password do not match');
      req.flash('error','Need same password');
      return res.redirect('/reg');
  }
});

module.exports = router;
