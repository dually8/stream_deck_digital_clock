/**
 * Simple Clock with adjustable colors (heavily inspired by kirupa: https://www.kirupa.com/html5/create_an_analog_clock_using_the_canvas.htm)
 * @param {canvas} canvas an existing canvas element in the DOM
 * API:
 * - drawClock() -> draws the clock - would normally called every second
 * - getImageData() -> returns base64-encode string of the canvas
 * - setColors(jsonObj) -> set colors of the clock's components as JSON
 * 		{
 *			hour:	"#efefef",
 *			minute: "#cccccc",
 *			second: "#ff9933",
 *			stroke: "#cccccc",
 *			background: "#000000"
 *		}
 * - getColors() -> get current color values
 */

function Clock(canvas) {
	if (!canvas) return;
	var ctx = canvas.getContext('2d');
	var colors = {};

	resetColors();

	function resetColors() {
		setColors({
			hour: "#efefef",
			minute: "#cccccc",
			second: "#ff9933",
			stroke: "#cccccc",
			background: "#000000"
		});
	}

	function drawClock() {
		const time = new Date().toLocaleTimeString("en-US");
		const hours = time.split(":")[0];
		const minutes = time.split(":")[1];

		drawBackground();
		drawHoursAndMinutes(hours, minutes);
	}

	function drawBackground() {
		if (colors.background == "transparent") {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		} else {
			ctx.fillStyle = colors.background;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}
	}

	function drawHoursAndMinutes(hours, minutes) {
		const x = canvas.width / 2;
		const y = canvas.height / 2;
		ctx.fillStyle = colors.hour;
		ctx.font = '95px sans-serif';
		ctx.textAlign = 'right';
		ctx.fillText(hours, x * 2, y - 3);
		ctx.fillText(':' + minutes, x * 2, y * 2 - 3);
	}

	function setColors(jsnColors) {
		(typeof jsnColors === 'object') && Object.keys(jsnColors).map(c => colors[c] = jsnColors[c]);
	}

	function getColors() {
		return this.colors;
	}

	function getImageData() {
		return canvas.toDataURL();
	}

	return {
		drawClock: drawClock,
		getImageData: getImageData,
		setColors: setColors,
		getColors: getColors,
		colors: colors,
		resetColors: resetColors
	}
}
