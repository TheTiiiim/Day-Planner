$(function () {
	displayDate();
	createTimeBlocks();

	// save event to localstorage
	$(".saveBtn").on("click", function (e) {
		let parent = $(this).parent();

		let hourSlot = parent.attr("data-hour");
		let data = parent.children("textarea").val();

		localStorage.setItem(hourSlot, data);
	});


	function createTimeBlocks(day = dayjs()) {
		let $blockArea = $(".blockArea");

		for (let i = 0; i < 9; i++) {
			// use hours 9 to 5
			let hourObj = dayjs().hour(i + 9);

			let tenseClass = ""
			// determine relationship between represented hour and current hour
			if (day.isAfter(hourObj, "hour")) {
				tenseClass = "past";
			} else if (day.isSame(hourObj, "hour")) {
				tenseClass = "present";
			} else if (day.isBefore(hourObj, "hour")) {
				tenseClass = "future";
			} else {
				throw new Error("given time somehow is not past, present, or future");
			}

			// add time-block
			$blockArea.append($("<div>")
				.addClass("row time-block " + tenseClass)
				.attr("data-hour", hourObj.hour())

				// hour column
				.append($("<div>")
					.addClass("hour col-1")
					.append($("<p>")
						.text(hourObj.format("h a"))
					)
				)

				// text column
				.append(
					$("<textarea>")
						.addClass("col description")
						// display corrosponding event in localstorage
						.text(localStorage.getItem(hourObj.hour()))
				)

				// save button
				.append($("<div>")
					.addClass("saveBtn col-1")
					.append($("<i>")
						.addClass("fas fa-save")
					)
				)
			);
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