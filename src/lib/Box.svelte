<script lang="ts">
  import { cn } from "../utils/cn";
  import BoxContainer from "./BoxContainer.svelte";

  export let id: number;
  export let isHighlighted: boolean = false;
  export let isSelected: boolean = false;
</script>

<div
  class={cn(
    "w-1/3 h-1/3 border border-black flex justify-center items-center text-9xl text-white",
    isHighlighted && "bg-red-400 text-slate-600"
  )}
>
  {#if isSelected}
    <BoxContainer />
  {:else}
    {id + 1}
  {/if}
</div>
