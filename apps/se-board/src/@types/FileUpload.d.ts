declare module "@types" {
  interface FileUploaderProps {
    onFileDrop: (file: Array<File>) => void;
  }
}
