import { Flex, Image } from "@chakra-ui/react";
import { BannerDTO } from "@types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Carousel = ({ banners }: { banners: BannerDTO[] }) => {
  const [viewIndex, setViewIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setViewIndex((prev) => (prev + 1) % banners.length);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [banners]);

  const onClickBanner = (banner: BannerDTO) => {
    if (banner.bannerUrl.startsWith("https://seboard.site"))
      navigate(banner.bannerUrl.substring(20));
    else window.location.href = banner.bannerUrl;
  };

  return (
    <Flex w="full">
      {banners.map((banner, i) => (
        <Image
          _hover={{ cursor: "pointer" }}
          onClick={() => onClickBanner(banner)}
          w="full"
          objectFit="contain"
          key={i}
          display={viewIndex === i ? "block" : "none"}
          src={`${process.env.REACT_APP_FILE_ENDPOINT}/${banner.fileMetaData.url}`}
        />
      ))}
    </Flex>
  );
};
