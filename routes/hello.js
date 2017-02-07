var express = require('express');
var router = express.Router();

router.get('/hello', function(req,res,next){
	var data = 'Hello World\n';
	data = data + 'The time is' + new Date().toString();
	res.send(data);
});


module.exports = router;
