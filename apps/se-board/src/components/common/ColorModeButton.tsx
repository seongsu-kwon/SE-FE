import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Hide, IconButton, Show, useColorMode } from "@chakra-ui/react";

export const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Show above="md">
        <IconButton
          onClick={toggleColorMode}
          aria-label="mode button"
          size="lg"
          borderRadius={100}
          bgColor={colorMode === "light" ? "gary.1" : "whiteAlpha.300"}
          color={colorMode === "light" ? "gray.8" : "whiteAlpha.900"}
          position="fixed"
          right={5}
          bottom={5}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        />
      </Show>
      <Hide above="md">
        <IconButton
          onClick={toggleColorMode}
          aria-label="mode button"
          size="lg"
          borderRadius={100}
          bgColor={colorMode === "light" ? "gary.1" : "whiteAlpha.300"}
          color={colorMode === "light" ? "gray.8" : "whiteAlpha.900"}
          position="fixed"
          right={20}
          top={1}
          zIndex={100}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        />
      </Hide>
    </>
  );
};
