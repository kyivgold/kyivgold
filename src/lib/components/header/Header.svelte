<script lang="ts">
	import ActionIcon from '$lib/ui/ActionIcon.svelte';
	import Logo from '$lib/components/icons/Logo.svelte';
	import Login from '$lib/components/icons/Login.svelte';
	import Menu from '$lib/components/menu/Menu.svelte';
	import MenuButton from '$lib/components/menu/MenuButton.svelte';

	let isMenuOpen = $state(false);
	function closeMenu() {
		isMenuOpen = false;
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<div class="header-block">
	<div class="header-content">
		<div class="logo-menu">
			<div class="logo">
				<ActionIcon icon={Logo} stretch={true} href="/" />
			</div>
			<div class="menu-block">
				<MenuButton {isMenuOpen} {toggleMenu} />
				<Menu {isMenuOpen} close={closeMenu} />
			</div>
		</div>
		<div class="icon">
			<ActionIcon icon={Login} href="/login" />
		</div>
	</div>
</div>

<style>
	.header-block {
		width: 100%;
		height: 54px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.header-content {
		color: var(--main-color);
		margin: 0px auto;
		padding: 0px 8px;
		max-width: 1024px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo-menu {
		display: flex;
		align-items: center;
	}

	.logo {
		margin-right: 8px;
		width: 40px;
		height: 40px;
	}

	.menu-block {
		position: relative;
		flex-shrink: 0;
	}

	.icon {
		width: 32px;
		height: 32px;
	}
</style>
