const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes/dishRoutes')
const hostname = 'localhost';
const port = 3001;

const app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use('/dishes',routes);

/*
app.all('/dishes', (req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('content-type','text/html');
    next();
});

app.get('/dishes', (req,res,next) => {
    res.end(`will send all dishes to you.`)
});

app.post('/dishes', (req,res,next) => {
    res.end(`will send you `)
});*/

	app.use((req,res, next) => {
		console.log(req.header);
		res.setStatus = 200;
		res.setHeader('content-Type','text/html');
		res.end(`<html><body><H1> welcome to nodejs </H1></body></html>`);
	});

	var server = http.createServer(app);

	server.listen(port, hostname, () => {
		console.log(`server is started on localhost:3000`);
	});

