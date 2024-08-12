import { AdminIP, IpInfo, SpamKeyword } from "@types";
import { http, HttpResponse } from "msw";

const getIpHandler = http.get("/admin/ip", async ({ request }) => {
  const url = new URL(request.url);
  const ipType = url.searchParams.get("ipType");
  if (ipType == "SPAM") {
    return HttpResponse.json(testIpAddressArr);
  } else if (ipType == "ADMIN") {
    return HttpResponse.json(testAdminIPs);
  }
});

const postIpHandler = http.post("/admin/ip", async ({ request }) => {
  const data: any = await request.json();
  const ipType = data.ipType;
  if (ipType == "SPAM" || ipType == "ADMIN") {
    return new HttpResponse("OK", { status: 200 });
  } else {
    return new HttpResponse("Bad Request", { status: 400 });
  }
});

const deleteIpHandler = http.delete("/admin/ip", async ({ request }) => {
  const data = await request.json();
  if (JSON.stringify(data) == JSON.stringify(deleteIpData)) {
    return new HttpResponse("OK", { status: 200 });
  } else {
    return new HttpResponse("Bad Request", { status: 400 });
  }
});

const getSpamKeyWordHandler = http.get("/admin/spamword", () => {
  return HttpResponse.json(testSpamWordArr);
});

const postSpamKeyWordHandler = http.post(
  "/admin/spamword",
  async ({ request }) => {
    const data = await request.json();
    if (JSON.stringify(data) == JSON.stringify(spamWordData)) {
      return new HttpResponse("OK", { status: 200 });
    } else {
      return new HttpResponse("Bad Request", { status: 400 });
    }
  }
);

const deleteSpamKeyWordHandler = http.delete(
  "/admin/spamword/:id",
  async ({ params }) => {
    const { id } = params;
    if (id == "1") {
      return new HttpResponse("OK", { status: 200 });
    } else {
      return new HttpResponse("Bad Request", { status: 400 });
    }
  }
);

export const generalPolicyHandlers = [
  getIpHandler,
  postIpHandler,
  deleteIpHandler,
  getSpamKeyWordHandler,
  postSpamKeyWordHandler,
  deleteSpamKeyWordHandler,
];

//더미 데이터
export const testIpAddressArr: IpInfo[] = [
  { id: 1, ipAddress: "ip1" },
  { id: 2, ipAddress: "ip2" },
];

export const testIpAddress: string = "ip1";

const postIpData = {
  ipAddress: testIpAddress,
  ipType: "SPAM",
};

const deleteIpData = {
  ipAddress: testIpAddress,
};

export const testSpamWordArr: SpamKeyword[] = [
  { id: 1, word: "string1" },
  { id: 2, word: "string2" },
];

export const testSpam = "spam word";

const spamWordData = {
  word: testSpam,
};

export const testAdminIPs: AdminIP[] = [
  { id: 1, ipAddress: "ip1" },
  { id: 2, ipAddress: "ip2" },
];

const testAdminIPData = {
  ipAddress: testIpAddress,
  ipType: "ADMIN",
};
