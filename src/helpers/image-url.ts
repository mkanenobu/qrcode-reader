export const getImageUrl = (name: string): string => {
  return new URL(`./dir/${name}.png`, import.meta.url).href;
};
