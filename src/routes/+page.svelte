<script lang="ts">
	import TelegramLogin from '$lib/components/telegram/TelegramLogin.svelte';
	const { data } = $props();
	const { isMobile, ua } = data;

	console.log('ua', ua);
</script>

<h3>{isMobile ? 'Mobile' : 'PC'}</h3>
<h4>{ua}</h4>
<TelegramLogin />
