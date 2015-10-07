var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cookies'});
  res.cookie('fraggle', req.query.foo)
  res.render('index', { title: req.query.foo });
});

router.get('/show', function(req, res, next) {
  res.render('index', { title: req.cookies.fraggle });
});

module.exports = router;
