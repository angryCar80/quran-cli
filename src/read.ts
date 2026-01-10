import { fetchJSON } from "./api";
import { rtl } from "./global";

export async function readSurah(num: number) {
	const url = `https://api.alquran.cloud/v1/surah/${num}/ar`;
	const json: any = await fetchJSON(url);

	const surah = json.data;

	let output = `\n${surah.englishName} (${surah.name})\n\n`;

	for (const ayah of surah.ayahs) {
		const arabicText = rtl(ayah.text);
		output += `${ayah.numberInSurah}. ${arabicText}\n`;
	}
	
	return output;
}

