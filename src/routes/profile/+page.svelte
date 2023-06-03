<script lang="ts">
	import { getContext } from 'svelte';

	let user = getContext('user');
</script>

{$user.email}
