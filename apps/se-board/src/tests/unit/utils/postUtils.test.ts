import { PostDetail, PostMutate } from "@types";
import dayjs from "dayjs";

import {
  commentsSizeFormat,
  convertModifyPostData,
  convertPostInfo,
  getExposeOptionName,
  isModified,
  isRecentModifiedPost,
  isRecentPost,
  isWritePostActive,
} from "@/utils/postUtils";

describe("Post Utility Functions", () => {
  describe("commentsSizeFormat", () => {
    it("should format comments size correctly", () => {
      expect(commentsSizeFormat(50)).toBe("50");
      expect(commentsSizeFormat(100)).toBe("99+");
    });
  });

  describe("isModified", () => {
    it("should return true if the dates are different", () => {
      const result = isModified("2023-01-01", "2023-01-02");
      expect(result).toBe(true);
    });

    it("should return false if the dates are the same", () => {
      const result = isModified("2023-01-01", "2023-01-01");
      expect(result).toBe(false);
    });
  });

  describe("isRecentModifiedPost", () => {
    it("should return true for a recently modified post", () => {
      jest.spyOn(dayjs.prototype, "diff").mockReturnValue(10);
      const result = isRecentModifiedPost("2023-01-01", "2023-01-02");
      expect(result).toBe(true);
    });

    it("should return false for a non-recently modified post", () => {
      jest.spyOn(dayjs.prototype, "diff").mockReturnValue(50);
      const result = isRecentModifiedPost("2023-01-01", "2023-01-02");
      expect(result).toBe(false);
    });
  });

  describe("isRecentPost", () => {
    it("should return true for posts within the last 48 hours", () => {
      jest.spyOn(dayjs.prototype, "diff").mockReturnValue(10);
      const result = isRecentPost("2023-01-01");
      expect(result).toBe(true);
    });

    it("should return false for posts older than 48 hours", () => {
      jest.spyOn(dayjs.prototype, "diff").mockReturnValue(50);
      const result = isRecentPost("2023-01-01");
      expect(result).toBe(false);
    });
  });

  describe("isWritePostActive", () => {
    it("should return an error message if title is empty", () => {
      const postData: PostMutate = {
        title: "",
        contents: "Some content",
        categoryId: 1,
        pined: false,
        exposeOption: { name: "PUBLIC", password: "" },
        attachmentIds: [],
      };
      const result = isWritePostActive(postData, false);
      expect(result).toBe("제목을 입력해주세요.");
    });

    it("should return an error message if contents are empty", () => {
      const postData: PostMutate = {
        title: "Some title",
        contents: "",
        categoryId: 1,
        pined: false,
        exposeOption: { name: "PUBLIC", password: "" },
        attachmentIds: [],
      };
      const result = isWritePostActive(postData, false);
      expect(result).toBe("내용을 입력해주세요.");
    });

    it("should return an error message if categoryId is -1", () => {
      const postData: PostMutate = {
        title: "Some title",
        contents: "Some content",
        categoryId: -1,
        pined: false,
        exposeOption: { name: "PUBLIC", password: "" },
        attachmentIds: [],
      };
      const result = isWritePostActive(postData, false);
      expect(result).toBe("카테고리를 선택해주세요.");
    });

    it("should return an error message if exposeOption.name is empty", () => {
      const postData: PostMutate = {
        title: "Some title",
        contents: "Some content",
        categoryId: 1,
        pined: false,
        exposeOption: { name: "", password: "" },
        attachmentIds: [],
      };
      const result = isWritePostActive(postData, false);
      expect(result).toBe("공개 설정을 선택해주세요.");
    });

    it("should return null if all conditions are met", () => {
      const postData: PostMutate = {
        title: "Some title",
        contents: "Some content",
        categoryId: 1,
        pined: false,
        exposeOption: { name: "PUBLIC", password: "" },
        attachmentIds: [],
      };
      const result = isWritePostActive(postData, false);
      expect(result).toBeNull();
    });
  });

  describe("convertPostInfo", () => {
    it("should convert post detail to desired format", () => {
      const post: PostDetail = {
        postId: 1,
        title: "Post Title",
        author: { userId: "authorId", name: "Author Name" },
        views: 100,
        category: { categoryId: 1, name: "Category Name" },
        createdAt: "2023-01-01",
        modifiedAt: "2023-01-02",
        contents: "Some content",
        isBookmarked: true,
        isEditable: true,
        exposeType: "PUBLIC",
        attachments: {
          fileMetaDataList: [
            {
              fileMetaDataId: 123,
              originalFileName: "file.jpg",
              storedFileName: "file-123.jpg",
              url: "http://example.com/file-123.jpg",
            },
          ],
        },
        isPined: true,
      };

      const result = convertPostInfo(post);
      expect(result).toEqual({
        postId: 1,
        title: "Post Title",
        author: { loginId: "authorId", name: "Author Name" },
        views: 100,
        category: "Category Name",
        createdAt: "2023-01-01",
        modifiedAt: "2023-01-02",
        bookmarked: true,
        isEditable: true,
      });
    });
  });

  describe("convertModifyPostData", () => {
    it("should return default values when post is null", () => {
      const result = convertModifyPostData(null);
      expect(result).toEqual({
        title: "",
        contents: "",
        categoryId: -1,
        pined: false,
        exposeOption: {
          name: "PUBLIC",
          password: "",
        },
        attachmentIds: [],
      });
    });

    it("should convert post detail to modify data format", () => {
      const post: PostDetail = {
        postId: 1,
        title: "Post Title",
        author: { userId: "authorId", name: "Author Name" },
        views: 100,
        category: { categoryId: 1, name: "Category Name" },
        createdAt: "2023-01-01",
        modifiedAt: "2023-01-02",
        contents: "Post Contents",
        isBookmarked: true,
        isEditable: true,
        exposeType: "PUBLIC",
        attachments: {
          fileMetaDataList: [
            {
              fileMetaDataId: 123,
              originalFileName: "file.jpg",
              storedFileName: "file-123.jpg",
              url: "http://example.com/file-123.jpg",
            },
          ],
        },
        isPined: true,
      };

      const result = convertModifyPostData(post);
      expect(result).toEqual({
        title: "Post Title",
        contents: "Post Contents",
        categoryId: 1,
        pined: true,
        exposeOption: {
          name: "PUBLIC",
          password: "",
        },
        attachmentIds: [123],
      });
    });
  });

  describe("getExposeOptionName", () => {
    it("should return the correct name for each expose option", () => {
      expect(getExposeOptionName("PUBLIC")).toBe("전체");
      expect(getExposeOptionName("PRIVACY")).toBe("비밀글");
      expect(getExposeOptionName("KUMOH")).toBe("금오인");
      expect(getExposeOptionName("UNKNOWN")).toBe("");
    });
  });
});
