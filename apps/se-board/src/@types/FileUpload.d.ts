import { Attachment } from ".post/Attachment";

declare module "@types" {
  interface FileUploaderProps {
    onFileDrop: (file: Array<File>) => void;
    beforeFiles?: Attachment[];
  }
}
