/**
 *
 * @param seconds
 * @returns string;
 * @ ex) seconds=180 => 03:00
 */
export const secondsToMMSS = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h)
    return `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
      s < 10 ? "0" + s : s
    }`;
  else return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
};
