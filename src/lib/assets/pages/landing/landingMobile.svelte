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
            <a id="projects" href="/projects">
                <div id="p-content">projects</div>
            </a>

            <a id="contact" href="/about">
                <div id="c-content">about/contact</div>
            </a>
        </div>

        <div class="deco-text">
            <div id="dc-content">
                <span>mini</span>
                <span>mini</span>
            </div>
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
        overflow: hidden;
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

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        pointer-events: none;

        & a {
            pointer-events: all;
        }
    }

    .buttons #projects, .buttons #contact {
        position: relative;        
        border: none;
        font-family: "TE-20";
        color: #fff;
        display: flex;
        align-items: end;
        cursor: pointer;
        font-size: var(--button-fs);
        padding: 0;
        
    }

    .buttons #projects {
        background-image: url("$lib/assets/images/garden.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 0 50%;
        box-sizing: border-box;
        width: 105%;
        height: 100px; 
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
        background-image: url("$lib/assets/images/subway.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 0 50%;
        
        width: 105%; 
        height: 100px; 
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
        top: -50%; left: 0;
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