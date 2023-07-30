import { writable } from "svelte/store";

export type Key =
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "Enter";

export class PressedKey {
  key: Key;

  constructor(key: Key) {
    this.key = key;
  }
}

export const pressedKey = writable<PressedKey>(null);
