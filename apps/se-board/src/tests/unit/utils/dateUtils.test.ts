import {
  isModifiedContent,
  isSameDateTime,
  toYYMMDD_DOT,
  toYYYYMMDDHHhh,
  toYYYYMMDDHHhhss,
} from "@/utils/dateUtils";

describe("dateUtils test", () => {
  it("change date format to YY.MM.DD", () => {
    expect(toYYMMDD_DOT("2024-08-04")).toBe("24.08.04");
  });

  it("same date should return true", () => {
    expect(isSameDateTime("2024-08-04", "2024-08-04")).toBeTruthy();
  });

  it("different date should return false", () => {
    expect(isSameDateTime("2024-08-04", "2024-10-12")).toBeFalsy();
  });

  it("change date format to YYYY.MM.DD HH:mm:ss", () => {
    expect(toYYYYMMDDHHhhss("2024-08-04 18:33:00")).toBe("2024.08.04 18:33:00");
  });

  it("change date format to YYYY.MM.DD HH:mm", () => {
    expect(toYYYYMMDDHHhh("2024-08-04 18:33:00")).toBe("2024.08.04 18:33");
  });

  it("modified content should return true", () => {
    const createdDate = "2024-08-04 18:33:00";
    const modifedDate = "2024-08-05 18:00:00";
    expect(isModifiedContent(createdDate, modifedDate)).toBeTruthy();
  });

  it("unmodified content should return false", () => {
    const createdDate = "2024-08-04 18:33:00";
    const modifiedDate = "2024-08-04 18:33:00";
    expect(isModifiedContent(createdDate, modifiedDate)).toBeFalsy();
  });
});
