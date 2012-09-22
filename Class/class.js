"use strict";
window.inherits = function( Child, Parent ) {
	var prototype = Child.prototype,
		F = function() {};
	F.prototype = Parent.prototype;
    Child.prototype = new F;
    Child.prototype.constructor = Child;
	for( var m in prototype ) if( prototype.hasOwnProperty( m ) ){
		Child.prototype[ m ] = prototype[ m ];
	};
};

window.Class = function( superConstructor, Constructor, prototype ) {
	/*if( !prototype ) {
		if( typeof Constructor === 'object' ) {
			prototype = Constructor;
			Constructor = superConstructor;
			superConstructor = function() {};
		} else {
			prototype = {};
		}
	}
	
	
	
	prototype.constructor = Constructor;
	Constructor.prototype = prototype;
	
	inherits( Constructor, superConstructor );*/
};