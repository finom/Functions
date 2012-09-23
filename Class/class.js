"use strict";
window.inherits = function( Child, Parent ) {
	var prototype = Child.prototype,
		F = function() {};
	F.prototype = Parent.prototype;
    Child.prototype = new F;
    Child.prototype.constructor = Child;
	for( var m in prototype ) {
		Child.prototype[ m ] = prototype[ m ];
	};
};

window.Class = function( superConstructor, Constructor, prototype ) {
	if( arguments.length === 2 ) {
		if( typeof Constructor === 'object' ) {
			prototype = Constructor;
			Constructor = superConstructor;
			superConstructor = null;
		} else {
			prototype = {};
		}
	} else if( arguments.length === 1 ) {
		if( typeof superConstructor === 'object' ) {
			prototype = superConstructor;
			Constructor = prototype.constructor !== Object 
				? prototype.constructor 
				: function() {};
			superConstructor = null;
		} else {
			prototype = {};
			Constructor = superConstructor;
			superConstructor = null;
		}
	}
	
	prototype.constructor = Constructor;
	Constructor.prototype = prototype;
	
	superConstructor && inherits( Constructor, superConstructor );
	
	return Constructor;
};