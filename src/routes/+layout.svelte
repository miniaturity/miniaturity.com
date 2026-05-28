<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style lang="scss">
	@font-face {
		font-family: "TE-20";
		src: url("$lib/assets/fonts/TE-20.ttf");
	}
</style>
