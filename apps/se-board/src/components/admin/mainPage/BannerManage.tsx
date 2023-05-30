import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";

import { AddBannerItem, BannerItem } from "./BannerItem";

const data = {
  list: [
    {
      img: "",
      startDate: "2023-05-22",
      endDate: "2023-05-29",
      link: "www.kumoh.ac.kr",
    },
    {
      img: "",
      startDate: "2023-05-22",
      endDate: "2023-05-29",
      link: "www.kumoh.ac.kr",
    },
    {
      img: "",
      startDate: "2023-05-22",
      endDate: "2023-05-29",
      link: "www.kumoh.ac.kr",
    },
  ],
};

export const BannerManage = () => {
  const [isAdd, setIsAdd] = useState(false);

  return (
    <Box
      my="20px"
      bgColor="white"
      py="1rem"
      px={{ base: "0.75rem", md: "1rem" }}
      rounded="3xl"
    >
      <Text
        fontWeight="semibold"
        fontSize={{ base: "xl", md: "2xl" }}
        mb="20px"
        borderBottom="1px solid"
        borderColor="gray.5"
      >
        배너 관리
      </Text>
      {data.list.map((value) => (
        <BannerItem
          img={value.img}
          startDate={value.startDate}
          endDate={value.endDate}
          link={value.link}
        />
      ))}
      {isAdd && <AddBannerItem setIsAdd={setIsAdd} />}
      <Divider my="1rem" />
      <Box textAlign="right">
        <Button
          leftIcon={<BsPlusLg />}
          variant="primary"
          isDisabled={isAdd}
          onClick={() => setIsAdd(true)}
        >
          추가
        </Button>
      </Box>
    </Box>
  );
};
