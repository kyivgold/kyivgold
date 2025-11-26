// src/routes/api/auth/sse/+server.ts
import type { RequestHandler } from './$types';
import { sessions } from '$lib/sessions';

export const GET: RequestHandler = ({ url }) => {
	const state = url.searchParams.get('state');
	if (!state) return new Response('State required', { status: 400 });

	const stream = new ReadableStream({
		start(controller) {
			const check = setInterval(() => {
				const session = sessions[state];
				if (session?.authorized) {
					controller.enqueue(
						new TextEncoder().encode(`event: authorized\ndata: ${JSON.stringify(session)}\n\n`)
					);
					controller.close();
					clearInterval(check);
				}
			}, 500);
		}
	});

	return new Response(stream, {
		headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' }
	});
};
