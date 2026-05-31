<script lang="ts">
    import CD from "$lib/assets/images/cd.png";
    import CDHOLDER from "$lib/assets/images/cdholder.jpg";
    import Dialogue from "$lib/components/misc/dialogue.svelte";
    import Window from "$lib/components/window.svelte";
    import type { DialogueGraph, DialogueNode } from "$lib/types";
    import { type Project, PROJECTS } from "./projects";

    let coords = $state({ x: 0, y: 0 });
    let innerWidth = $state(0);
    let innerHeight = $state(0);
    let percent = $derived((coords.x / innerWidth) * 100);

    const DIALOGUE: DialogueGraph = {
        start: {
            id: "start",
            text: "hi! check out my projects and such here!",
            expression: "niko_83c",
            pausePoints: [
                {
                    index: 3,
                    ms: 0,
                    requiresNext: true,
                    expression: "niko_speak"
                }
            ],
            next: "info",
        },

        info: {
            id: "info",
            text: "click on the repo link to view the code!",
            expression: "niko"
        }
    }
    

    let currentDialogueID = $state<string>("start");
    let currentDialogueNode = $derived<DialogueNode>(DIALOGUE[currentDialogueID]);

        

    function next() {
        if (!currentDialogueNode.next) { currentDialogueID = "start"; return; }
        currentDialogueID = currentDialogueNode.next;
    }

    function handleMousemove(event: MouseEvent) {
        coords.x = event.clientX;
        coords.y = event.clientY;
    }

    function clamp(min: number, val: number, max: number) {
        return Math.max(min, Math.min(val, max));
    }

    let selectedProject = $state<number>(0);
    let project = $derived<Project | undefined>(PROJECTS.find((p) => p.id === selectedProject));
</script>

<svelte:window onmousemove={handleMousemove} bind:innerWidth bind:innerHeight />

<div class="page">
    <div class="card">
        <div class="overlay"
            style:background={`linear-gradient(${clamp(10, percent / 2, 210)}deg,rgba(208, 226, 247, 0.3) 2%, rgba(255, 255, 255, 0.9) ${clamp(10, percent, 90)}%, rgba(208, 226, 247, 0.3) 100%)`}
        ></div>

        <header>
            projects
        </header>

        <div class="niko">
            <Dialogue 
                dialogue={currentDialogueNode}
                flags={{}}
                onNext={next}
                finished={false}
                setRenderDialogue={() => {}}
            />
        </div>

        

        <div class="home">

        </div>
    </div>

</div>

<style lang="scss">


    :global(body) {
        margin: 0;
        width: 100vw; height: 100vh;
        overflow: hidden;
    }

    .page {
        width: 100vw; height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;

        --w: clamp(370px, 35vw, 700px);
        overflow: hidden;

    }

    .niko {
        --nw: calc(var(--w) / 2);
        width: var(--nw);
        aspect-ratio: 5 / 6;
        background-image: url("$lib/assets/images/nikosubway.png");
        background-size: cover;

        position: absolute;
        bottom: -5%;
        left: -6%;

        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        font-family: "terminus";
        filter: drop-shadow(1px 1px 4px #000);
    }

    .card {
        width: var(--w);
        aspect-ratio: 6 / 7;
    
        background-image: url("$lib/assets/images/bsubway.jpg");
        background-size: cover;
        position: relative;

        & .overlay {
            position: absolute;
            left: 0; top: 0;
            width: 100%; height: 100%;
            opacity: 0.3;
        }
    }
    
    @property --rotation {
        syntax: "<angle>";
        inherits: false;
        initial-value: 0deg;
    }

    @keyframes rotate {
        to { --rotation: 360deg; }
    }

    header {
        --nw: calc(var(--w) / 3);
        width: var(--nw);
        
        color: #fff;
        font-family: "TE-20";
        font-size: 4vw;
        padding: 1vw;
        padding-top: 0.5vw;
    }

</style>