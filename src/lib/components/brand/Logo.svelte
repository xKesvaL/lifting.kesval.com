<script lang="ts">
	import common from '$lib/data/common';

	export let animated = true;

	export let size: 'normal' | 'semi-large' | 'large' = 'normal';

	export let origin: 'center' | 'left' = 'center';

	export let repeat = false;
</script>

<div
	class="flex h-full w-auto items-center justify-center gap-2 sm:gap-4 {size} {origin}"
	class:animated
	class:repeat
>
	<svg
		class="flex h-full max-h-7 w-auto justify-center text-center"
		width="820"
		height="116"
		viewBox="0 0 723.84009 116.720269"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<text transform="translate(-300,-206)" class="fill-base-content transition-all duration-300"
			><tspan x="275" y="292"
				><tspan style="font-size:107px;font-family:'benz',serif;">
					{common.appName}
				</tspan></tspan
			></text
		>
	</svg>
</div>

<style lang="postcss">
	.animated text {
		--text-color: hsl(var(--bc));
		stroke-width: 2;
	}

	.animated text {
		animation: svg-text-stroke 2s;
	}

	.animated.repeat text {
		animation-iteration-count: infinite;
		animation-direction: alternate;
	}

	.semi-large {
		scale: 1.5;
	}

	.large {
		scale: 2;
	}

	.left {
		transform-origin: left;
	}
</style>
