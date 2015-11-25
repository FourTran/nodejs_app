module.exports = function(app,io){

	app.get('/', function(req, res){

		// Render views/home.html
		res.render('home');
	});
}
module.exports = function(app, io){
	app.get('/', function(req, res){
		res.render('index');
	});
}