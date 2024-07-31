import { secondsToMMSS } from "@/utils/dateUtil";

describe("secondsToMMSS test", () => {
  it('should return "00:00" for 0 seconds', () => {
    expect(secondsToMMSS(0)).toBe("00:00");
  });

  it('should return "01:01" for 61 seconds', () => {
    expect(secondsToMMSS(61)).toBe("01:01");
  });

  it('should return "59:59" for 3599 seconds', () => {
    expect(secondsToMMSS(3599)).toBe("59:59");
  });

  it('should return "01:01:01" for 3661 seconds', () => {
    expect(secondsToMMSS(3661)).toBe("01:01:01");
  });
});
