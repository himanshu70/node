var react = require('./reactangle')

function solveRect(x,y){
	react(x,y,(err,reactangle) => {
	if (err){
	console.log("Error: " + err.message);
	} else{
	console.log("area to reactangle with wridth b: "+ x + "and length l:" + y + " is: "+ reactangle.area);
	console.log("area to reactangle with wridth b: "+ x + "and length l:" + y + " is: "+ reactangle.area);
	}
	});
}
solveRect(10,20);
solveRect(0,19);
;solveRect(-3,91);
