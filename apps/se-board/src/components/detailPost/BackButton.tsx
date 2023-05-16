import { Icon } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Icon
      aria-label="뒤로가기"
      as={BsArrowLeft}
      w="40px"
      h="40px"
      p="8px"
      ml="8px"
      onClick={handleClick}
    ></Icon>
  );
};
