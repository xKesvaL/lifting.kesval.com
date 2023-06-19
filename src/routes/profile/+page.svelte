<script lang="ts">
	import { getContext } from 'svelte';
	import Loading from '$lib/components/layout/Loading.svelte';

	let user = getContext('user');
</script>

{$user.email}
