const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dishesModel = require('./model/dishesModel');
const path = require('path');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const fileStoreSession = require('session-file-store')(session);

const url = 'mongodb://mongodb:mongodb@localhost:27017/mongodb';

mongoose.connect(url)
.then((db)=>{
    console.log('connected to database successfully!!');
},(err)=>{
    console.log('Error while connecting to DB');
    });

const dishRoutes = require('./routes/dishesRoute');

const host = 'localhost';
const port = 3001;
const app = express();

app.use(session({
'name': 'session-id',
'secret':'123123-141413-32423-4234-2323234';
}


function auth(req,res,next) {
    console.log(req.header);

 if(!req.signedCookies.user){
    var authHeader = req.headers.authorization;

    if(!authHeader){
    var err = new Error("Authentication details are missing");
    err.status = 401;
    res.setHeader('WWW-authenticate','Basic')
    return next(err);
    } else {
        console.log('auth header exits');
        var authHeaderString = new Buffer.from()(authHeader.split(' ')[1], 'base64').toString().split(':');
        var username = authHeaderString[0];
        var password = authHeaderString[1];
        console.log(authHeader +" ssssssssssss   "+authHeaderString + " username :"+ username+"  password :"+password);
        if (username === 'admin' && password === 'password'){
            res.cookie('user','admin',{signed: true});
            console.log("user authenticated");
            next();
            }
            else {
             console.log("user not authenticated");

            var err = new Error("Authentication details are missing");
                err.status = 401;
                res.setHeader('WWW-authenticate','Basic')
                next(err);
            }
        }
        }
        else {
        if(req.signedCookies.user == 'admin'){
          console.log("user authenticated by cookies");
                    next();
        } else{
        var err = new Error("Authentication details are missing");
                        err.status = 401;
                        res.setHeader('WWW-authenticate','Basic')
                        next(err);
        }
        }
}

app.use(auth);

app.set('view', path.join(__dirname,'views'));
app.set('view engine','jade');


app.use(morgan('dev'));
app.use(bodyParser.json());



app.use(express.static(path.join(__dirname,'public')));
app.use('/dishes',dishRoutes);

/*app.use((req,res,next)=>{
    console.log('request received');
    res.statusCode =200;
    res.setHeader('content-Type','application/json');
    res.end('{"msg":"server is up"}');
})*/

var server = http.createServer(app);
server.listen(port,host, () =>{
    console.log('server started');
})