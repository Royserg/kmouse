<script lang="ts">
  import "./app.css";
  import Box from "./lib/Box.svelte";

  const boxCount = 9;
  let selectedBox = 5;
</script>

<main
  class="bg-blue-300 border-2 border-black w-screen h-screen flex flex-wrap opacity-40"
>
  {#each { length: boxCount } as _, i}
    <Box id={i + 1} isHighlighted={i + 1 === selectedBox} />
  {/each}
</main>

<style>
</style>
