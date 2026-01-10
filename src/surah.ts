import { fetchJSON } from "./api";
import { rtl } from "./global";



export async function listSurah() {
	const data: any = await fetchJSON("https://api.alquran.cloud/v1/surah");
	process.stdout.setDefaultEncoding("utf8");

	data.data.forEach((s: any) => {
		const arabicName: string = rtl(s.name);
		console.log(
			`${s.number}. ${s.lengthName} (${arabicName})`
		);
	});
}
