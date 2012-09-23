# Javascript Class Implementation
This js files contain compact class implementation without sugar. Almost all libs that implements classes in JS contain hudge overloaded structure and "cool" things that not needed usually.

## Class.js
This file contains classic inheritance (one parent for one class):
```Javascript
Class1 = Class( function Class1() {
	
}, {
	method1: function() {}
});

Class2 = Class( Class1, function Class2() {
	
}, {
	method2: function() {}
});

Class3 = Class( Class2, function Class3() {
	
}, {
	method3: function() {}
});

c3 = new C3;
console.log( c3 instanceof c1, c3 instanceof c2, c3 instanceof c3); // true true true
```
## Class-mi.js
This file contains class function that implements multiple inheritance (yes yes, one class can inherit few parents). The syntax is the same in general, but you can pass an array of another classes as first argument:
```Javascript
MyClass = Class([Class1, Class2, Class3, Array], function MyClass() {
	
}, {
 // methods
});
```
MyClass instancess will have all methods from Class1, Class2, Class3 and Array and implement Array behavior. To check is instance inherits some Class, you can use instanceOf function (instanceOf( instance, SomeClass )) because classic instanceof statement will return true only for the last class from parents array:
```Javascript
mc = new MyClass;
console.log( mc instanceof Class1, mc instanceof Class2, mc instanceof Class3, mc instanceof Array ); // false false false true
```
But:
```Javascript
console.log( instanceOf( mc, Class1 ), instanceOf( mc, Class2 ), instanceOf( mc, Class3 ), instanceOf( mc, Class4 ) ); // true true true true
```

———————————————-

To call parent constructor in child constructor and call parent methods from child methods you have to use classic call or apply methods:
```Javascript
Child = Class( Parent, function Child() {
	Parent.apply( this, arguments )
}, {
	method: function() {
		Parent.apply( this, arguments )
	}
});
```

Class and Class-MI takes 3 arguments: parent (or array of parents), constructor, prototype. All these arguments are optional. Class function will always return constructor (even if you didn't pass it). There is valid construction of your class:
```Javascript
MyClass = Class( function MyClass() {
	
}, {
	// prototype
});

MyClass = Class( function MyClass() {

});

MyClass = Class({
	// ptototype
});

MyClass = Class({
	constructor: function MyClass() {
		
	},
	// another prototype methods
});
```



