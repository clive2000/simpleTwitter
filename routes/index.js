var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'SimpleTwitter'
  });
});

router.get('/hello', function(req,res,next){
	var data = 'Hello World\n';
	data = data + 'The time is' + new Date().toString();
	res.send(data);
});

module.exports = router;
