<script lang="ts">
    import { goto } from "$app/navigation";
    import AboutDesktop from "$lib/assets/pages/about/aboutDesktop.svelte";

    let innerWidth = $state(0);
    let isMobile = $derived(innerWidth <= 768);

    $effect(() => {
        if (isMobile) goto("/");
    })
</script>

<svelte:window bind:innerWidth />

{#if !isMobile}
    <AboutDesktop />
{/if}
