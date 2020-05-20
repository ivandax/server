const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

//all specifies something we want the app to do to all different methods, regardless of methods
app.all('/dishes', (req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next(); //next allows us to move along to other posible requests
});

//a get is associated with reading from the database
app.get('/dishes', (req, res, next)=>{
    res.end("We are sending files!");
});

//a post is associated with adding a new item (create) on the database
app.post('/dishes',(req,res,next)=>{
    res.end(`Will add the dish ${req.body.name}`)
})

//a put is associated with updating a single item, so calling it on /dishes makes no sense.
app.put('/dishes',(req,res,next)=>{
    res.statusCode = 403;
    res.end("Put operation not supported")
})

//dangerous operation
app.delete('/dishes',(req,res,next)=>{
    res.end("Deleting all dishes!")
})

//NOW; FOR SINGLE DISH REQUESTS:


//a get is associated with reading from the database, we can read a single item
app.get('/dishes/:dishId', (req, res, next)=>{
    res.end("We are sending dish: "+req.params.dishId);
});

//a post is associated with adding a new item (create) on the database, but we cannot create a specific item with post
app.post('/dishes/:dishId',(req,res,next)=>{
    res.statusCode = 403;
    res.end("Post operation on single item not supported - "+req.params.dishId)
})

//a put is associated with updating a single item, so calling it on /dishes makes no sense.
app.put('/dishes/:dishId',(req,res,next)=>{
    res.write("Updating dish "+req.params.dishId)
    res.end("Will update the dish - "+req.body.name+" with details: "+req.body.description) //we can read the body as json since we are using bodyParser
})

//dangerous operation
app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end("Deleting single dish - "+req.params.dishId);
})

app.use(express.static(__dirname+'/public'));

app.use( (req, res, next) => {
    //console.log("app use logging: ", req.headers); - morgan will do the logging
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html');
});

const server = http.createServer(app);

server.listen(port, hostname, ()=>{
    console.log(`Express server running at host ${hostname}, port ${port}`);
})