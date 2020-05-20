const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

//all specifies something we want the app to do to all different methods, regardless of methods
dishRouter.route('/').
all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next(); //next allows us to move along to other posible requests
}).
get( (req, res, next)=>{ //getting or reading from database
    res.end("We are sending dishes, all of them!");
}).
post((req,res,next)=>{ //posting new item to collection
    res.end(`Will add the dish ${req.body.name}`)
}).
put((req,res,next)=>{
    res.statusCode = 403; //no updating on a whole collection, not supported
    res.end("Put operation not supported")
}).
delete((req,res,next)=>{ //dangerous op
    res.end("Deleting all dishes!")
});

module.exports = dishRouter;