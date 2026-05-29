<script lang="ts">
    import type { LastFmRecentTracksResponse } from "$lib/types";
    import { onMount } from "svelte";

    import defaultImage from "$lib/assets/images/error.jpg";

    let songName = $state<string | null>(null);
    let songArtist = $state<string | null>(null);
    let songAlbum = $state<string | null>(null);
    let songLink = $state<string | null>(null);
    let totalScrobbles = $state<string | null>(null);
    let songImage = $state<string | null>(null);
    let date = $state<string | null>(null);

    let displayName = $state<string | null>(null);
    let marqueeOffset = $state(0);
    let marqueeInterval: ReturnType<typeof setInterval> | null = null;

    const MARQUEE_SEPARATOR = "   -   "; 
    const MARQUEE_DELAY_MS = 300;
    const MARQUEE_PAUSE_MS = 1200;

    function startMarquee(name: string) {
        if (marqueeInterval) clearInterval(marqueeInterval);

        const full = name + MARQUEE_SEPARATOR;
        marqueeOffset = 0;
        displayName = name;

        setTimeout(() => {
            const el = document.getElementById("si-name");
            if (!el || el.scrollWidth <= el.clientWidth) return; // fits, so we dont start.

            let pausing = true;
            setTimeout(() => { pausing = false; }, MARQUEE_PAUSE_MS);

            marqueeInterval = setInterval(() => {
                if (pausing) return;
                marqueeOffset = (marqueeOffset + 1) % full.length;

                // from offset to end + start to offset (wrap)
                displayName = (full + full).slice(marqueeOffset, marqueeOffset + full.length);
            }, MARQUEE_DELAY_MS);
        }, 0);
    }

    async function getRecentTrack() {
        const response = await fetch("https://lastfm-api-proxy.minimeow.workers.dev/user/getRecentTracks?user=miniaturity&limit=1");
        const json: LastFmRecentTracksResponse = await response.json();

        const track = json.recenttracks.track[0];

        songName = track.name;
        songArtist = track.artist["#text"];
        songAlbum = track.album["#text"];
        if (songAlbum === songName) songAlbum = "[Single]";
        songLink = track.url;
        totalScrobbles = json.recenttracks["@attr"].total;
        date = track.date ? formatDate(track.date["#text"]) : "now!";

        // find highest quality image available. auto falls back to lower qualities if not found.
        songImage = [...track.image].reverse().find(img => img["#text"] !== "")?.["#text"] ?? null;
        startMarquee(songName);
    }

    function formatDate(lastfmDate: string): string {
        const [datePart, timePart] = lastfmDate.split(", ");
        const [day, month, year] = datePart.split(" ");
        const date = new Date(`${month} ${day}, ${year} ${timePart} UTC`);

        return date.toLocaleString("en-US", {
            timeZone: "America/New_York",
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }

    onMount(() => {
        getRecentTrack();
        return () => { if (marqueeInterval) clearInterval(marqueeInterval); };
    });
</script>

<div class="lastfm">
    <div class="album-art">
        <img alt="" src={songImage || defaultImage}/>
    </div>

    <div class="song-info">
        <a id="si-name" href={songLink || "/"} target="_blank" rel="noopener noreferrer">
            {displayName || "loading"}
        </a>

        <div id="si-desc">
            <span id="si-artist">by: {songArtist || "..."}</span>
            <span id="si-album">on: {songAlbum || "..."}</span>
            <span id="si-date">at: {date || "..."}</span>
            <span id="si-scrobbles">{totalScrobbles || "..."} scrobbles</span>
        </div>
    </div>
</div>

<style lang="scss">

    .lastfm {
        box-sizing: border-box;
        
        --nw: calc(var(--w) / 1.5);
        width: max(var(--nw), 300px);
        aspect-ratio: 6 / 2;
        background-image: url("$lib/assets/images/pcb.jpg");
        background-size: cover;

        font-family: "Dot";
        
        display: flex;
        flex-direction: row;
        padding: 12px;
        gap: 12px;

        --c: #fff;
        --bc: linear-gradient(162deg,rgba(0, 0, 0, 1) 0%, rgba(64, 64, 64, 1) 80%, rgba(33, 33, 33, 1) 100%);
        filter: drop-shadow(2px 2px 4px #000);
    }

    .album-art {
        aspect-ratio: 1 / 1;
        border: 2px solid var(--c);
        border-bottom: 4px solid var(--c); border-top: 4px solid var(--c);
        border-image: linear-gradient(180deg,rgba(235, 235, 235, 1) 1%, rgba(189, 189, 189, 1) 48%, rgba(217, 217, 217, 1) 100%) 1;
        background: var(--bc);
        padding: 8px;
    
        & img {
            object-fit: cover;
            width: 100%; height: 100%;
        }
    }

    .song-info {
        flex-grow: 1;
        border: 2px solid var(--c);
        border-bottom: 4px solid var(--c); border-top: 4px solid var(--c);
        border-image: linear-gradient(180deg,rgba(235, 235, 235, 1) 1%, rgba(189, 189, 189, 1) 48%, rgba(217, 217, 217, 1) 100%) 1;
        background: var(--bc);
        padding: 8px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: scroll;
        
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }

    #si-name {
        display: block;
        text-decoration: none;
        cursor: pointer;
        color: #fff;
        font-size: 1.5rem;
        white-space: nowrap;

        &:hover {
            text-decoration: underline;
        }
    }

    #si-desc {
        --g: 6px;
        display: flex;
        flex-direction: column;
        
        color: #ffffffb4;
        padding-top: var(--g);
        

        & span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            transition: color 0.2s ease;
            &:hover {
                color: #fff;
            }
        }
        

    }

</style>
