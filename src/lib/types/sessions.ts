// src/lib/types/sessions.ts
interface Session {
	telegramId?: number;
	username?: string;
	authorized?: boolean;
}

export const sessions: Record<string, Session> = {};
