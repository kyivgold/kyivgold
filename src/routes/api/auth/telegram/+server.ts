// src/routes/api/auth/telegram/+server.ts
import type { RequestHandler } from './$types';
import { sessions } from '$lib/types/sessions';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const { telegramId, username, sessionId } = data;

	if (!sessionId || !telegramId) {
		return new Response(
			`Missing data telegramId:'${telegramId}' username:'${username}' sessionId:'${sessionId}'`,
			{ status: 400 }
		);
	}

	sessions[sessionId] = {
		telegramId,
		username,
		authorized: true
	};

	console.log('User authorized:', sessions[sessionId]);

	return new Response('OK');
};
