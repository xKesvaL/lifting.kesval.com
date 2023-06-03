<script lang="ts">
	import { browser } from '$app/environment';

	import { IconSun, IconMoon } from '@tabler/icons-svelte';

	let theme = 'light';

	if (browser) {
		theme = localStorage.getItem('theme') || 'light';
	}

	function switchTheme() {
		if (theme === 'light') {
			theme = 'dark';
		} else {
			theme = 'light';
		}
		localStorage.setItem('theme', theme);
		document.documentElement.dataset.theme = theme;
	}
</script>

<button
	class="swap btn-ghost swap-rotate btn aspect-square w-fit rounded-full"
	on:click={switchTheme}
>
	<span class={theme === 'light' ? 'swap-off' : 'swap-on'}><IconSun /></span>
	<span class={theme === 'dark' ? 'swap-off' : 'swap-on'}><IconMoon /></span>
</button>
