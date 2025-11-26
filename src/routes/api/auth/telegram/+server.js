/** @type {import('./$types').RequestHandler} */
export async function GET({ url, cookies }) {
	// 1. Отримання даних із параметрів URL
	const authData = Object.fromEntries(url.searchParams);
	console.log(authData);
}
