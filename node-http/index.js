const path = require('path');
const fs = require('fs');
const http = require('http');
const hostname = 'localhost';
const port ='3000';

const server = http.createServer((req,res) => {
    console.log(req.headers);
    console.log(req.method);
    if( req.method == "GET"){
    var fileUrl;
    if(req.url == "/") fileUrl = "/index.html";
    else fileUrl = req.url;
    var filePath = path.resolve('./public'+ fileUrl);
    const fileext = path.extname(filePath)
    if (fileext == '.html'){
    fs.exists((filePath), (exists) =>{
    if(!exists){
       res.statusCode = 404;
      // res.setHeader('content-Type','text/html');
       res.end(`<html><body>Error: files not found ${filePath}</body></html>`)
       }
       else {
           res.statusCode = 200;
           res.setHeader('content-Type','text/html');
           fs.createReadStream(filePath).pipe(res);
           //res.end("<html><body>Himanhsu nanandnai</body></html>");
       }
    });




    } else
    {
    res.statusCode = 404;
            res.setHeader('content-Type','text/html');
            res.end("<html><body>ERROR 404: Extention not Found</body></html>");

    }
    } else{
        res.statusCode = 404;
        res.setHeader('content-Type','text/html');
        res.end(`<html><body>ERROR 404: ${req.method} not supported</body></html>`);
    }
});

server.listen(port, hostname, () => {
 console.log("server started!!!")
});