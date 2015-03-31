var blogger = require('./models/blogger').Blogger;
var authentication = require('./authentication');
var ensureAuthenticated = authentication.ensureAuthenticated;

module.exports = function(app) {
  authentication.serveOAuthRoutes(app);

  app.get('/', function(req, res) {
      res.render('index', {title: 'Index / CS Blogs'});
  });

  app.get('/login', function(req, res) {
      res.render('login', {title : 'Login / CS Blogs'});
  });

  app.get('/profile', ensureAuthenticated, function(req, res) {
      res.render('profile', {title: 'Your Profile / CS Blogs'});
  });

  app.get('/bloggers', function(req, res) {
      bloggers = blogger.find({}, function(error, allBloggers) {
        if(error) {
          res.render('error', {title: 'Error / CS Blogs', error: error});
        }
        else {
          res.render('bloggers', {title: 'Bloggers / CS Blogs', bloggers: allBloggers});
        }
      });
  });

  app.get('/register', ensureAuthenticated, function(req, res) {
      res.render('register', {title: 'Register / CS Blogs'}, user: req.user);
  });

  app.get('/blogs', function(req, res) {
      var blogs = require('./test-data/blogs.json');
      res.render('blogs', {title: 'Blogs / CS Blogs', content: blogs});
  });
}
