import {
  deleteAdminIP,
  deleteBannedIp,
  deleteSpamKeyWord,
  getAdminIPs,
  getBannedIp,
  getSpamKeyWord,
  postAdminIP,
  postBannedIp,
  postSpamKeyWord,
} from "@/api/generalPolicy";
import {
  testAdminIPs,
  testIpAddress,
  testIpAddressArr,
  testSpam,
  testSpamWordArr,
} from "@/mocks/generalPolicyHandlers";

describe("generalPolicy api 테스트", () => {
  it("getBannedIp 테스트", async () => {
    const result = await getBannedIp();
    expect(result).toStrictEqual(testIpAddressArr);
  });

  it("postBannedIp 테스트", async () => {
    const result = await postBannedIp(testIpAddress);
    expect(result).toBe("OK");
  });

  it("postBannedIp 잘못된 데이터를 보냇을 경우 에러 수신 테스트", async () => {
    try {
      await postBannedIp("1234");
    } catch (error) {
      expect(error).toBe("Bad Request");
    }
  });

  it("deleteBannedIp 테스트", async () => {
    const result = await deleteBannedIp(testIpAddress);
    expect(result).toBe("OK");
  });

  it("deleteBannedIp 잘못된 데이터를 보냇을 경우 에러 수신 테스트", async () => {
    try {
      await deleteBannedIp("1234");
    } catch (error) {
      expect(error).toBe("Bad Request");
    }
  });

  it("getSpamKeyWordHandler 테스트", async () => {
    const result = await getSpamKeyWord();
    expect(result).toStrictEqual(testSpamWordArr);
  });

  it("postSpamKeyWord 테스트", async () => {
    const result = await postSpamKeyWord(testSpam);
    expect(result).toBe("OK");
  });

  it("postSpamKeyWord 잘못된 데이터를 보냇을 경우 에러 수신 테스트", async () => {
    try {
      await postSpamKeyWord("1234");
    } catch (error) {
      expect(error).toBe("Bad Request");
    }
  });

  it("deleteSpamKeyWord 테스트", async () => {
    const result = await deleteSpamKeyWord(1);
    expect(result).toBe("OK");
  });

  it("deleteSpamKeyWord 잘못된 데이터를 보냇을 경우 에러 수신 테스트", async () => {
    try {
      await deleteSpamKeyWord(1234);
    } catch (error) {
      expect(error).toBe("Bad Request");
    }
  });

  it("getAdminIPs 테스트", async () => {
    const result = await getAdminIPs();
    expect(result).toStrictEqual(testAdminIPs);
  });

  it("postAdminIP 테스트", async () => {
    const result = await postAdminIP(testIpAddress);
    expect(result).toBe("OK");
  });

  it("postAdminIP 잘못된 데이터를 보냇을 경우 에러 수신 테스트", async () => {
    try {
      await postAdminIP(testIpAddress);
    } catch (error) {
      expect(error).toBe("Bad Request");
    }
  });

  it("deleteAdminIP 테스트", async () => {
    const result = await deleteAdminIP(testIpAddress);
    expect(result).toBe("OK");
  });

  it("deleteAdminIP 잘못된 데이터를 보냇을 경우 에러 수신 테스트", async () => {
    try {
      await deleteAdminIP(testIpAddress);
    } catch (error) {
      expect(error).toBe("Bad Request");
    }
  });
});
