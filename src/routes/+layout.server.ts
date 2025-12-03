import { API_SERVER_URL, API_KEY } from '$env/static/private';
import type { InitData } from '$lib/types/types';

import { error } from '@sveltejs/kit';

interface ExpectedApiData {
	products: unknown;
	categories: unknown;
	[key: string]: unknown;
}

function validateApiData(data: unknown): InitData {
	if (!data || typeof data !== 'object' || Array.isArray(data)) {
		throw new Error("Помилка валідациї даних: відповідь API не являє собою коректний об'єкт.");
	}

	const apiData = data as ExpectedApiData;

	if (!Array.isArray(apiData.products)) {
		throw new Error("Помилка валідациї даних: відсутній або некоректний масив 'products'.");
	}

	if (!Array.isArray(apiData.categories)) {
		throw new Error("Помилка валідациї даних: відсутній або некоректний массив 'categories'.");
	}

	return { ...apiData } as InitData;
}

export async function load({ fetch }) {
	let response;
	const requestOptions = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'API-Key': API_KEY
		},
		body: JSON.stringify({})
	};

	try {
		response = await fetch(`https://${API_SERVER_URL}/workshop/hs/store/initdata`, requestOptions);
	} catch (e) {
		console.error('Network or critical fetch error:', e);
		throw error(503, { message: 'Не вдалося підключитися до серверу даних (мережа недоступна).' });
	}

	if (!response.ok) {
		console.error(`API returned error status: ${response.status} ${response.statusText}`);
		throw error(response.status, {
			message: `Помилка API. Статус: ${response.status} ${response.statusText}`
		});
	}

	try {
		const allData = await response.json();

		const validatedData = validateApiData(allData);

		const products = validatedData.products.map((item) => ({
			...item,
			imageUrl: item.imgUrl || '/nophoto.png'
		}));
		return { store: { ...validatedData, products } };
	} catch (e) {
		console.error('Error parsing JSON:', e);
		throw error(500, {
			message: 'Помилка обробки отриманої відповіді (некоректний JSON).'
		});
	}
}
