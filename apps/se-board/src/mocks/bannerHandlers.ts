import { AddBannerBody, Attachment, Banner } from "@types";
import { http, HttpResponse } from "msw";

export const testId: number = 1;

const getBannerHandler = http.get("/admin/banners", ({ request }) => {
  const url = new URL(request.url);
  const isActive = url.searchParams.get("isActive");
  if (isActive) {
    return HttpResponse.json(activeBanners);
  } else {
    return HttpResponse.json(banners);
  }
});

const postBannerHandler = http.post("/admin/banners", async ({ request }) => {
  const data = await request.json();
  if (JSON.stringify(data) == JSON.stringify(addBanner)) {
    return new HttpResponse("OK", { status: 200 });
  } else {
    return new HttpResponse("Bad Request", { status: 400 });
  }
});

const putBannerHandler = http.put(
  "/admin/banners/:id",
  async ({ params, request }) => {
    const { id } = params;
    const data = await request.json();
    if (
      id == testId.toString() &&
      JSON.stringify(data) == JSON.stringify(addBanner)
    ) {
      return new HttpResponse("OK", { status: 200 });
    } else {
      return new HttpResponse("Bad Request", { status: 400 });
    }
  }
);

const deleteBannerHandler = http.delete("/admin/banners/:id", ({ params }) => {
  const { id } = params;
  if (id == testId.toString()) {
    return new HttpResponse("OK", { status: 200 });
  } else {
    return new HttpResponse("Bad Request", { status: 400 });
  }
});

export const bannerHandlers = [
  getBannerHandler,
  postBannerHandler,
  putBannerHandler,
  deleteBannerHandler,
];

//dummy data
const now = Date.now().toString();

const attachment: Attachment = {
  fileMetaDataId: 1,
  originalFileName: "test1",
  storedFileName: "storedName1",
  url: "/",
};

const banner1: Banner = {
  bannerId: 1,
  startDate: now,
  endDate: now,
  fileMetaData: attachment,
  bannerUrl: "/",
};

const banner2: Banner = {
  bannerId: 2,
  startDate: now,
  endDate: now,
  fileMetaData: attachment,
  bannerUrl: "/",
};

export const activeBanners: Banner[] = [banner1];

export const banners: Banner[] = [banner1, banner2];

export const addBanner: AddBannerBody = {
  startDate: now,
  endDate: now,
  bannerUrl: "/",
  fileMetaDataId: 1,
};
