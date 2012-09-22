# Function Call Event
This tiny method helps to catch number of calls, result, arguments and another information before, after, on sucess and on error call.
## Why is it needed?
Sometimes libs don't contain some functionality that you need. With Function.addCallListener you can add additional behavior without making changes in lib file.

For example Twitter Bootstrap Typeahead plugin doesn't include any event that runs before and after autocomplete list is shown. You should make a shitcode to handle event when user chooses one item from the list.

The solution is so:
'''JavaScript
var typeaheadPrototype = $.fn.typeahead.Constructor.prototype;
typeaheadPrototype.show = fcd.utils.addCallListener( typeaheadPrototype.show, {
	before: function( props ) {
		props.self.$element.trigger({ type: 'typeaheadbeforeshow', typeahead: props.self });
	},
	after: function( props ) {
		props.self.$element.trigger({ type: 'typeaheadshow', typeahead: props.self });
	}
});
	
typeaheadPrototype.select = fcd.utils.addCallListener( typeaheadPrototype.select, {
	after: function( props ) {
		props.self.$element.trigger({ type: 'typeaheadselect', typeahead: props.self });
	}
});
'''