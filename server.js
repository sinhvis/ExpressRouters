// load the express package and create our app
var express = require('express') ;
var app = express() ;
var path = require('path') ;

// send our index.html file to the user for the home page
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html')) ;
}) ;

// create routes for the admin section

// get an instance of the router
var adminRouter = express.Router() ;

// Routes can be used for many things, like
// checking if a user is logged in before letting them continue
// route middleware that will happen on every request
adminRouter.use(function(req, res, next) {

	// log each request to the console
	console.log(req.method, req.url) ;

	// continue doing what we are doing and go to the route
	next() ;
}) ;

// admin main page.  The dashboard (http://localhost:1337/admin)
adminRouter.get('/', function(req, res) {
	res.send('I am the dashboard!') ;
}) ;

// users page (http://localhost:1337/admin/users)
adminRouter.get('/users', function(req, res) {
	res.send('I show all the users!') ;
}) ;

// posts page (http://localhost:1337/admin/posts)
adminRouter.get('/posts', function(req, res) {
	res.send('I show all the posts!') ;
}) ;

// route with parameters (http://localhost:1337/admin/users/:name)
adminRouter.get('/users/:name', function(req, res) {
	res.send('hello ' + req.params.name + '!') ;
}) ;


// route middleware to validate :name
adminRouter .param('name', function(req, res, next, name) {
	// do validation on name here
	// blah blah validation
	// log something so we know it's working
	console.log('doing name validations on ' + name) ;

	// Just adding Mr. to the beginning of the string
	name = 'Mr. ' + name ;

	// once validation is done save the new item in the req
	req.name = name
	// go to the next thing
	next() ;
}) ;

// route with parameters (http://localhost:1337/admin/hello/:name)
adminRouter.get('/hello/:name', function(req, res) {
	res.send('hello ' + req.name + '!') ;
}) ;

// We can compartmentalize our application for 
// complex applications or APIs
// Also keep our applications clean and organized
// since we can move each router definition into its own file
// and just pull in those files when we call app.use() as follows:
// app.use('/', basicRoutes) ;
// app.use('/admin', adminRoutes) ;
// app.use('/api', apiRoutes) ;
// apply the routes to our application
app.use('/admin', adminRouter) ;

// Define routes right on the app.
// Similar to using app.get, but use app.route
// app.route is a shortcut to call the Express Router
// Instead of calling express.Router(), we can call app.route
// and start applying our routes there
// Using app.route(), define multiple actions on a single login route
// GET route to show the login form and POST route to process login form.
app.route('/login')

	// show the form (GET http://localhost:1337/login)
	.get(function(req, res) {
		res.send('this is the login form') ;
	}) 

	// process the form (POST http://localhost:1337/login)
	.post(function(req, res) {
		console.log('processing') ;
		res.send('processing the login form!') ;
	}) ;

// start the server
app.listen(1337) ;
console.log('1337 is the magic port!') ;
