<script lang="ts">
	import { onMount, tick } from 'svelte';

	const botUsername = 'kyivgoldbot';

	// URL для перенаправления после успешного входа
	// Это может быть ваш серверный эндпоинт, который будет проверять данные
	const redirectUrl = 'https://kyivgold.pp.ua/telegram/auth';

	onMount(async () => {
		// Убедитесь, что DOM обновлен перед попыткой найти контейнер
		await tick();

		// Создаем элемент скрипта
		const script = document.createElement('script');
		script.src = 'https://telegram.org/js/telegram-widget.js?21';
		script.async = true;

		// --- Настройка виджета ---

		// Обязательные атрибуты
		script.setAttribute('data-telegram-login', botUsername);

		// Выберите метод аутентификации:
		// 1. 'callback' - данные передаются в глобальную функцию (подходит для SPA)
		// script.setAttribute('data-onauth', 'window.telegramOnAuth');
		// 2. 'redirect' - перенаправление на указанный URL (подходит для SvelteKit с серверным эндпоинтом)
		script.setAttribute('data-auth-url', redirectUrl);

		// Необязательные атрибуты
		script.setAttribute('data-size', 'large'); // small, medium, large
		script.setAttribute('data-request-access', 'write'); // Запросить разрешение на отправку сообщений
		script.setAttribute('data-userpic', 'true'); // Показывать фото пользователя

		// Добавляем скрипт в контейнер
		const container = document.getElementById('telegram-login-container');
		if (container) {
			container.appendChild(script);
		}
	});

	// Если вы используете data-onauth (callback-метод)
	// Вам нужно объявить глобальную функцию, которую вызовет виджет.
	// Это нужно сделать вне Svelte-компонента (например, в +layout.svelte или app.html)
	// или использовать window.addEventListener/onMount для регистрации.

	// Пример глобальной функции для callback-метода (для data-onauth)
	// В Svelte-приложении вам, возможно, потребуется более сложная логика для
	// передачи данных в хранилище (store) Svelte.
	/*
  if (typeof window !== 'undefined') {
    (window as any).telegramOnAuth = (user: any) => {
      console.log('User data received:', user);
      // Здесь вы вызываете свой серверный эндпоинт для проверки `hash`
      // и создания сессии пользователя в вашем приложении.
      // fetch('/api/telegram-verify', { method: 'POST', body: JSON.stringify(user) })
    };
  }
  */
</script>

<div id="telegram-login-container"></div>

<style>
	/* Стили для контейнера, если нужны */
</style>
