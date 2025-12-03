<script>
	const {
		class: className = 'primary',
		title = 'Перейти до продукції',
		stretch = false,
		onclick,
		description = '',
		...restProps
	} = $props();
</script>

<button
	class={`btn-base ${className} ${stretch ? 'stretch' : ''}`}
	{onclick}
	title={description ? description : title}
	{...restProps}>{title}</button
>

<style>
	.btn-base {
		font-size: 1.2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px 24px 12px 24px;
		border-radius: 10px;
		border: none;
		cursor: pointer;
		text-decoration: none;
		transition:
			background-color 0.3s ease,
			box-shadow 0.3s ease;
	}

	.btn-base:disabled {
		background: #b6b6b6;
		color: #e0e0e0;
		cursor: not-allowed;
		box-shadow: none;
		opacity: 0.6;
	}

	.primary {
		color: white;
		background-color: var(--main-color, #e24511);
	}

	.primary:hover {
		background-color: var(--main-active-color);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	.primary:active {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		background-color: var(--main-active-color, #a8330c);
	}

	.secondary {
		color: black;
		background-color: var(--secondary-main-color);
	}

	.secondary:hover {
		filter: brightness(0.9); /* робить темніше на ~10% */
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	.stretch {
		width: 100%;
	}
</style>
