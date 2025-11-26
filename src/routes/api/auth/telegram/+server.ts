// src/routes/api/auth/telegram/+server.ts
import type { RequestHandler } from './$types';
import { sessions } from '$lib/sessions';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const { telegram_id, username, state } = data;

	if (!state || !telegram_id) {
		return new Response('Missing data', { status: 400 });
	}

	// Привязываем telegram_id к сессии с уникальным state
	sessions[state] = {
		telegram_id,
		username,
		authorized: true
	};

	console.log('User authorized:', sessions[state]);

	return new Response('OK');
};
