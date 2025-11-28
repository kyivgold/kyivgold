// src/routes/api/auth/sse/+server.ts
import type { RequestHandler } from './$types';
import { sessions } from '$lib/sessions';

export const GET: RequestHandler = ({ url }) => {
	const sessionId = url.searchParams.get('sessionId');

	console.log('sessionId', sessionId);
	if (!sessionId) return new Response('State required', { status: 400 });

	const stream = new ReadableStream({
		start(controller) {
			const check = setInterval(() => {
				const session = sessions[sessionId];
				console.log('sessionId, session', sessionId, session);
				if (session?.authorized) {
					controller.enqueue(
						new TextEncoder().encode(`event: authorized\ndata: ${JSON.stringify(session)}\n\n`)
					);
					controller.close();
					clearInterval(check);
				}
			}, 1000);
		}
	});

	return new Response(stream, {
		headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' }
	});
};
