<script lang="ts">
    import CD from "$lib/assets/images/cd.png";
    import CDHOLDER from "$lib/assets/images/cdholder.jpg";

    let container = $state<HTMLDivElement>();
    let pos = $state<{x: number, y: number}>({ x: 0, y: 0});
    let posPercent = $state<{px: number, py: number}>({ px: 0, py: 0 });
    let mouseInBounds = $state<boolean>(false);

    function handleMouseMove(e: MouseEvent) {
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const rx = e.clientX - rect.left, ry = e.clientX - rect.top;

        pos.x = rx;
        pos.y = ry;
        
        posPercent.px = (rx / rect.width) * 100;
        posPercent.py = (ry / rect.height) * 100;
    }


    function handleMouseEnter() {
        mouseInBounds = true;
    }

    function handleMouseLeave() {
        mouseInBounds = false;
    }
</script>

<div
style="position: absolute; bottom: 0; left: 0;"
>x: {posPercent.px} y: {posPercent.py}</div>
<div class="cd-graphic" 
bind:this={container}
onmousemove={handleMouseMove}
onmouseenter={handleMouseEnter}
onmouseleave={handleMouseLeave}
role="none"
>
    
    <img alt="" src={CD} id="cd"/>
    <img alt="" src={CDHOLDER} id="cdholder"/>
</div>

<style lang="scss">
    .cd-graphic {
        position: absolute;
        top: 30%;
        right: -5%;
        width: fit-content;

        &:hover {
            transform: rotateY(13deg) rotateX(13deg) rotateZ(-3deg);
        }
    }

    #cd {
        --nw: calc(var(--w) / 4);
        width: var(--nw);
        aspect-ratio: 1 / 1;
        position: absolute;
        right: calc(var(--nw) / 2);
        bottom: 0;
        transform: rotateZ(var(--rotation));
        animation: rotate 5s linear infinite;
        filter: sepia(1) hue-rotate(185deg);
    }

    #cdholder {
        --nw: calc(var(--w) / 4);
        width: var(--nw);
        aspect-ratio: 1 / 1;
        position: absolute;
        right: 0;
        bottom: 0;
    }

    @property --rotation {
        syntax: "<angle>";
        inherits: false;
        initial-value: 0deg;
    }

    @keyframes rotate {
        to { --rotation: 360deg; }
    }
</style>