<script lang="ts">
  import type { DialogueNode, DialogueOption } from "$lib/types";

  const preloadAudio = (src: string): HTMLAudioElement => {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.load();
    return audio;
  };


  import textrobot_sfxfile from "$lib/assets/sfx/text_robot.wav";
  import text_sfxfile from "$lib/assets/sfx/text.wav";
  import menucursor_sfxfile from "$lib/assets/sfx/menu_cursor.wav";
  import menudecision_sfxfile from "$lib/assets/sfx/menu_decision.wav";

  const sfx_TEXT = preloadAudio(text_sfxfile);
  const sfx_TEXTROBOT = preloadAudio(textrobot_sfxfile);
  const sfx_MENUCURSOR = preloadAudio(menucursor_sfxfile);
  const sfx_MENUDECISION = preloadAudio(menudecision_sfxfile);

  let {
    dialogue,
    flags,
    onNext,
    finished,
    setRenderDialogue
  }: {
    dialogue: DialogueNode;
    flags: Record<string, boolean>;
    onNext: (choiceNext?: string) => void;
    finished: boolean;
    setRenderDialogue: (b: boolean) => void;
  } = $props();

  const SPEED = 25;

  let isWorldMachine = $derived<boolean>(dialogue.expression.startsWith("en"));
  let currentText = $state("");
  let currentExpression = $state("");
  let continueFlag = $state<boolean>(false);
  let index = $state(0);

  let currentOptions = $state<DialogueOption[]>([]);
  let selectedOption = $state(0);
  let currentMode = $state<"dialogue" | "options">("dialogue");

  let typingTimeout: number | undefined;


  function filterOptions() {
    currentOptions =
      dialogue.options?.filter(option => {
        if (!option.requiresFlags) return true;
        return option.requiresFlags.every(flag => flags[flag]);
      }) ?? [];
  }

  function startTyping() {
    currentText = "";
    index = 0;
    finished = false;
    currentMode = "dialogue";
    currentExpression = dialogue.expression;
    selectedOption = 0;

    clearTimeout(typingTimeout);

    typeNextCharacter();
  }

  function typeNextCharacter() {
    continueFlag = false;
    if (finished) {
      currentText = dialogue.text;
      return;
    }

    const pausePoints = dialogue.pausePoints;
    const lastPause = pausePoints?.find(p => p.index === index - 1);
    if (lastPause?.expression) currentExpression = lastPause.expression;

    if (index >= dialogue.text.length) return;

    currentText += dialogue.text[index];
    index++;

    const pause = pausePoints?.find(p => p.index === index);


    const allDelay = dialogue.allDelay || 0;

    const delay = (pause ? pause.ms : SPEED) + allDelay;

    if (index % 3 === 0 || allDelay > 100) {
      const sfx = isWorldMachine ? sfx_TEXTROBOT : sfx_TEXT;
      sfx.volume = 0.3;
      sfx.currentTime = 0;
      sfx.play();``
    }
    
    if (!pause?.requiresNext)
      typingTimeout = window.setTimeout(typeNextCharacter, delay);
    else continueFlag = true;
  }

  function finish() {
    finished = true;
  }

  function chooseOption() {
    const option = currentOptions?.[selectedOption];
    if (!option) return;

    sfx_MENUDECISION.currentTime = 0;
    sfx_MENUDECISION.play();

    onNext(option.next);
  }

  let animateOut = $state<boolean>(false);
  let animateIn = $state<boolean>(false);    

  function nextOrFinish() {
    if (continueFlag) {
      typeNextCharacter();
      return;
    }
    
    if (currentText !== dialogue.text && !dialogue.fromEntity) {
      finish();
      return;
    }

    if (dialogue.options && dialogue.options.length > 0) {
      filterOptions();

      if (currentOptions && currentOptions.length > 0) {
        currentMode = "options";
        return;
      }
    }

    if (dialogue.fromEntity && !animateOut) {
      animateOut = true;
      setTimeout(() => {
        onNext();
        animateOut = false;
      }, 250);
    } else {
      if (dialogue.nextDelay) { 
        setRenderDialogue(false);
        setTimeout(() => { setRenderDialogue(true); onNext(); }, dialogue.nextDelay)
      }
      else onNext();
    }
  }

  function selectOption(increment: boolean) {
    if (!currentOptions || currentOptions.length <= 1) return;

    sfx_MENUCURSOR.currentTime = 0;
    sfx_MENUCURSOR.play();

    if (increment) {
      selectedOption =
        selectedOption === currentOptions.length - 1
          ? 0
          : selectedOption + 1;
    } else {
      selectedOption =
        selectedOption === 0
          ? currentOptions.length - 1
          : selectedOption - 1;
    }
  }

  const act = () => {
    if (currentMode === "options") {
      chooseOption();
    } else {
      nextOrFinish();
    }
  }


  const controls: Record<string, () => void> = {
    Enter: () => act(),
    z: () => act(),
    Z: () => act(),
    x: () => act(),
    X: () => act(),
    " ": () => act(),

    ArrowDown: () => selectOption(true),
    ArrowRight: () => selectOption(true),

    ArrowUp: () => selectOption(false),
    ArrowLeft: () => selectOption(false)
  };

  let keyPressed = $state<boolean>(false);

  function handleKeyUp() {
    keyPressed = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (keyPressed) return;
    keyPressed = true;
    const action = controls[e.key];
    if (action) action();
  }

  let prevDialogueId: string | number | undefined;

  $effect(() => {
    const id = dialogue?.id;
    if (id === prevDialogueId) return;
    prevDialogueId = id;

    if (dialogue.fromEntity) { 
      animateIn = true;
      const animate = setTimeout(() => {
        animateIn = false;
      }, 250);
      return () => clearTimeout(animate); 
    }
    

    // schedule startTyping asynchronously so the effect
    // doesn't record reads performed by the typing logic..
    Promise.resolve().then(() => startTyping());

    return () => clearTimeout(typingTimeout);
  });
</script>

<svelte:window onkeydown={handleKeydown} onkeyup={handleKeyUp} />

{#if currentMode === "options"}
  <div class="options">
    {#each currentOptions as option, i}
      <div
        class={`dbc__option`}
        style={`top: calc(calc(50% - calc(${currentOptions.length - 1} * 25px)) + calc(25px * ${i})); left: var(--margin)`}
      >
        <div class={`dbco__content ${i === selectedOption ? "o__selected" : ""}`}>{option.title}</div>
      </div>
    {/each}
  </div>
{/if}

{#if currentMode === "dialogue" && dialogue}

  {#if !dialogue?.fromEntity}
    <div class="dialogue-box" role="none" onclick={act}>
      <div class="db__content" style="white-space: pre-line;">
          {currentText}
      </div>

      <div class="db__face">
        <img
          alt={currentExpression}
          src={`/faces/${currentExpression}.png`}
          onerror={() =>
            console.error("Expression " + currentExpression + " not found.")
          }
        />
      </div>

      {#if currentText.length === dialogue.text.length || continueFlag}
        <img alt="" src="/normal.gif" class="arrow"/>
      {/if}
  </div>
  {:else if dialogue.fromEntity}
    <div class={`entity-dialogue ${animateOut ? "f-out" : ""} ${animateIn ? "f-in" : ""}`}>
      <div>{"[" + dialogue.text + "]"}</div>
    </div>
  {/if}
{/if}
<style lang="scss">
  .entity-dialogue {
    position: absolute;
    width: 100%; height: 100%;
    top: 0; left: 0;

    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    color: #fff;
    font-size: 1.3rem;
  }

  .f-out {
    animation: f-out 0.25s ease-out forwards;
  }

  .f-in {
    animation: f-in 0.25s ease-in forwards;
  }

  .options {
    --margin: 18px;
    border-image-source: url("/normal.png");
    border-image-slice: 25%;
    border-image-repeat: repeat;

    color: #fff;
    background-color: #180C1E;
    font-size: 1.2rem;

    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
  }
  .dialogue-box {
    position: relative;
    align-self: flex-end;

    --margin: 18px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    box-sizing: border-box;

    height: 25%;
    width: calc(100% - 8px);

    margin: 4px;

    border: 14px solid transparent;

    border-image-source: url("/normal.png");
    border-image-slice: 25%;
    border-image-repeat: repeat;
    border-radius: 6px;

    color: #fff;
    background-color: #180C1E;
    font-size: 0.8vw;

    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
    z-index: 2;
  }

  .db__face {
    width: 23%;
    aspect-ratio: 1 / 1;

    display: flex;
    align-items: center; justify-content: center;

    & img {
        width: 100%; height: 100%;
        object-fit: cover;
    }
  }

  .arrow {
    position: absolute;
    
    bottom: -15px;
    left: 50%;
  }

  .db__content {
    flex: 1;              
    min-width: 0;         
    overflow-wrap: break-word;
    word-wrap: break-word;

    margin: 2px;
  }

  .dbc__option {
    position: absolute;
    left: 0;
    width: 100%;
    isolation: isolate;
  }


  .o__selected::before {
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

  .dbco__content {
    position: relative;
    border: 2px solid transparent;
    padding-left: 4px;
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

  @keyframes f-out {
    0% {
      opacity: 1;
    } 100% {
      opacity: 0;
    }
  }

  @keyframes f-in {
    0% {
      opacity: 0;
    } 100% {
      opacity: 1;
    }
  }
  
</style>