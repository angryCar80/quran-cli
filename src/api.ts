export async function fetchJSON(url: string) {
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error("Faild to fetch data");
	}
	return res.json();
}
