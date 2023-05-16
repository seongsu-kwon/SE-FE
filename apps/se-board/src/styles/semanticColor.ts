import { openColors } from "./openColor";

export const semanticColors = {
  primary: openColors.blue[5],
  "primary-focus": openColors.blue[7],
  "primary-content": openColors.white,
  "primary-inActive": openColors.blue[2],
  error: openColors.red[7],
  "error-focus": openColors.red[8],
  "error-content": openColors.white,
  "error-inActive": openColors.red[2],
} as const;
