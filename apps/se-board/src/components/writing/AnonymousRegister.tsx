import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";

import { openColors } from "@/styles";

export const DesktopAnonymousRegister = ({
  isModified,
  onClickRegistration,
}: {
  isModified: boolean;
  onClickRegistration: () => void;
}) => {
  const [isAnonymous, setIsAnonymous] = useState(false);

  return (
    <Box
      h="75px"
      maxW="100%"
      mb="50px"
      borderBottom="1px solid"
      borderColor={openColors.gray[3]}
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
    >
      <Button
        variant="primary"
        leftIcon={<BsFillPencilFill />}
        size="lg"
        borderRadius="3px"
        onClick={onClickRegistration}
      >
        등록
      </Button>
    </Box>
  );
};
