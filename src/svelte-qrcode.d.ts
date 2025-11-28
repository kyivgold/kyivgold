// src/types.d.ts

// Эта декларация сообщает TypeScript, что модуль 'svelte-qrcode' существует
// и экспортирует класс QrCode, который наследуется от SvelteComponent.

declare module 'svelte-qrcode' {
	import { SvelteComponent } from 'svelte';

	// Определяем основные свойства, которые вы используете
	export default class QrCode extends SvelteComponent<{
		value: string;
		size?: number;
		errorCorrection?: 'L' | 'M' | 'Q' | 'H';
		color?: { dark: string; light: string };
	}> {}
}
