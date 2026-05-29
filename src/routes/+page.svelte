<script lang="ts">
    import LandingDesktop from "$lib/assets/pages/landing/landingDesktop.svelte";
    import LandingMobile from "$lib/assets/pages/landing/landingMobile.svelte";

    let innerWidth = $state(0);
    let isMobile = $derived(innerWidth <= 768);


</script>

<svelte:window bind:innerWidth />

{#if isMobile}
    <LandingMobile />
{:else}
    <LandingDesktop />
{/if}

