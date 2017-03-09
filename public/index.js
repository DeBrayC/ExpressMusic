// import the modules required in our program
var express = require('express');
var fs = require('fs');
// var connect = require('connect')
// initialize an express app
var app = express();

// declare public directory to be used as a store for static files
app.use('/public', express.static('public'));


// make the default route to serve our static file
app.get('/',function(req,res){

	res.sendFile(`${__dirname}/home.html`);
});

// start app on port 3003 and log the message to console

app.listen(3003,function(){
	console.log('App listening on port 3003!');
});
// define a route music it creates readstream to the requested file and pipes the output to response

app.get('/music', function(req,res){

	var fileId = req.query.id;
	var file = './music/' + fileId;
	fs.exists(file,function(exists){
		if(exists)
		{
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send("Its a 404");
			res.end();
		}

	});
});
