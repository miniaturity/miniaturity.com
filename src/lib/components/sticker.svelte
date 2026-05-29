<script lang="ts">
    import { draggable, type DragOptions } from "@neodrag/svelte";

    let {
        nextz = $bindable(),
        image,
        width,
        pos,
        rotation,
    }: {
        nextz: number,
        image: string,
        width?: number,
        pos?: [number, number],
        rotation?: number
    } = $props();

    let dragging = $state<boolean>(false);
    let z = $state<number>(66);
    
    // 250-1000 (ms)
    const delay = (Math.floor(Math.random() * (100 - 25 + 1)) + 25) * 10;


    function onDragStart() {
        dragging = true;
        z = nextz;
        nextz++;
    }

    const options: DragOptions = {
        onDragStart,
        onDragEnd: () => dragging = false
    }

</script>

<div class="anim-container"
    style:width={width ? `${width}px` : `auto`}
    style:left={pos?.[0] + "%"}
    style:top={pos?.[1] + "%"}
    style:animation-delay={delay + "ms"}
    style:transform={`rotateZ(${rotation}deg)`}
    style:z-index={z}
    use:draggable={options} 
>
    <div class={`${dragging && "dragging"} sticker`}
        >
        <img alt="" src={image} draggable="false"/>
    </div>
</div>

<style lang="scss">
    .sticker {
        height: auto;
        transition: scale 0.1s ease-in-out;

        &:hover {
            scale: 1.1;
            cursor: pointer;
        }

        & img {
            object-fit: cover;
            width: 100%; height: 100%;
        }
    }

    /* Workaround transitions not applying after forwards animation. */
    .anim-container {
        position: absolute;
        height: auto;
        animation: 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) in forwards;
        opacity: 0;
        pointer-events: all;
    }

    .dragging {
        scale: 1.3 !important;
        cursor: grabbing !important;
    }

    @keyframes in {
        0% {
            opacity: 0;
            scale: 1.1;
        } 50% {
            opacity: 1;
            scale: 1;
        } 75% {
            opacity: 1;
            scale: 1.02;
        } 100% { 
            opacity: 1;
            scale: 1;
        }
    }
</style>