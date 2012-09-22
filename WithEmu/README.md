# withEmu (Javascript 'with' Emulation)
=========
Javascript Strict Mode doesn't support 'with' statement, but you can emulate it with tiny withEmu function.
## Using
``` Javascript
withEmu( {a:1, b:2, c: 'blah'}, function() {
    alert( [a,b,c] );
});
```
[Check it](http://jsfiddle.net/yrCxn/)