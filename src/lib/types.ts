export interface LastFmRecentTracksResponse {
  recenttracks: RecentTracks;
}

interface RecentTracks {
  track: Track[];
  "@attr": {
    user: string;
    totalPages: string;
    page: string;
    perPage: string;
    total: string;
  };
}

interface Track {
  artist: ArtistOrAlbum;
  streamable: string;
  image: TrackImage[];
  mbid: string;
  album: ArtistOrAlbum;
  name: string;
  url: string;
  date?: TrackDate; // now playing tracks do not have a date
}

interface ArtistOrAlbum {
  mbid: string;
  "#text": string;
}

interface TrackImage {
  size: "small" | "medium" | "large" | "extralarge";
  "#text": string;
}

interface TrackDate {
  uts: string;
  "#text": string;
}

import type { Snippet } from "svelte";

export type Flags = Record<string, boolean>;

export interface DialogueOption {
  title: string;
  next: string;

  requiresFlags?: string[];
  setFlags?: string[];
}

export interface DialogueNode {
  id: string;
  text: string;
  expression: string; // Ignored if popup

  next?: string;

  pausePoints?: { index: number, ms: number, expression?: string, requiresNext?: boolean }[];
  
  allDelay?: number; // pause points but for all indexes
  nextDelay?: number; // delay next dialogue (box disappears until then)
  end?: boolean;
  requiresFlags?: string[];
  setFlags?: string[];

  options?: DialogueOption[];
  fromEntity?: boolean;
  robot?: boolean;
}

export type DialogueGraph = Record<string, DialogueNode>;

export interface Item {
  id: string;
  name: string;
  desc: string;
  icon: string;

  onUse: () => void;
}

export interface EasterEgg {
  id: string;
  name: string;
  desc: string;

  icon?: string;
  claimed: boolean;
} 

export interface App {
  id: string;
  name: string;
  icon: string;

  window: WindowProps;  
}

export interface WindowProps {
  title: string;
  children: Snippet<[]>;
  open: boolean;
  minimized: boolean;
  z: number;

  initClosed?: boolean;
  icon?: string;
  onDrag?: () => void;
  size?: { x: number, y: number };
  pos?: { x: string, y: string };
  canClose?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
}

export interface Directory {
  path: string;
  content: (File | Directory)[];
}

export interface DirectoryFile {
  name: string;
  icon: string;
  onOpen: () => void;
}

export interface OneshotProps {
  claimEasterEgg: (id: string) => void;
  easterEggs: EasterEgg[];
  deadPlaying: boolean;
}

export interface OSNotification {
  open: boolean;
  title: string;
  desc: string;
  icon: string;
}