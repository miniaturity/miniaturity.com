<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style lang="scss">
	:global(:root) {
		interpolate-size: allow-keywords;
	}

	@font-face {
		font-family: "TE-20";
		src: url("$lib/assets/fonts/TE-20.ttf");
	}

	@font-face {
		font-family: "bjork";
		src: url("$lib/assets/fonts/bjork.ttf");
	}

	@font-face {
		font-family: "HelveticaNeue";
		src: url("$lib/assets/fonts/HelveticaNeueLight.otf");
		font-weight: lighter;
	}

	@font-face {
		font-family: "HelveticaNeue";
		src: url("$lib/assets/fonts/HelveticaNeueMedium.otf");
	}

	@font-face {
		font-family: "HelveticaNeue";
		src: url("$lib/assets/fonts/HelveticaNeueThin.otf");
		font-weight: 100;
	}

	@font-face {
		font-family: "Dot";
		src: url("$lib/assets/fonts/DOTMATRI.TTF");
	}

	@font-face {
		font-family: "PlanetKosmos";
		src: url("$lib/assets/fonts/plank.ttf");
	}
</style>
