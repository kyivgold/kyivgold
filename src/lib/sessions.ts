// src/lib/sessions.ts
interface Session {
	telegram_id?: number;
	username?: string;
	authorized?: boolean;
}

export const sessions: Record<string, Session> = {};
