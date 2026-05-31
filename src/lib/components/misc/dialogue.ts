import type { DialogueGraph } from "$lib/types";

export const DIALOGUE: DialogueGraph = {
  start: {
    id: "start",
    text: "welcome to my projects! you can sort by year and type. if it is shipped, you can click on it for a demo!",
    expression: "niko_83c",
    end: true,

    pausePoints: [
        {
            index: 24,
            ms: 0,
            expression: "niko_speak",
            requiresNext: true
        },
        {
            index: 54,
            ms: 0,
            requiresNext: true
        },
        {
            index: 72,
            ms: 300,
        }
    ]
  }
};
