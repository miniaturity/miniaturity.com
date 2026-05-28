<script lang="ts">

    

    async function getRecentTrack() {
        const response = await fetch("https://lastfm-api-proxy.minimeow.workers.dev/user/getRecentTracks?user=miniaturity&limit=1");
        const json = await response.json();


    }

</script>