<script lang="ts">
	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import { loadAppData } from '$lib/store/appStore.svelte.js';
	import '$lib/global.css';
	let { children, data } = $props();
	const { products, categories } = data.store;
	loadAppData(products, categories);
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.svg" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content=" - Доставка суші в Києві" />
	<link rel="manifest" href="/site.webmanifest" />
	<script async src="https://telegram.org/js/telegram-widget.js?21"></script>
	<title>Kyivgold: ювелірні вироби із золота та срібла за ціною від виробника</title>
</svelte:head>

<Header />
{@render children()}
<Footer />
