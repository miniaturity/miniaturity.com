<script lang="ts">

</script>

<div class="error-page">
    <div class="card">
        <a href="/">home?</a>
    </div>
</div>

<style lang="scss">
    :global(body) {
        margin: 0;
        width: 100vw; height: 100vh;
    }

    .error-page {
        width: 100vw; height: 100vh;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .card {
        --w: clamp(300px, 40vw, 500px);
        position: relative;
        width: var(--w);
        aspect-ratio: 5 / 4;
        background-image: url("$lib/assets/images/error.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .card a {
        position: absolute;
        bottom: -5%; left: -5%;
        padding: 12px;
        font-family: "HelveticaNeue";
        text-decoration: none;
        color: #000;
        background-color: #fff;
        font-size: 2rem;

        &:hover {
            text-decoration: underline;
        }
    }


    
</style>