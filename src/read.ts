import { fetchJSON } from "./api";
import { rtl } from "./global";

export async function readSurah(num: number) {
	const url = `https://api.alquran.cloud/v1/surah/${num}/ar`;
	const json: any = await fetchJSON(url);

	const surah = json.data;

	let output = `\n${surah.englishName} (${surah.name})\n\n`;

	for (const ayah of surah.ayahs) {
		output += `${ayah.numberInSurah}. ${ayah.text}\n`;
	}

	return output;
}

export async function readRandomSurah() {
	// RANDOM AYAH //
	const min = 1;
	const max = 114;
	const num = Math.floor(Math.random() * (max - min + 1)) + min;

	// PUTTING THE NUMBER IN THE API URL //
	const url = `https://api.alquran.cloud/v1/surah/${num}/ar`;
	const json: any = await fetchJSON(url);

	const surah = json.data;

	let output = `\n${surah.englishName} (${surah.name})\n\n`;

	for (const ayah of surah.ayahs) {
		output += `${ayah.numberInSurah}. ${ayah.text}\n`;
	}

	return output;
}

