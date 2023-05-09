declare module "@types" {
  type DateType = string | number | Date | null | undefined;

  interface ErrorData {
    code: number;
    message: string;
  }
}
