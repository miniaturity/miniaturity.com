<script lang="ts">
    import BARCODE from "$lib/assets/images/barcodeb.jpg";
    import ARROW from "$lib/assets/images/arrow.png";
</script>

<div class="page">

    <div class="card">
        <div class="text">
            <header>
                miniaturity
            </header>

            <footer>
                ...a game/front-end dev 
                <br />unity, svelte, react, tauri
                <br />© miniaturity 2026
            </footer>
        </div>

        <div class="buttons">
            <button id="projects">
                <div id="p-content">projects</div>
            </button>

            <button id="contact">
                <div id="c-content">contact</div>
            </button>
        </div>

        <div class="deco-text">
            <div id="dc-content">
                <span>mini</span>
                <span>mini</span>
            </div>
        </div>

        <div class="stamp">
            <div id="s-upper">
                <div id="su-l">miniaturity</div>
                <div id="su-r">1C34A3</div>
            </div>
            <div id="s-lower">
                <img alt="" src={BARCODE}/>
            </div>
        </div>

        <div class="deco">
            #175
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

        background-repeat: repeat;
        background-size: 400px 400px;
    }

    .card {
        --w: clamp(370px, 35vw, 700px);
        position: relative;
        aspect-ratio: 6 / 7;
        width: var(--w);
        background-image: url("$lib/assets/images/gxsc_poster.jpg");
        background-size: 100% 100%;
        background-repeat: repeat;
        font-family: "TE-20";
        
        --button-fs: 1.4rem;
        forced-color-adjust: none;
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
        text-align: justify;
        text-align-last: justify;
        width: 170px;
    }

    .buttons {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;

        pointer-events: none;

        & button {
            pointer-events: all;
        }
    }

    .buttons #projects, .buttons #contact {
        --tt: 0.3s;
        transition: all var(--tt) ease-in-out, z-index 0s var(--tt);
        position: absolute;
        border: none;
        font-family: "TE-20";
        background-position: -50% -50%;
        color: #fff;
        display: flex;
        align-items: end;
        cursor: pointer;
        font-size: var(--button-fs);
        padding: 0;
        filter: drop-shadow(1px 1px 4px #000);
    }

    .buttons #projects {
        --nw: calc(var(--w) / 4);
        background-image: url("$lib/assets/images/garden.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;
        top: 15%; left: 50%;
        aspect-ratio: 3 / 2;
        width: var(--nw); 
        z-index: 1;
        
        

        &::after {
            content: '';
            position: absolute;
            left: 0; top: 0;
            width: 100%; height: 100%;
            background-color: #fff;
            opacity: 0.2;
            transition: opacity 0.2s ease-in-out;
            box-sizing: border-box;
        }

        &:hover {
            left: 0; top: 0;
            width: 100%; height: 100%;
            z-index: 1;
            transition: all var(--tt) ease-in-out, z-index 0s 0s;

            & #p-content {                
                font-size: 4rem;
            }

            &::after {
                opacity: 0;
                
            }
        }

        & #p-content {
            box-sizing: border-box;
            width: calc(100% - 8px); height: calc(100% - 8px);
            margin: 4px;
            border: 1px solid #fff;
            display: flex;
            position: absolute;
            top: 0; left: 0;
            padding: 0 6px;

            transition: all var(--tt) ease-in-out; 
        }
    }

    .buttons #contact {
        --nw: calc(var(--w) / 3);
        background-image: url("$lib/assets/images/subway.jpg");
        background-size: 100% 100%;
        top: 20%; left: 70%;
        aspect-ratio: 3 / 2;
        width: var(--nw); 
        z-index: 2;
     
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
            left: 0; top: 0;
            width: 100%; height: 100%;
            z-index: 1;

            & #c-content {
                font-size: 4rem;
            }

            &::after {
                opacity: 0;
                
            }
        }

        & #c-content {
            box-sizing: border-box;
            width: calc(100% - 8px); height: calc(100% - 8px);
            margin: 4px;
            border: 1px solid #fff;
            display: flex;
            position: absolute;
            top: 0; left: 0;
            padding: 0 6px;

            transition: all var(--tt) ease-in-out;
        }
    }

    .deco-text {
        width: 100%; height: 100%;
        position: absolute;
        top: 0; left: 0;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    }

    #dc-content {
        position: absolute;
        top: 20%;
        left: -15%;

        display: flex;
        justify-content: center;
        font-size: 20rem;
        color: #ffffff00;
        opacity: 0.4;
        -webkit-text-stroke: 2px #fff;
        overflow: hidden;
        font-family: "bjork";

        animation: scroll-ltr 12s linear infinite;

        & span {
            font-size: 20rem;
            white-space: nowrap;
            padding-right: 6rem;
        }
    }

    @keyframes scroll-ltr {
        from { transform: translateX(-50%); }
        to   { transform: translateX(0%);   }
    }

    .stamp {
        --nw: 140px;
        width: var(--nw);
        aspect-ratio: 8 / 4;
        border: 3px solid #000;
        background: #fff;
        position: absolute;
        left: -15%; bottom: 20%;

        display: flex;
        flex-direction: column;
        font-family: "HelveticaNeue";
        transform: rotateZ(2deg);
        z-index: 3;
    }

    #s-upper {
        border-bottom: 2px solid #000;

        display: flex;
        flex-direction: row;

        & div {
            padding: 4px;
        }

        & #su-l {
            border-right: 2px solid #000;
        }

        & #su-r {
            font-size: 0.8rem;
            font-weight: 100;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    #s-lower {
        display: flex;
        justify-content: center; align-items: center;
        

        & img {
            object-fit: cover;
            width: 100%; height: 100%;
        }
    }

    .deco {
        position: absolute;
        z-index: -1;
        top: -5%; left: -6%;
        display: flex;
        width: 100%;
        height: 30%;

        font-family: "HelveticaNeue";
        font-size: 4rem;
    }

    

    @media screen and (max-width: 480px) {
        .text header {
            font-size: 2rem;
        }

        .card {
            --button-fs: 0.9rem;
        }

        #dc-content {
            font-size: 14rem;
        }
    }

</style>