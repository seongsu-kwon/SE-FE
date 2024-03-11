declare module "@types" {
  interface FileExtensions {
    extensionName: string[];
  }

  interface FileConfigurations {
    maxSizePerFile: number;
    maxSizePerPost: number;
  }
}
