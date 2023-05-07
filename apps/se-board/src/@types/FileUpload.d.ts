import { Attachment } from ".post/Attachment";

declare module "@types" {
  interface FileUploaderProps {
    isModified: boolean;
    beforeFiles: Attachment[];
  }
}
