<script lang="ts">
    import ARROW from "$lib/assets/images/arrow.png";
    import BARCODE from "$lib/assets/images/barcodeb.jpg";

    import Sticker from "$lib/components/sticker.svelte";

    import s_midnight from "$lib/assets/images/stickers/hcmidnight.png";
    import s_hc from "$lib/assets/images/stickers/hcsticker.png";
    import s_inside from "$lib/assets/images/stickers/hcinsidesticker.png";
    import s_smelte from "$lib/assets/images/stickers/smelte.png";

    let coords = $state({ x: 0, y: 0 });
    let innerWidth = $state(0);
    let percent = $derived((coords.x / innerWidth) * 100);

    function handleMousemove(event: MouseEvent) {
        coords.x = event.clientX;
        coords.y = event.clientY;
    }

    let nextz = $state<number>(67);
</script>

<svelte:window onmousemove={handleMousemove} bind:innerWidth />


<div class="page">

    <div class="card" style:background-position-x={`${percent / 5}%`} style:margin-left={`${50 - percent}px`}>
        <aside>
            <div class="line"></div>
            <header>
                <div>About <br />& Contact</div>
                <div id="arrow"><img alt="" src={ARROW}/></div>
            </header>
        </aside>

        <div class="sky" style:background-position-x={`${100 - percent}%`}></div>

        <a id="home" href="/">
            home
        </a>
    </div>

    <div class="about" style:right={`calc(${50 - (percent / 7)}px + 22%)`}>
        <div>
            <strong>hello - i am miniaturity.</strong>

            <br /><br />
            i am a game/front-end developer!! i loove the programming aspects of game development, and i love to design unique websites!
            
            for games, i use:
            godot, unity

            for websites, i use:
            svelte, react, scss

            i am an active member of hack club!! go join them if ur a teenager :)!
        </div>
    </div>

    <div class="contact" style:left={`calc(${50 - (percent / 8)}px + 27%)`}>
        <div class="c-left">
            
        </div>

        <div class="c-right">
            <header>
                contact
            </header>

            <div>
                @miniaturity - discord
                @miniaturity_ - instagram
                gmail.com@miniaturityyy
            </div>
        </div>
    </div>

    <div class="stickers" style:left={`${50 - percent}px`}>
        <Sticker bind:nextz image={s_midnight} width={150} pos={[27, 25]}/>
        <Sticker bind:nextz image={s_hc} width={105} pos={[30, 42]} />
        <Sticker bind:nextz image={s_inside} width={90} pos={[66, 10]} rotation={5}/>
        <Sticker bind:nextz image={s_smelte} width={60} pos={[67, 17]} rotation={-4}/>
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
        --cb: #fff;
        --bg: #000000;
        overflow: hidden;
    }

    .stickers {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
    }

    .card {
        position: relative;
        aspect-ratio: 6 / 7;
        width: var(--w);
        background-image: url("$lib/assets/images/tpole.png");
        background-size: auto 100%;
        background-position-x: 50%;
        forced-color-adjust: none;

    }

    .contact {
        --nw: calc(var(--w) / 2.5);
        position: absolute;
        width: var(--nw);
        aspect-ratio: 2 / 1;
        top: 53%; left: 30%;
        border: 2px solid #000;
        font-family: "HelveticaNeue";

        display: flex;
        flex-direction: row;
        background-color: #fff;
    }

    .c-left {
        width: 25%;
        aspect-ratio: 1 / 1;
        border-right: 2px solid #000;


        background-image: 
            linear-gradient(to bottom right, transparent calc(50% - 1px), #000000 calc(50% - 1px), #000000 calc(50% + 1px), transparent calc(50% + 1px)),
            linear-gradient(to bottom left, transparent calc(50% - 1px), #000000 calc(50% - 1px), #000000 calc(50% + 1px), transparent calc(50% + 1px));

        background-size: 100% 100%;
    }

    .c-right {
        flex-grow: 1;
        height: 100%;

        display: flex;
        flex-direction: column;

        & header {
            border-bottom: 2px solid #000;
            font-size: 1.3vw;
            padding: 4px;
        }

        & div {
            white-space: pre-line;
            font-size: 0.7vw;
            padding: 4px;
            font-family: "TE-20";
            font-weight: bold;
        }
    }



    .about {
        --nw: calc(var(--w) / 2.2);
        position: absolute;
        right: 25%; top: 40%;
        width: var(--nw);
        aspect-ratio: 4 / 5;
        background-image: url("$lib/assets/images/pcb.jpg");
        background-size: cover;
        padding: 16px;
        box-sizing: border-box;
        filter: drop-shadow(1px 1px 6px #000);

        & div {
            box-sizing: border-box;
            --c: #ffffff;
            --bc: linear-gradient(162deg,rgba(0, 0, 0, 1) 0%, rgba(64, 64, 64, 1) 80%, rgba(33, 33, 33, 1) 100%);
            width: 100%; height: 100%;
            border: 2px solid var(--c);
            border-image: linear-gradient(180deg,rgba(235, 235, 235, 1) 1%, rgba(189, 189, 189, 1) 48%, rgba(217, 217, 217, 1) 100%) 1;
            background: var(--bc);
            color: #fff;
            font-family: "Dot";
            padding: 8px;
            white-space: pre-line;
            font-size: 0.8vw;
        }
    }

    .sky {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        overflow: hidden;
        z-index: -3;
        background-image: url("$lib/assets/images/sky.jpg");
        background-size: auto 100%;
        background-position-x: 50%;
    }

    #arrow {
        width: 50px;
        height: 50px;

        position: absolute;
        bottom: 0; right: 0;

        & img {
            object-fit: cover;
            width: 100%; height: 100%;
        }
    }

    #home {
        position: absolute;
        bottom: 0; left: 0;
        background-color: #fff;
        color: #000;
        padding: 8px;
        font-family: "HelveticaNeue";
        text-decoration: none;
        font-size: 2rem;

        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: end;

        transition: font-size 0.3s ease;

        &:hover {
            text-decoration: underline;
            font-size: 2.3rem;
        }
    }

    .card aside {
        --nw: calc(var(--w) / 2);
        position: absolute;
        top: -5%; left: -6%;
        width: max(var(--nw), 220px);
        aspect-ratio: 6 / 1.7;
        background-color: var(--bg);
        
    }

    .card aside header {
        
        font-family: "HelveticaNeue";
        font-size: 2rem;
        color: #fff;
        padding: 0px 6px 6px 6px;
        margin-top: 4px;
        line-height: 0.9em;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .line {
        margin-top: 10px;
        width: 100%; 
        height: 2px;
        background-color: #fff;
    }

    
</style>