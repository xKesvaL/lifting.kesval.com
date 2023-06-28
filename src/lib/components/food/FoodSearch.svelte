<script lang="ts">
	import { useQueryClient, createQuery } from '@tanstack/svelte-query';
	import type { FoodSearchResult } from '$lib';
	import { searchFood } from '$lib/data/food';
	import { _ } from 'svelte-i18n';
	import { IconSearch } from '@tabler/icons-svelte';

	const client = useQueryClient();

	let query = '';
	let page = 1;
	let timeout;
	let input;

	const handleSearch = (data: { delay: number }) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			page = 1;
			query = input.value;
		}, data.delay);
	};

	let test;
	$: if (query != '')
		test = createQuery<FoodSearchResult, Error>({
			queryKey: ['food', query, page],
			queryFn: () =>
				searchFood(query, {
					page,
					page_size: 50
				}),
			keepPreviousData: true
		});

	$: console.log($test?.data);
</script>

<div class="form-control relative" role="search">
	<input
		type="text"
		placeholder={$_('common.search')}
		class="input-bordered input-primary input mx-auto w-full"
		bind:this={input}
		on:input={() => handleSearch({ delay: 1500 })}
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				handleSearch({ delay: 0 });
			}
		}}
	/>
	<button
		class="btn-accent btn-square btn absolute bottom-1 right-1 top-1 !h-10 !min-h-0 !w-10"
		on:click={() => {
			handleSearch({ delay: 0 });
		}}
	>
		<IconSearch />
	</button>
</div>
{#if !$test || $test.status === 'loading'}
	a
{:else if !$test?.data || !$test?.data?.products}
	{$_('common.noResults')}
{:else}
	<div class="pb-16 md:pb-0">
		{#each $test?.data?.products as product}
			{#if product.product_name}
				<label class="label cursor-pointer">
					{product.product_name}
					<input
						type="checkbox"
						name="food"
						class="checkbox-primary checkbox"
						value={product.code}
					/>
				</label>
			{/if}
		{/each}
		<div>
			<button
				class="btn-primary btn"
				on:click={() => {
					page--;
				}}
			>
				{$_('common.previous')}
			</button>
			<button
				class="btn-primary btn"
				on:click={() => {
					page++;
				}}
			>
				{$_('common.next')}
			</button>
		</div>
	</div>
{/if}
