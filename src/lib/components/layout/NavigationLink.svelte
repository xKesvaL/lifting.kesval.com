<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	export let active: boolean;
</script>

<a
	{href}
	class="{active
		? 'active !border-primary bg-primary text-primary-content max-md:bg-base-200/30 md:border-r-2'
		: 'max-md:bg-base-100'} md:flex md:items-center md:gap-4 md:px-8 md:py-2 md:text-lg"
>
	<slot name="icon" />
	<span class="btm-nav-label"><slot /></span>
</a>
