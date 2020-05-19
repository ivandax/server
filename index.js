
const rect = {
    perimeter: (x,y) => {
        return (2*(x+y));
    },
    area: (x,y) => {
        return (x*y);
    }
};

const solveRect = (l,h) => {
    console.log("Solving for rect "+l+" "+h);

    if(l <= 0 || h <= 0){
        console.log("Dimensions should be greater than 0")
    } else{
        return {
            per : rect.perimeter(l,h),
            ar : rect.area(l,h)
        }
    }
}

console.log(solveRect(4,4))
console.log(solveRect(3,5))
console.log(solveRect(3,-7))