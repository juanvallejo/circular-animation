/**
* Provided without license, as is.
*
* @program main.js
*
* @author juanvallejo
* @date 10/7/14
*
* initialize and execute main program
*
* Note: this code serves as template for future main.js files
**/

var wrapper = document.getElementById('wrapper');			// content wrapper #div

/** 
 * Sets the height of the wrapper based on current window heig ht
 * @windowHeight = current height of window 
**/
function setWrapperHeightTo(windowHeight) {
	windowHeight = windowHeight || window.innerHeight;		// sets windowHeight to current window size
 
	wrapper.style.height = windowHeight + 'px';				// sets wrapper style height to windowHeight in pixels
}

/**
 * Define "main" or init function. Gets called immediately after document is loaded.
 * This is because this script is imported after every div declaration. Function autoruns,
 * executing anything that is not event-based.
**/
(function main() {
	// Define and initialize our CircularLoading object API
	var CL = CircularLoading(document.getElementById('circleMain'));

	// Define function to call anytime the window is resized or loaded
	function centerElementPositions() {
		setWrapperHeightTo(window.innerHeight);				//sets wrapper height to the current window height

		//centers the position of div element "circleMain"
		setElementPositionTo(
			[
				(wrapper.clientWidth / 2) - (CL.CircleMain().clientWidth / 2),
				(wrapper.clientHeight / 2) - (CL.CircleMain().clientHeight / 2)
			], 
			CL.CircleMain()
		);
	}

	//reload circleMain animation on circleMain click
	CL.CircleMain().addEventListener('click', function() {
		CL.reset();
		CL.animate(270);
	});

	// Subscribe functions to window events, make sure program runs
	// only when 'window' object is fully loaded.
	events.windowResize.push(centerElementPositions);
	events.windowLoad.push(centerElementPositions);
})();







