<script lang="ts">
  import { LogicalPosition, appWindow } from "@tauri-apps/api/window";
  import settings from "../stores/global";
  import { pressedKey } from "../stores/key-press";
  import Box from "./Box.svelte";

  let boxCount = 9;
  // Box in the center
  let highlightedBox: number = 5;
  let selectedBox: number | null = null;

  const { width, height } = $settings.innerSize;
  const boxHeight = height / 3;
  const boxWidth = width / 3;

  pressedKey.subscribe((pressedKey) => {
    if (pressedKey && !selectedBox) {
      switch (pressedKey.key) {
        case "ArrowUp":
          highlightedBox -= 3;
          if (highlightedBox < 1) {
            highlightedBox += 9;
          }
          break;
        case "ArrowDown":
          highlightedBox += 3;
          if (highlightedBox > 9) {
            highlightedBox -= 9;
          }
          break;
        case "ArrowLeft":
          if ([1, 4, 7].includes(highlightedBox)) {
            highlightedBox += 2;
          } else {
            highlightedBox--;
          }
          break;
        case "ArrowRight":
          if ([3, 6, 9].includes(highlightedBox)) {
            highlightedBox -= 2;
          } else {
            highlightedBox++;
          }
          break;
        case "Enter":
          selectedBox = highlightedBox;
          break;
        default:
          break;
      }
    }
  });

  $: if (highlightedBox) {
    //- Calculate column of highlighted box
    const zeroIndexed = highlightedBox - 1;
    const column = zeroIndexed % 3;
    const row = Math.floor(zeroIndexed / 3);

    const boxLogicalWidthCenter = column * boxWidth + boxWidth / 2;
    const boxLogicalHeightCenter = row * boxHeight + boxHeight / 2;

    appWindow.setCursorPosition(
      new LogicalPosition(
        boxLogicalWidthCenter / $settings.scaleFactor,
        boxLogicalHeightCenter / $settings.scaleFactor
      )
    );
  }
</script>

<section
  class="bg-blue-300 border-2 border-black w-screen h-screen flex flex-wrap opacity-40"
>
  {#each { length: boxCount } as _, i}
    <Box
      id={i}
      isHighlighted={highlightedBox - 1 === i}
      isSelected={selectedBox - 1 === i}
    />
  {/each}
</section>
