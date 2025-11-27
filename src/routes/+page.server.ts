// +page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	const ua = request.headers.get('user-agent') || '';
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

	return { isMobile };
};
