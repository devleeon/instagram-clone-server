import { nouns, adjectives } from "../words";

export const generateSecret = () => {
  const nounSecret = nouns[Math.floor(Math.random() * nouns.length)];
  const adjectiveSecret =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  return `${nounSecret} ${adjectiveSecret}`;
};
