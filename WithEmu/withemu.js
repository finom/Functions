function withEmu( object, f ) {
	var argumentNamesArray = [],
		argumentValuesArray = [],
		newF;                        
	for( var arg in object ) {
		argumentNamesArray.push( arg );
		argumentValuesArray.push( object[ arg ] );
	}
	argumentNamesArray.push( 'return (' + f + ')()' );
	newF = Function.apply( null, argumentNamesArray );
	return newF.apply( null, argumentValuesArray );
}