$(function () {

	displayDate();

	// displays the date at the top of the webpage
	function displayDate(day = dayjs()) {
		let dayDisplay = day.format("dddd[,] MMMM D")
			+ getOrdinalIndicator(day.date());
		$(".currentDay").text(dayDisplay);
	}

	// get the 'st', 'nd', 'rd', or 'th' for a number
	function getOrdinalIndicator(number) {
		// make sure function is working with a string
		if (!(typeof number === "string")) {
			number = number.toString();
		}
		// specifically set dates in the teens to 'th'
		if (number.length === 2 && number[0] === "1") {
			return "th";
		}
		// otherwise assign normal ordinal indicators
		switch (number[number.length - 1]) {
			case "1":
				return "st";
			case "2":
				return "nd";
			case "3":
				return "rd";
			default:
				return "th";
		}
	}
});