module.exports = (x,y,callback) => {
	if (x <=0 || y <=0 ){
	setTimeout(() => callback(new Error("Wridth and length of reactangle should be greate then 0, wridth is b:"+ x +"and length l:"+ y),
	null),
	2000)
}	else{
	setTimeout(() => callback(null,{
		area: () => (x*y),
		perimeter: () => (2*(x+y))
	}),
	2000)
}
}
//exports.area= (x,y) => (x*y);
//exports.parimeter= (x,y) => (2*(x+y));
