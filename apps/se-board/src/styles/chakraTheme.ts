import { extendTheme } from "@chakra-ui/react";

import { openColors } from "./openColor";

export const semanticColors_1 = {
  primary: openColors.blue[5],
  "primary-focus": openColors.blue[7],
  "primary-comtent": openColors.white,
  error: openColors.red[7],
  "error-content": openColors.white,
} as const;

export const theme = extendTheme({
  colors: { ...openColors, ...semanticColors_1 },
});
