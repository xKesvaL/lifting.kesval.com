<script>
	import HomeHeader from '$lib/components/home/HomeHeader.svelte';
	import HomeFoodCard from '$lib/components/home/HomeFoodCard.svelte';
	import HomeCalendar from '$lib/components/home/HomeCalendar.svelte';
</script>

<HomeHeader />
<section class="in-container">
	<HomeFoodCard />
	<HomeCalendar />
</section>
