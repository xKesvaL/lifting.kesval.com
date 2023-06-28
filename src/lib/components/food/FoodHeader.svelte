<script lang="ts">
	import { IconChevronLeft, IconDotsVertical } from '@tabler/icons-svelte';
</script>

<header class="in-container in-header flex items-center gap-2 text-2xl">
	<a href="/" class="btn-ghost btn-circle btn">
		<IconChevronLeft />
	</a>
	<div>Food</div>
	<details class="dropdown-end dropdown ml-auto">
		<summary class="btn-ghost btn-circle btn m-1 border-none bg-transparent">
			<IconDotsVertical />
		</summary>
		<ul class="dropdown-content rounded-box z-[1] bg-base-200 p-2 text-lg">
			<li class="btn-ghost btn"><a href="/settings/food?from=food">Settings</a></li>
		</ul>
	</details>
</header>
