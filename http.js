const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

//since this is a server, req is what I get, res is why I produce.
const server = http.createServer((req,res)=>{
    console.log(req.headers);
    console.log("Method used was "+req.method);

    if(req.method === 'GET'){
        var fileUrl;
        if(req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./public'+fileUrl);

        const fileExt = path.extname(filePath);
        if(fileExt == '.html'){
            fs.exists(filePath, (exists) => {
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader("Content-Type", 'text/html');
                    res.end('<html><body><h1>Error 404: Not Found</h1></body></html>');
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            })
        } else{
            res.statusCode = 404;
            res.setHeader("Content-Type", 'text/html');
            res.end('<html><body><h1>Error 404: File is not HTML</h1></body></html>');
            return;            
        }
    } else{
        res.statusCode = 404;
        res.setHeader("Content-Type", 'text/html');
        res.end('<html><body><h1>Error 404: Method is not GET</h1></body></html>');
        return;          
    }

    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    // res.end('<html><body><h1>HelloWorld</h1></body></html>');
})

server.listen(port, hostname, ()=>{
    console.log(`Server running at host ${hostname}, port ${port}`);
})