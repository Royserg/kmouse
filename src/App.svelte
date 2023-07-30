<script lang="ts">
  import "./app.css";
  import BoxContainer from "./lib/BoxContainer.svelte";
  import settings from "./stores/global";
  import { pressedKey, PressedKey, type Key } from "./stores/key-press";

  const boxCount = 9;
  let highlightedBox = 5;
  let selectedBox: number | null = null;

  // Store last clicked key
  function onKeyDown(e: KeyboardEvent) {
    pressedKey.update(() => new PressedKey(e.code as Key));
  }
</script>

{#await settings.init()}
  'initializing App'
{:then}
  <BoxContainer />
{/await}

<svelte:window on:keydown={onKeyDown} />

<style>
</style>
