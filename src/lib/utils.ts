import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MOTS = [
  "avion",
  "belle",
  "chien",
  "droit",
  "eclat",
  "forme",
  "givre",
  "havre",
  "ideal",
  "jouer",
  "lourd",
  "mains",
  "noyer",
  "ombre",
  "porte",
  "quite",
  "rouge",
  "sable",
  "table",
  "usure",
  "vivre",
  "wagon",
  "zebre",
];

export const ALPHABET: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export type Alphabet = (typeof ALPHABET)[number];

const gridSizes = {
  width: 5,
  length: 6,
};
export const letterStatus = {
  none: "none",
  notFound: "notFound",
  goodPlace: "goodPlace",
  wrongPlace: "wrongPlace",
};

export const initialGridGame = Array.from({ length: gridSizes.length }, () =>
  Array.from({ length: gridSizes.width }, () => ({
    name: "",
    status: letterStatus.none,
  }))
);
export type GridGame = typeof initialGridGame;

export function randomItem<T>(items: Array<T>): T {
  // Use Math.random() to generate a random number between 0 and 1,
  // multiply it by the length of the array, and use Math.floor() to round down to the nearest integer
  return items[Math.floor(Math.random() * items.length)];
}

export const pickAWord = () => {
  return randomItem(MOTS);
};
