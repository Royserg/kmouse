import { appWindow, type PhysicalSize } from "@tauri-apps/api/window";
import { writable } from "svelte/store";

interface AppInfo {
  innerSize?: PhysicalSize;
  scaleFactor?: number;
}

const initStore = () => {
  let initialValue: AppInfo = {};
  const { subscribe, update, set } = writable(initialValue);

  return {
    subscribe,

    async init() {
      const innerSize = await appWindow.innerSize();
      const scaleFactor = await appWindow.scaleFactor();
      set({
        innerSize,
        scaleFactor,
      });
    },
  };
};

export default initStore();
