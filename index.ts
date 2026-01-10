import inquirer from "inquirer";
import * as blessed from "blessed"
import { listSurah } from "./src/surah";
import { readSurah } from "./src/read";

async function main() {
	const screen = blessed.screen({
		smartCSR: true,
	});

	screen.title = "Quran Cli";

	const { action } = await inquirer.prompt({
		type: "list",
		name: "action",
		message: "Quran CLI - Choose Option",
		choices: ["List Surahs", "Read Surah", "Exit"],
	});
	if (action == "List Surahs") {
		await listSurah();
	} else if (action == "Read Surah") {
		const { number } = await inquirer.prompt({
			type: "number",
			name: "number",
			message: "Enter Surah Number (1-114)",
		});
		let surah: any = await readSurah(number);

		let displayingBox = blessed.box({
			top: 'center',
			left: 'center',
			width: '50%',
			height: '50%',
			content: surah,
			tags: true,
			border: {
				type: 'line'
			},
			style: {
				fg: 'white',
				bg: 'magenta',
				border: {
					fg: '#f0f0f0'
				},
				hover: {
					bg: 'green'
				}
			}
		});

		screen.append(displayingBox);
		screen.render();
	}
	else if (action == "Exit") {
		process.exit(0);
	}
}
main();
