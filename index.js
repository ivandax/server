const rect = require('./rectangle');

const solveRect = (l,h) => {
    console.log("Solving for rect "+l+" "+h);

    rect(l,h, (err, rectangle) => {
        if(err){
            console.log("Error: ", err.message);
        } else{
            console.log("Perimeter ", rectangle.perimeter(), " AND Area ",rectangle.area())
        }
    })
}

solveRect(4,4)
solveRect(3,5)
solveRect(3,-7)