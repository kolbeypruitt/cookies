var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/cookiedb');
var cookiedb = db.get('users');
var checkdbEmail = 'cookiedb.find({email: req.body.email, password: req.body.password}).query'

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function (req, res, next) {
  res.render('signup', {title: 'SignUp Page'})
});

router.post('/signup', function (req, res, next) {
  res.cookie('email',req.body.email);
  res.cookie('password', req.body.password);
  cookiedb.insert({email: req.body.email, password: req.body.password}, function (err, credentials) {
    res.redirect('success');
  });
});

router.get('/success', function (req, res, next) {
  res.render('success', {title: 'SUCCESS!'})
});

router.get('/login', function (req, res, next) {
  res.render('login', {title: 'User Login'})
});

// read cookie // req.cookies.email
router.post('/login', function (req, res, next) {
  cookiedb.findOne({email: req.body.email, password: req.body.password}, function (err, user) {
    if (user) {
      res.cookie('email', req.body.email);
      res.cookie('password', req.body.password);
      res.redirect('loggedin');
    }
    else {
      res.redirect('login');
    }
  });
});

router.get('/loggedin', function (req, res, next) {
  res.render('loggedin', {email: req.cookies.email, title: 'You have been securely logged into our super-secure network'});
});

module.exports = router;

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Cookies'});
//   // res.cookie('fraggle', req.query.foo)
//   res.render('index', { title: req.query.foo });
// });

// router.get('/show', function(req, res, next) {
//   res.render('index', { title: req.cookies.fraggle });
// });
