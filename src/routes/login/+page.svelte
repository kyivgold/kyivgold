<script lang="ts">
	import TelegramLogin from '$lib/components/auth/TelegramLogin.svelte';
	const { data } = $props();
	const { isMobile } = data;
</script>

<div class="logo-header">
	<h3>Авторизуватися за допомогою Telegram</h3>
</div>
<TelegramLogin {isMobile} />

<style>
	.logo-header {
		width: 100%;
		margin: 12px auto;
		text-align: center;
	}
</style>
