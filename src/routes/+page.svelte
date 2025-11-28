<script lang="ts">
	import TelegramLogin from '$lib/components/telegram/TelegramLogin.svelte';
	const { data } = $props();
	const { isMobile, ua } = data;
</script>

<h4>Авторизуватися за допомогою Telegram</h4>
<TelegramLogin {isMobile} />
