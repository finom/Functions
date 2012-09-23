# Wait
Javascript is asynchronous language, and sometimes your code becomes spaghetti code (when you use callback in callback in callback in callback...). 'wait' function can be a good solution to avoid this problem.
## How to use
``` Javascript
wait(function(next){
    dosomethingAsync1(next);
}).wait(function(next, a, b){
    dosomethingAsync2(next);
}).wait(function(next, c, d){
	dosomethingAsync3(next);
});
```
a,b,c,d are custom arguments that passed into callback function:
``` Javascript
dosomethingAsync1 = function( callback ) {
	var a, b;
	//...
	callback( a, b );
}
```

[Check this with serial animations](http://jsfiddle.net/XSGub/96/)
## Problem example
 This is node.js code:
``` Javascript
var html = '';
request.on('response', function (response) {

    response.on('data', function (chunk) {
        html = html + chunk;
    });

    response.on('end', function() {
        parse(html, function(data){  
			addToDatabase(data, function() {  
				doSomething();
			})
		});

    });
});
```
Or 
``` Javascript
var html = '';
var responceOnEnd = function() {
    parse(html, parsed);
}
    
var parsed = function(data){ 
    addToDatabase(data, addedToDatabase)
}

var addedToDatabase = function() {
    doSomething();
}

request.on('response', function (response) {

    response.on('data', function (chunk) {
        html = html + chunk;
    });

    response.on('end', responceOnEnd);
});
``` 
Looks like shit, doesn't it?

But with 'wait' function you can do the same task like that:
``` Javascript
wait(function(next){
    request.on('response', next);
}).wait(function(next, response){
    response.on('data', function (chunk) {
        html = html + chunk;
    });
    
    response.on('end', function() {
        next(html);
    });
}).wait(function(next, html){
    parse(html, next);
}).wait(function(next, data){
    addToDatabase(data, next);
}).wait(function(){
    doSomething();
})
```