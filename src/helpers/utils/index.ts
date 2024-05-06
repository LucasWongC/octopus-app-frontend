export const truncate = (value: string, maxChars: number) => {
  return value.length <= maxChars
    ? value
    : value.substring(0, maxChars) + "...";
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
