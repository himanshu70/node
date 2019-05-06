const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req,res) => {
	res.json({
		message: "Welcome to api"
	});
});




app.post('/api/posts', verifyToken, (req,res) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		 console.log(req.token);

		if(err){
			console.log('Error found')
			console.log(err);
			console.log(req.token);
			res.sendStatus(403);
		} else {
		 res.json({
                message: "Post created......",
                authData
		});
		}

	});
 });

app.post('/api/login', (req,res) => {

	const user = {
		id: 1,
		name: 'himanshu',
		eamil: 'himanshu@gmail.com'

	}

	jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
		res.json({
		token
		});
	});

});

function verifyToken(req, res, next){
	const bearerHeader = req.headers['authorization'];
        console.log(bearerHeader);
	if(typeof bearerHeader != 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	} else {
		res.sendStatus(403);
	}
}

app.listen(5000, () => console.log('server started at 5000'));
