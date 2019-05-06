/*var react = {
	area: (x,y) => (x*y),
	parimeter: (x,y) => (2*(x+y))
	};

*/
var rect = require('./reactangle')
function solveReactangle(l,b){
	/*
	if ( l<= 0 || b <= 0){
	console.log(" wirdth and length should be greator then 0")
	} else {
	console.log("area of rectange is l: "+l +" and wridth is b" + b + " is: " + react.area(l,b) );
	console.log("parimeter of rectange is l: "+l +" and wridth is b" + b + " is: " + react.parimeter(l,b) );
	}*/
	console.log("Solving for rectangle with l = "
                + l + " and b = " + b);
    rect(l,b, (err,rectangle) => {
        if (err) {
	        console.log("ERROR: ", err.message);
	    }
        else {
            console.log("The area of the rectangle of dimensions l = "
                + l + " and b = " + b + " is " + rectangle.area());
            console.log("The perimeter of the rectangle of dimensions l = "
                + l + " and b = " + b + " is " + rectangle.perimeter());
        }
    });
    console.log("This statement after the call to rect()");
};

solveReactangle(10,20);
solveReactangle(20,30);
//reactangle(0,11);
//reactangle(-3,23);
