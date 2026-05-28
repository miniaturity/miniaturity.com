<script lang="ts">

</script>

<div class="page">

    <div class="card">
        <div class="text">
            <header>
                miniaturity
            </header>

            <footer>
                ...a game/front-end dev based in nyc 
                <br />unity, svelte, react, tauri
            </footer>
        </div>

        <div class="buttons">
            <button id="projects">
                <div id="p-content">projects</div>
            </button>
        </div>
    </div>

</div>

<style lang="scss">

    :global(body) {
        margin: 0; padding: 0;
        width: 100vw; height: 100vh;
    }

    .page {
        width: 100vw; height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center; justify-content: center;
    }

    .card {
        --w: clamp(370px, 45vw, 700px);
        position: relative;
        aspect-ratio: 6 / 7;
        width: var(--w);
        background-image: url("$lib/assets/images/gxsc_poster.jpg");
        background-size: 100% 100%;
        background-repeat: repeat;
        font-family: "TE-20";
        
        overflow: hidden;
    }

    .text {
        width: 100%; height: 100%;
        position: absolute;
        top: 0; left: 0;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .text header {
        color: #fff;
        opacity: 0.8;

        font-size: 4rem;
        
        margin: 16px 24px;
    }

    .text footer {
        color: #000;
        justify-self: end;
        margin: 24px;
    }

    .buttons {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
    }

    .buttons #projects {
        --nw: calc(var(--w) / 4);
        position: absolute;
        border: none;
        font-family: "TE-20";
        background-image: url("$lib/assets/images/garden.jpg");
        background-position: -50% -50%;
        color: #fff;
        top: 15%; left: 50%;
        aspect-ratio: 3 / 2;
        width: var(--nw); 
        display: flex;
        align-items: end;
        cursor: pointer;
        font-size: 1.4rem;
        padding: 0;

        &::after {
            content: '';
            position: absolute;
            left: 0; top: 0;
            width: 100%; height: 100%;
            background-color: #fff;
            opacity: 0.2;
            transition: opacity 0.2s ease-in-out;
        }

        &:hover {
            &::after {
                opacity: 0;
            }
        }

        & #p-content {
            box-sizing: border-box;
            width: 100%; height: 100%;
            margin: 4px;
            border: 1px solid #fff;
            display: flex;
            align-items: end;
            padding: 4px;
        }
    }

    @media screen and (max-width: 480px) {
        .text header {
            font-size: 2rem;
        }

        .buttons #projects{
            font-size: 0.9rem;
        }
    }

</style>