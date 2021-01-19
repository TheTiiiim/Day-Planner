$(function () {
	displayDate();
	createTimeBlocks();


	function createTimeBlocks(day = dayjs()) {
		let $blockArea = $(".blockArea");

		for (let i = 0; i < 9; i++) {
			// use hours 9 to 5
			let hour = dayjs().hour(i + 9);

			let tenseClass = ""
			// determine relationship between represented hour and current hour
			if (day.isAfter(hour, "hour")) {
				tenseClass = "past";
			} else if (day.isSame(hour, "hour")) {
				tenseClass = "present";
			} else if (day.isBefore(hour, "hour")) {
				tenseClass = "future";
			} else {
				throw new Error("given time somehow is not past, present, or future");
			}

			// add time-block
			$blockArea.append($("<div>")
				.addClass("row time-block " + tenseClass)

				// hour column
				.append($("<div>")
					.addClass("hour col-1")
					.append($("<p>")
						.text(hour.format("h a"))
					)
				)

				// text column
				.append(
					$("<textarea>")
						.addClass("col description")
				)

				// save button
				.append($("<div>")
					.addClass("saveBtn col-1")
					.append($("<i>")
						.addClass("fas fa-save")
					)
				)
			)
		}
	}

	// displays the date at the top of the webpage
	function displayDate(day = dayjs()) {

		// format date
		let displayString = day.format("dddd[,] MMMM D")
			// add ordinal indicator
			+ getOrdinalIndicator(day.date());

		// display to page
		$(".currentDay").text(displayString);

		// return the text that was displayed
		return displayString;
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