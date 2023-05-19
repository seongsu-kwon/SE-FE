import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";

import { openColors } from "./openColor";
import { semanticColors } from "./semanticColor";

const buttonStyle: ComponentStyleConfig = {
  variants: {
    primary: {
      backgroundColor: semanticColors.primary,
      color: semanticColors["primary-content"],
      _hover: {
        bg: semanticColors["primary-focus"],
        backgroundColor: semanticColors["primary-focus"],
        _disabled: {
          backgroundColor: semanticColors.primary,
        },
      },
      _disabled: {
        bakgroundColor: semanticColors.primary,
      },
    },
    "primary-outline": {
      border: `1px solid ${semanticColors.primary}`,
      color: semanticColors.primary,
      _hover: {
        backgroundColor: semanticColors.primary,
        color: semanticColors["primary-content"],
      },
    },
    "primary-inActive": {
      backgroundColor: semanticColors["primary-inActive"],
      color: semanticColors["primary-content"],
      cursor: "not-allowed",
    },
    danger: {
      backgroundColor: semanticColors.error,
      color: semanticColors["error-content"],
      _hover: {
        backgroundColor: semanticColors["error-focus"],
        _disabled: {
          backgroundColor: semanticColors.error,
        },
      },
      _disabled: {
        bakgroundColor: semanticColors.error,
      },
    },
    "danger-outline": {
      border: `1px solid ${semanticColors.error}`,
      color: semanticColors.error,
      _hover: {
        backgroundColor: semanticColors.error,
        color: semanticColors["error-content"],
      },
    },
    "danger-inActive": {
      backgroundColor: semanticColors["error-inActive"],
      color: semanticColors["error-content"],
      cursor: "not-allowed",
    },
  },
};

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        color: openColors.gray[7],
      },
      ".ck": {
        h1: {
          display: "block",
          fontSize: "2em",
          marginTop: "0.67em",
          marginBottom: "0.67em",
          marginLeft: 0,
          marginRight: 0,
          fontWeight: "bold",
        },
        h2: {
          display: "block",
          fontSize: "1.5em",
          marginTop: "0.83em",
          marginBottom: "0.83em",
          marginLeft: 0,
          marginRight: 0,
          fontWeight: "bold",
        },
        h3: {
          display: "block",
          fontSize: "1.17em",
          marginTop: "1em",
          marginBottom: "1em",
          marginLeft: 0,
          marginRight: 0,
          fontWeight: "bold",
        },
      },
    },
  },
  fonts: {
    heading: `"Noto Sans KR", sans-serif`,
    body: `"Noto Sans KR", sans-serif`,
  },
  colors: { ...openColors, ...semanticColors },
  components: {
    Button: buttonStyle,
  },
});
