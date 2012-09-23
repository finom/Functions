# Function Call Event
This tiny method helps to catch result, number of calls, arguments and another information before, after, on sucess and on error call. It can be used for loggers and another things.

## How to use
You have to redefine target function like this:
```JavaScript
somefunction = Function.addCallListener( somefunction, {
    before: function(props) {
        // this handler calls before function call
    },
	
	after: function(props) {
        // this handler calls after function call (even if error is there)
    },

    success: function(props) {
        // this handler calls if function has been executed successfuly
    },

    error: function(props) {
        // this handler calls if function has been executed with exception
    }
});
```
'props' argument is an object that contains (values is example):
```JavaScript
{
	args: [], // an array of arguments that has been passed to the function,
	result: 'someresult', // value that returned,
	self: Window, // context where function has been executed,
	status: 'success', // 'success' or 'error',
	name: 'somefunction', // function name, not cross browser feature,
	errorNumber: 1, // number of calls that failed with exception,
	successNumber: 5, // number of succes calls,
	error: new Error // if function executed with exception
}
```

[Check it](http://jsfiddle.net/SGhzd/12/)

## Why is it needed?
Sometimes libs don't contain some functionality that you need. With Function.addCallListener you can add additional behavior to external functions without making changes to Javascript file or copying the function to change it.

For example Twitter Bootstrap Typeahead plugin doesn't include any event that runs before and after autocomplete list is shown. And you should make a shitcode to handle event when user chooses one item from the list.

The solution is like:
```JavaScript
var typeaheadPrototype = $.fn.typeahead.Constructor.prototype;
typeaheadPrototype.show = Function.addCallListener( typeaheadPrototype.show, {
	before: function( props ) {
		props.self.$element.trigger({ type: 'typeaheadbeforeshow', typeahead: props.self });
	},
	after: function( props ) {
		props.self.$element.trigger({ type: 'typeaheadshow', typeahead: props.self });
	}
});
	
typeaheadPrototype.select = Function.addCallListener( typeaheadPrototype.select, {
	after: function( props ) {
		props.self.$element.trigger({ type: 'typeaheadselect', typeahead: props.self });
	}
});

$( 'input.typeahead' ).on( 'typeaheadbeforeshow', somehandler );
```