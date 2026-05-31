export interface Project {
    id: number;
    name: string;
    desc: string;
    year: string;
    status: "wip" | "ship";
    cover: string;
    background?: string;
    link?: string;
    repo?: string;
}

export const PROJECTS: Project[] = [
    {
        id: 0,
        name: "word of the day",
        year: "2026",
        desc: "a svelte/next.js game inspired by RNGDLE! my first full-stack app ever.",
        status: "ship",
        cover: "/lightbulb.png",
        link: "https://wotd.miniaturity.com/",
        repo: "https://github.com/miniaturity/word-of-the-day/"
    },
    {
        id: 1,
        name: "womble",
        year: "2025",
        desc: "a react/ts game inspired by wordle and balatro!",
        status: "ship",
        cover: "/",
        link: "https://womble.miniaturity.com",
        repo: "https://github.com/miniaturity/womble"
    }
    
]