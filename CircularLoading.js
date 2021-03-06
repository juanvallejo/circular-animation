/**
* Provided without license, as is.
*
* @program circularLoading.js
*
* @author juanvallejo
* @date 10/7/14
*
* Circular 'loading' animation demo. Creates a clear-background circle
* and animates the 'fill' of its border without coloring its center.
*
* Note: this demo styles the elements on the page dynamically
* based on changing document dimensions, varying screen sizes. 
**/

(function() {

var circleMainInitialized = false;							// Tells program whether API has been called at least once.

var circleMain;												// main animation div, holds current div context
var circleMainPoints = [];									// array to hold all point segments to 'fill' circleMain

/**
 * Define circleMain constants
**/
var CIRCLEMAIN_MAX_POINT_AMOUNT = 900;									// total amount of segments to fill circleMain
var CIRCLEMAIN_BORDER_WIDTH = 7;										// width of the circleMain border
var CIRCLEMAIN_ANIMATION_SPEED = 1000 / 60;								// animation speed for 'loading' of circleMain
var CIRCLEMAIN_ANIMATION_RATE = 20;										// circles to fill at a time for circleMain animation

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

/**
 * creates and positions the "loading" segments that "fill" circleMain
**/
function createCircleMainComponents() {
	var point;												// declare point variable to hold each segment

	// creates CIRCLEMAIN_MAX_POINT_AMOUNT point segments and sets their position
	// around circleMain
	for(var i = 0; i < CIRCLEMAIN_MAX_POINT_AMOUNT; i++) {
		point = document.createElement('div');
		point.className = 'point';
		point.style.display = 'none';

		// add point to point array
		circleMainPoints.push(point);

		// append div to circleMain
		circleMain.appendChild(circleMainPoints[i]);

		setElementPositionTo(
			[
				(circleMain.clientWidth - CIRCLEMAIN_BORDER_WIDTH) / 2 + ((circleMain.clientWidth + CIRCLEMAIN_BORDER_WIDTH) / 2) * Math.sin(2 * Math.PI * i / CIRCLEMAIN_MAX_POINT_AMOUNT),
				(circleMain.clientWidth - CIRCLEMAIN_BORDER_WIDTH) / 2 + ((circleMain.clientWidth + CIRCLEMAIN_BORDER_WIDTH) / 2) * Math.cos(2 * Math.PI * i / CIRCLEMAIN_MAX_POINT_AMOUNT)
			],
			point
		);
	}
}

/**
 * Animate the 'loading' of circleMain with its points
 *
 * @animationRate = amount of points to 'display' at a time
 **/
function animateCircleMainComponents(animationRate, animationStop) {
	// semaphore indicating direction of animation
	var animationPositive = true;

	// make sure parameters are defined and have a set value
	animationRate = animationRate || 1;

	// if a value is passed for animationStop, convert it down to 360 degree scale
	// else, set animationStop for max allowed value.
	if(animationStop) {
		// tell whether animationStop is negative; if so, change animation
		// semaphore and turn value to positive integer
		if(animationStop < 0) {
			animationPositive = false;
			animationStop = Math.abs(animationStop);
		}

		// if animationStop is greater than 360, set it to 360 degrees
		// to avoid unnecessary 'filling'
		animationStop = animationStop > 360 ? 360 : animationStop;

		// use 360 degree scale for passed animationStop value
		animationStop = ((animationStop / 360 * 100) * CIRCLEMAIN_MAX_POINT_AMOUNT / 100);
	} else {
		animationStop = CIRCLEMAIN_MAX_POINT_AMOUNT;
	}

	// Isolate function by assigning anonymous function and
	// making count a field of anonymous function.
	(function animateCircleMainPoints() {
		// if count not started, start it.
		if(!animateCircleMainPoints.count) {
			animateCircleMainPoints.count = 0;
		}

		//display x points at a time depending on animationRate
		for(var i = 0; i < animationRate; i++) {
			if(animationPositive) {
				circleMainPoints[animateCircleMainPoints.count].style.display = 'inline';
			} else {
				circleMainPoints[circleMainPoints.length - animateCircleMainPoints.count - 1].style.display = 'inline';
			}

			animateCircleMainPoints.count++;
		}

		//make sure we haven't reached the end of 'loading' circle
		if(animateCircleMainPoints.count < animationStop) {
			animateCircleMainPoints.timeout = setTimeout(animateCircleMainPoints, CIRCLEMAIN_ANIMATION_SPEED);
		} else {
			// reset if end of circle reached
			animateCircleMainPoints.count = 0;
			clearTimeout(animateCircleMainPoints.timeout);
		}
	})();
}

/**
 * Define "main" or init function. Gets called immediately after document is loaded.
 * This is because this script is imported after every div declaration
**/
(function main() {
	//create our object 'API'
	function CircularLoading(circleMainObject) {
		// Save old value of CircleMain
		var tempCircleMain = circleMain;

		// Assign new value to circleMain
		circleMain = circleMainObject;

		// only begin program if circleMain has been previously set
		if(circleMain) {
			// initialize program if not previously called
			if(!circleMainInitialized) {
				circleMainInitialized = true;

				// prepare our new circleMain
				createCircleMainComponents();
			}

			//if a new dom object context is called, allocate it
			if(circleMainObject && circleMainObject != tempCircleMain) {
				circleMainInitialized = false;
			}
		} else {
			console.log('CircularLoadingError: A div has not been assigned to be used as a \'loading wrapper\'. Try passing one as a parameter.');
		}

		return CircularLoading;
	}

	//returns the current div object being used as circleMain
	CircularLoading.CircleMain = function() {
		return circleMain;
	};

	//returns the current div object being used as circleMain
	CircularLoading.animate = function(degreeLimit) {
		animateCircleMainComponents(CIRCLEMAIN_ANIMATION_RATE,degreeLimit);
	};

	//reset display state of circleMain points
	CircularLoading.reset = function() {
		for(var i = 0; i < CIRCLEMAIN_MAX_POINT_AMOUNT; i++) {
			circleMainPoints[i].style.display = 'none';
		}
	};

	//create global reference to our object 'API'
	window.CircularLoading = CircularLoading;
})();

})();






