/**
* Provided without license, as is.
*
* @program styles.js
*
* @author juanvallejo
* @date 10/7/14
*
* Apply basic styles for specific app templates
*
* Note: this script styles the elements on the page dynamically
* based on changing document dimensions, varying screen sizes. 
**/

/**
 * Define object that will hold dynamic event data as arrays of functions
 * that get called on a window event.
**/
var events = {
	windowLoad:[],
	windowResize:[],
	windowScroll:[]
};

/**
 * Add event listeners to the "window" object and loop through arrays
 * of functions stored in the keys of our "events" object defined above.
**/
window.addEventListener('load', function() {
	events.windowLoad.forEach(function(eventFunction) {
		eventFunction.call(this);
	});
});

window.addEventListener('resize', function() {
	events.windowResize.forEach(function(eventFunction) {
		eventFunction.call(this);
	});
});

window.addEventListener('scroll', function() {
	events.windowScroll.forEach(function(eventFunction) {
		eventFunction.call(this);
	});
});


/** 
 * Sets the height of the wrapper based on current window heig ht
 * @windowHeight = current height of window 
**/
function setWrapperHeightTo(windowHeight) {
	windowHeight = windowHeight || window.innerHeight;		// sets windowHeight to current window size
 
	wrapper.style.height = windowHeight + 'px';				// sets wrapper style height to windowHeight in pixels
}

/**
 * Sets the position of a .circle div based on current window
 * dimensions.
 *
 * @positionArray 	= array of 2 elements containing [width, height]
 * @divElement 		= pointer to the div element to position
**/
function setElementPositionTo(positionArray, divElement) {
	divElement.style.left = positionArray[0] + 'px';		// sets divElement x position
	divElement.style.top = positionArray[1] + 'px';			// sets divElement y height
}

/**
 * Sets the rotation of an element div based on a given degree
 *
 * @degree 			= integer degree
 * @divElement 		= pointer to the div element to rotate
**/
function setElementRotationTo(degree, divElement) {
	divElement.style.transform = 'rotate('+degree+'deg)';				// rotates div
	divElement.style.webkitTransform = 'rotate('+degree+'deg)';			// rotates div on webkit browsers
}







