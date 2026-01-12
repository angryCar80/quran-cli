import { fetchJSON } from "./api";
import { rtl } from "./global";

export async function listSurah() {
	const data: any = await fetchJSON("https://api.alquran.cloud/v1/surah");
	process.stdout.setDefaultEncoding("utf8");

	let output = "";
	data.data.forEach((s: any) => {
		output += `${s.number}. ${s.englishName} (${s.name})\n`;
	});

	return output;
}
