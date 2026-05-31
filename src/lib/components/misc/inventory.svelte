<script lang="ts">
  import type { Item } from "$lib/types";

  const preloadAudio = (src: string): HTMLAudioElement => {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.load();
    return audio;
  };

  import menucancel_sfxfile from "$lib/assets/sfx/menu_cancel.wav";
  import menucursor_sfxfile from "$lib/assets/sfx/menu_cursor.wav";

  const sfx_MENUCANCEL = preloadAudio(menucancel_sfxfile);
  const sfx_MENUCURSOR = preloadAudio(menucursor_sfxfile);
  
  let {
    inventory,
    show
  }: {
    inventory: Item[],
    show: boolean
  } = $props();

  let hovering: number = $state<number>(0);
  
  window.addEventListener("keydown", (e) => {
    if (!inventory[hovering] || !show) return;
        
    const action_keys = [
      "Z", "z", "X", "x", "Enter", " "
    ];

    const movement_keys = [
      "ArrowDown",
      "ArrowRight",
      "ArrowLeft",
      "ArrowUp"
    ]

    if (action_keys.includes(e.key)) {
      sfx_MENUCANCEL.currentTime = 0;
      sfx_MENUCANCEL.play();

      show = false;
      inventory[hovering].onUse();
      inventory.splice(hovering, 1);
      hovering = 0;
    }

    if (movement_keys.includes(e.key)) {
      sfx_MENUCURSOR.currentTime = 0;
      sfx_MENUCURSOR.play();

      if (hovering === inventory.length - 1) {
        hovering = 0;
      } else {
        hovering++;
      }
    }

    
  })

  
</script>

{#if show}
<div class="inventory">
  <div class="i__desc">
    {#if inventory[hovering]}
      <div>{inventory[hovering].desc}</div>
    {:else}
      <div>No item selected.</div>
    {/if}
  </div>

  <div class="i__items">
    {#each inventory as item, index}
      <div class={`ii__item ${hovering === index ? "iii__selected" : ""}`} id={item.id}>
        <div class="iii__content">
          <img src={item.icon} alt=""/>
          <div class="iii__name">
            {item.name}
          </div>
        </div> 
      </div>
    {/each}
  </div>
</div>
{/if}

<style>
  .inventory {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    gap: 18px;

    --margin: 18px;
    margin: var(--margin);

    color: #fff;
    font-size: 1.2rem;

    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);


    width: calc(100% - calc(var(--margin) * 2));
    height: fit-content;

    z-index: 9;
  }

  .i__desc, .i__items {
    --border-size: 14px;
    border: var(--border-size) solid transparent;
    border-image-source: url("/normal.png");
    border-image-slice: 25%;
    border-image-repeat: repeat;
    background-color: #180C1E;
    width: calc(100% - calc(var(--border-size) * 2));
  }

  .i__desc {
    display: flex;
    height: 32px;
    align-items: center;
    justify-content: center;
  }

  .i__items {
    height: 200px;
    display: flex;
    flex-direction: row;
  }

  .ii__item {
    position: relative;
    display: flex;
    width: 50%;

    height: 32px;
    flex-direction: row;
    isolation: isolate;

  }

  .iii__content {
    --imargin: 4px;
    display: flex;
    width: calc(100% - calc(var(--imargin) * 2));
    margin: var(--imargin);
  }

  .iii__selected::before {
    z-index: -1;
    position: absolute;

    content: "";
    top: 0; left: 0;
    width: 100%; height: 100%;
    border: 2px solid transparent;

    border-image-source: url("/normal.png");
    border-image-slice: 10%;
    border-image-repeat: repeat;

    background: linear-gradient(90deg,rgba(255, 146, 30, 0.5) 0%, rgba(72, 20, 40, 0.3) 10%, rgba(72, 20, 40, 0.5) 50%, rgba(72, 20, 40, 0.3) 90%, rgba(255, 146, 30, 0.5) 100%);
    animation: flash infinite 0.7s ease-in-out;
  }

  .iii__name {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  @keyframes flash {
    0% {
      opacity: 0.5;
    } 50% {
      opacity: 0.95;
    } 100% {
      opacity: 0.5;
    }
  }


</style>