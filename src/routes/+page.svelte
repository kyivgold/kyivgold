<script lang="ts">
	import TelegramLogin from '$lib/components/telegram/TelegramLogin.svelte';
	const { isMobile } = $props();
</script>

<h3>{isMobile ? 'Mobile' : 'PC'}</h3>

<TelegramLogin />
