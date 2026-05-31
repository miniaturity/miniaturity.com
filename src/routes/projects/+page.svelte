<script lang="ts">
    import { goto } from "$app/navigation";
    import ProjectsDesktop from "$lib/assets/pages/projects/projectsDesktop.svelte";

    let innerWidth = $state(0);
    let isMobile = $derived(innerWidth <= 768);

    $effect(() => {
        if (isMobile) goto("/");
    })
</script>

<svelte:window bind:innerWidth />

{#if !isMobile}
    <ProjectsDesktop />
{/if}
