# Object Storage
If you need to work with localStorage and sessionStorage like with simple Object, you can use this. You don't ever need to use JSON.parse and JSON.stringify methods to get and save the data from web storage that can contain only strings.

It saves your object to local and session storage every time period that you want and saves by triggering of onbeforeunload event

## Using 

``` Javascript
var storage = new ObjectStorage;
storage.local = {a:4, b: {c:5}};
storage.session = {a:7, b: {c:8}};
b = storage.local.b;
b.c = {d:6};
```
You can specify name of storage (key in localStorage or sesionStorage that contains the data; default is '_objectStorage') and duration (saving interval; default is 5 sec)
``` Javascript
new ObjectStorage( '_myStorage' );
// or:
new ObjectStorage( '_myStorage', 1000 );
// or using default name:
new ObjectStorage( null, 1000 );
```