import * as blessed from "blessed";
import { listSurah } from "./src/surah";
import { readSurah } from "./src/read";

async function main() {
	const screen = blessed.screen({
		smartCSR: true,
		fullUnicode: true, // better Arabic support
	});

	screen.title = "Quran CLI";

	// Quit with Ctrl+C
	screen.key(["C-c"], () => process.exit(0));

	async function mainMenu() {
		// Clear screen
		screen.children.forEach((c) => c.destroy());

		const menu = blessed.list({
			top: "center",
			left: "center",
			width: "50%",
			height: "50%",
			items: ["List Surahs", "Read Surah", "Exit"],
			keys: true,
			vi: true,
			mouse: true,
			border: { type: "line" },
			style: {
				selected: { bg: "black", fg: "white" },
				item: { fg: "white" },
				border: { fg: "#f0f0f0" },
			},
		});

		screen.append(menu);
		menu.focus();
		screen.render();

		menu.on("select", async (item: blessed.Widgets.BlessedElement, index: number) => {
			const choice = item.getText();

			if (choice === "List Surahs") {
				await showListSurahs();
			} else if (choice === "Read Surah") {
				await promptSurahNumber();
			} else if (choice === "Exit") {
				process.exit(0);
			}
		});
	}

	async function showListSurahs() {
		screen.children.forEach((c) => c.destroy());

		const surahs: any = await listSurah(); // assume it returns string
		const box = blessed.box({
			top: "center",
			left: "center",
			width: "80%",
			height: "80%",
			content: surahs,
			scrollable: true,
			alwaysScroll: true,
			keys: true,
			vi: true,
			mouse: true,
			border: { type: "line" },
			scrollbar: { ch: " " },
			wrap: true,
			style: { fg: "white", bg: "black", border: { fg: "white" } },
		});

		screen.append(box);
		box.focus();
		screen.render();

		// Return to menu on q or escape
		await new Promise<void>((resolve) => {
			screen.key(["q", "escape"], () => resolve());
		});

		await mainMenu();
	}

	async function promptSurahNumber() {
		screen.children.forEach((c) => c.destroy());

		// Input box
		const promptBox = blessed.prompt({
			parent: screen,
			border: "line",
			height: "shrink",
			width: "50%",
			top: "center",
			left: "center",
			label: "Enter Surah Number (1-114)",
			keys: true,
			vi: true,
			tags: true,
		});

		promptBox.input("", "", async (err, value) => {
			const num = parseInt(value);
			if (!num || num < 1 || num > 114) {
				// invalid input
				await showMessage("Please enter a number between 1 and 114");
				await mainMenu();
			} else {
				await showSurah(num);
			}
		});

		screen.render();
	}


	async function showSurah(number: number) {
		screen.children.forEach((c) => c.destroy());

		let surah: any = await readSurah(number); // assume returns string

		const box = blessed.box({
			top: "center",
			left: "center",
			width: "80%",
			height: "80%",
			content: `${surah}`,
			scrollable: true,
			alwaysScroll: true,
			keys: true,
			vi: true,
			mouse: true,
			border: { type: "line" },
			scrollbar: { ch: " " },
			wrap: true,
			style: { fg: "white", bg: "black", border: { fg: "white" } }
		});

		screen.append(box);
		box.focus();
		screen.render();

		// Return to menu on q or escape
		await new Promise<void>((resolve) => {
			screen.key(["q", "escape"], () => resolve());
		});

		await mainMenu();
	}

	async function showMessage(msg: string) {
		screen.children.forEach((c) => c.destroy());

		const box = blessed.message({
			parent: screen,
			top: "center",
			left: "center",
			width: "50%",
			height: "shrink",
			border: "line",
			style: { fg: "white", bg: "red", border: { fg: "#f0f0f0" } },
		});

		await new Promise<void>((resolve) => {
			box.display(msg, 3, () => resolve());
		});
	}

	// Start the menu
	await mainMenu();
}
main();
