import * as blessed from "blessed";

export function drawAyah() {
	const rightBar = blessed.box({
		top: "center",
		left: "left",
		width: "30%",
		height: "30%",
		content: "Random Surah Is Going To be displayed here", // TODO: Channge it later to a real content
		border: { type: "line" },
		wrap: true,
		style: { fg: "white", bg: "black", border: { fg: "white" } },
	});
	return rightBar;
}

