import { deleteBanner, getBanners, postBanner, putBanner } from "@/api/banner";
import {
  activeBanners,
  addBanner,
  banners,
  testId,
} from "@/mocks/bannerHandlers";

describe("banner api 테스트", () => {
  const now: string = Date.now().toString();

  it("getBanners isActive=true 테스트", async () => {
    const result = await getBanners(true);
    expect(result).toStrictEqual(activeBanners);
  });

  it("getBanners isActive=false 테스트", async () => {
    const result = await getBanners();
    expect(result).toStrictEqual(banners);
  });

  it("postBanner 테스트", async () => {
    const result = await postBanner(addBanner);
    expect(result).toBe("OK");
  });

  it("putBanenr 테스트", async () => {
    const result = await putBanner(testId, addBanner);
    expect(result).toBe("OK");
  });

  it("deleteBanner 테스트", async () => {
    const result = await deleteBanner(testId);
    expect(result).toBe("OK");
  });
});
