const fs = require('fs');
function isEven(x){
    return x%2==0;
}



var isOdd = function(x){
    return x%2 != 0
    }

var isOdd1 = function isOdd2(x){
    return x%2 != 0
    }

var isOdd3 = (x) => {
    return x%2 != 0
    }

 function nameCallBack(callback){
    if (1==1){
    return callback('err')
    } else
    {
    return callback(null,'himanshu')
    }
 }

/*
// This is synchronous.
function processData() {
    let data = fetchDataInAFarAwayAndMysticDatabase();
    data += 1;
    return data;
}
// This is asynchronous...
function processData(callback) {
    fetchDataInAFarAwayAndMysticDatabase(function (err, data) {
        if (err) {
           return callback(err);
        }
        data += 1;
        callback(null, data);
    });
}*/

console.log(nameCallBack((err,data)=>{
    if(err!=null){
        console.log('error')
    } else {
        console.log('success');
    }

}));

const CoffeeOrder = (data) =>
    new Promise((resolve, reject) => {
        console.log('2 + 2 - 1 = 3 Quick maths');
        //some more code here.
        let returnedValue = 'order completed';
        /*resolve(returnedValue);*/
        /*reject('error: '+returnedValue);*/
})

CoffeeOrder('aaa')
    .then(coffee=>{
        console.log(coffee)
    })
    .catch(err=>{
        console.log(err)
    });

console.log(isEven(10));
console.log(isEven(9));
console.log(isOdd(10));
console.log(isOdd(9));
console.log(isEven.name);
console.log(isOdd.name);
console.log(isOdd1.name);
console.log(isOdd_3.name);