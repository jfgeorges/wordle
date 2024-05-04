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

const gridSizes = {
  width: 5,
  length: 6,
};
export const gridGame = Array.from({ length: gridSizes.length }, () =>
  Array.from({ length: gridSizes.width }, () => "")
);

export const status = {
  TYPING: "TYPING",
  CHECKING: "CHECKING",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
};

export function randomItem<T>(items: Array<T>): T {
  // Use Math.random() to generate a random number between 0 and 1,
  // multiply it by the length of the array, and use Math.floor() to round down to the nearest integer
  return items[Math.floor(Math.random() * items.length)];
}

export const pickAWord = () => {
  return randomItem(MOTS);
};
