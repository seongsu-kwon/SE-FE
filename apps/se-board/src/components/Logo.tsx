import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { ReactComponent as SELogo } from "@/assets/images/se_logo.svg";
import { semanticColors } from "@/styles";

export const Logo = ({ size }: { size: string }) => {
  return (
    <Link to="/">
      <Box boxSize={size}>
        <SELogo width="100%" height="100%" fill={semanticColors.primary} />
      </Box>
    </Link>
  );
};
