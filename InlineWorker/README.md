# Inline Worker
Inline Worker is a function that adds possibility to use [Web Workers](https://developer.mozilla.org/en-US/docs/DOM/Using_web_workers) without creating additional files. You can create asynchronous another-thread function but use it in common js files.

In addition InlineWorker js file contains fallback for old browsers that don't support Web Workers. So you can use traditional Workers even in IE6 (but in the same thread). The original fallback code places there: [ie-web-worker](http://code.google.com/p/ie-web-worker/).

## Using
``` Javascript
var worker = InlineWorker( function( e ){ 
	postMessage( 'msg from worker, ' + e.data );
});

worker.onmessage = function( e ) {
	alert( e.data );
}

worker.postMessage( 'msg from window' );
```

In addition you can put second argument to InlineWorker function that uses as onmessage callback (you don't need initiate variable):
``` Javascript
InlineWorker( function( e ) {
	postMessage( 'msg from worker2, ' + e.data );
}, function( e ) {
	alert( e.data );
}).postMessage( 'msg from window2' );
```

[Try it](http://jsfiddle.net/sYqUb/)