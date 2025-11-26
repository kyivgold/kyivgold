<script lang="ts">
	import { onMount } from 'svelte';
	let state: string;
	let waiting = false;

	onMount(() => {
		state = crypto.randomUUID(); // login_ABC123
	});

	function startLogin() {
		waiting = true;

		// Открываем Telegram через ссылку с уникальным state
		window.open(`https://t.me/kyivgoldbot?start=${state}`, '_blank');

		// Подключаем SSE для отслеживания подтверждения
		const evtSource = new EventSource(`/api/auth/sse?state=${state}`);

		evtSource.addEventListener('authorized', (event) => {
			const data = JSON.parse(event.data);
			console.log('User authorized:', data);
			evtSource.close();
			// Редирект на профиль после успешной авторизации
			window.location.href = '/profile';
		});

		evtSource.onerror = () => {
			console.error('SSE connection lost');
			evtSource.close();
		};
	}
</script>

{#if !waiting}
	<button on:click={startLogin}> Login via Telegram </button>
{:else}
	<p>Ждём подтверждения в Telegram...</p>
{/if}
