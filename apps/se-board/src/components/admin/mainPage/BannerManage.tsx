import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { Banner } from "@types";
import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";

import { useBannerQuery } from "@/react-query/hooks/useBannerQuery";

import { AddBannerItem, BannerItem } from "./BannerItem";

export const BannerManage = () => {
  const { data, refetch } = useBannerQuery();

  const [isAdd, setIsAdd] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    if (!data) return;

    setBanners(data);
  }, [data]);

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
      {banners.map((value) => (
        <BannerItem
          bannerId={value.bannerId}
          fileMetaData={value.fileMetaData}
          startDate={value.startDate}
          endDate={value.endDate}
          link={value.bannerUrl}
          refetch={refetch}
        />
      ))}
      {isAdd && <AddBannerItem setIsAdd={setIsAdd} refetch={refetch} />}
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
