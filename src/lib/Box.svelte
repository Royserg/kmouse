<script lang="ts">
  // import { invoke } from "@tauri-apps/api/tauri";
  // async function greet(){
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   greetMsg = await invoke("greet", { name })
  // }
  import {
    LogicalPosition,
    appWindow,
    PhysicalPosition,
  } from "@tauri-apps/api/window";
  import { cn } from "../utils/cn";
  import { onMount } from "svelte";
  import app from "../main";

  // appWindow.
  export let id: number;
  export let isHighlighted: boolean = false;

  onMount(async () => {
    const innerSize = await appWindow.innerSize();

    if (isHighlighted) {
      const { height, width } = innerSize;
      const boxHeight = height / 3;
      const boxWidth = width / 3;

      //- Calculate column of highlighted box
      const zeroIndexed = id - 1;
      const column = zeroIndexed % 3;
      const row = Math.floor(zeroIndexed / 3);

      const boxLogicalWidthCenter = column * boxWidth + boxWidth / 2;
      const boxLogicalHeightCenter = row * boxHeight + boxHeight / 2;

      const scaleFactor = await appWindow.scaleFactor();

      // console.log({
      //   innerSize,
      //   column,
      //   row,
      //   boxLogicalHeightCenter,
      //   boxLogicalWidthCenter,
      //   scaleFactor,
      // });

      appWindow.setCursorPosition(
        new LogicalPosition(
          boxLogicalWidthCenter / scaleFactor,
          boxLogicalHeightCenter / scaleFactor
        )
      );
    }
  });
</script>

<div
  class={cn(
    "w-1/3 h-1/3 border border-black flex justify-center items-center text-9xl text-white",
    isHighlighted && "bg-red-400 text-slate-600"
  )}
>
  {id}
</div>
