<script lang="ts">
	import { onMount } from 'svelte';
	import QrCode from 'svelte-qrcode';

	const { isMobile } = $props();

	let authorized = $state(false);
	let error = $state(false);
	let sessionId = $state('');
	let waiting = $state(false);

	const sseLink = $derived(`/api/auth/sse?sessionId=${sessionId}`);
	const loginLink = $derived(`https://t.me/kyivgoldbot?start=id_${sessionId}`);

	let evtSource: EventSource | null = null;

	onMount(() => {
		// Генерируем уникальный ID только на клиенте
		sessionId = crypto.randomUUID();

		// Автоматически запускаем SSE на десктопе, как только ID сгенерирован
		if (!isMobile) {
			startLogin();
		}

		// Функция очистки (выполняется при уничтожении компонента)
		return () => {
			if (evtSource) {
				evtSource.close();
				console.log('SSE connection closed on unmount.');
			}
		};
	});

	function startSSE() {
		if (!sessionId) {
			console.error('Session ID not ready.');
			return;
		}

		console.log('startSSE');

		waiting = true;
		error = false;

		if (evtSource) {
			evtSource.close();
		}

		console.log(sseLink);
		evtSource = new EventSource(sseLink);

		// Обработчик успешной авторизации
		evtSource.addEventListener('authorized', (event) => {
			const data = JSON.parse(event.data);
			console.log('User authorized:', data);

			authorized = true;
			waiting = false;
			evtSource?.close();
			evtSource = null;
		});

		// Обработчик ошибок SSE (потеря соединения, ошибка сервера и т.д.)
		evtSource.onerror = () => {
			console.error('SSE connection lost or error occurred');
			error = true;
			waiting = false;
			evtSource?.close();
			evtSource = null;
		};
	}

	/**
	 * Основная функция запуска логина.
	 * На мобильном открывает окно, на десктопе просто запускает SSE.
	 */
	function startLogin() {
		// Открытие ссылки только на мобильном (для переключения в приложение Telegram)
		if (isMobile) {
			window.open(loginLink, '_blank');
		}

		startSSE();
	}
</script>

{#if authorized}
	<p>Вы авторизовані ✅</p>
{:else if error}
	<div class="error-message">
		<p>Помилка підключення.</p>
		<button
			onclick={() => {
				sessionId = crypto.randomUUID(); // Генерируем новый ID сразу
				startLogin();
			}}
		>
			Перезапустити авторизацію
		</button>
	</div>
{:else if isMobile}
	<button onclick={startLogin}>Авторизація за допомогою Telegram</button>
	{#if waiting}
		<p>Очікуємо підтвердження в Telegram...</p>
	{/if}
{:else if sessionId}
	<div class="qrcode-block">
		<QrCode value={loginLink} errorCorrection="H" size={250} />
		{#if waiting}
			<p>Очікуємо підтвердження в Telegram...</p>
		{:else}
			<p>Запуск авторизації...</p>
		{/if}
	</div>
{:else}
	<p>Завантаження даних...</p>
{/if}

<style>
	.qrcode-block {
		margin: 20px auto;
		text-align: center;
	}

	.error-message {
		padding: 15px;
		background-color: #fdd;
		border: 1px solid #c00;
		color: #c00;
		border-radius: 4px;
		text-align: center;
	}
</style>
