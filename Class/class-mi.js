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

window.instanceOf = function( instance, Constructor ) {
	return instance instanceof Constructor 
		|| instance.superConstructors && !!~instance.superConstructors.indexOf( Constructor );
};

window.Class = function( superConstructors, Constructor, prototype ) {
	if( arguments.length === 2 ) {
		if( typeof Constructor === 'object' ) {
			prototype = Constructor;
			Constructor = superConstructors;
			superConstructors = [];
		} else {
			prototype = {};
		}
	} else if( arguments.length === 1 ) {
		if( typeof superConstructors === 'object' ) {
			prototype = superConstructors;
			Constructor = prototype.constructor !== Object 
				? prototype.constructor 
				: function() {};
			superConstructors = [];
		} else {
			prototype = {};
			Constructor = superConstructors;
			superConstructors = [];
		}
	}
	
	if( typeof superConstructors !== 'object' ) {
		superConstructors = [ superConstructors ];
	}

	prototype.constructor = Constructor;
	prototype.superConstructors = superConstructors;
	
	Constructor.prototype = prototype;
	
	for( var i = 0; i < superConstructors.length; i++ ) {
		inherits( Constructor, superConstructors[ i ] );
		if( superConstructors[ i ].prototype.superConstructors ) {
			superConstructors = superConstructors.concat( superConstructors[ i ].prototype.superConstructors );
		}
	}
		
	return Constructor;
};