import {
  Box,
  Button,
  Flex,
  FormLabel,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface BannerItemProps {
  img: string;
  startDate: string;
  endDate: string;
  link: string;
}

export const BannerItem = ({
  img,
  startDate,
  endDate,
  link,
}: BannerItemProps) => {
  const [isModify, setIsModify] = useState(false);
  const [modifyData, setModifyData] = useState({
    img: img,
    startDate: startDate,
    endDate: endDate,
    link: link,
  });

  const bannerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const formData = new FormData();

    formData.append("banner", e.target.files[0]);
  };

  return (
    <Box py="1rem">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="full"
        border="1px solid"
        borderColor="gray.2"
        h="12rem"
        bgColor="gray.5"
      >
        {!isModify ? <Image src={img} /> : "배너 이미지"}
      </Box>

      {isModify && (
        <Flex my="0.75rem" alignItems="end">
          <FormLabel
            htmlFor="banner-input"
            w="7rem"
            h="2rem"
            my="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="1px solid"
            borderColor="blue.5"
            borderRadius="0.25rem"
            cursor="pointer"
            bgColor="blue.5"
            color="white"
            _hover={{ bgColor: "blue.7", color: "white" }}
          >
            배너 등록
          </FormLabel>
          <Text fontSize="xs" ml="-0.5rem">
            배너 권장 사이즈는 @ ✕ @ 입니다.
          </Text>
          <Input
            id="banner-input"
            type="file"
            accept="image/*"
            multiple={false}
            display="none"
            onChange={bannerInput}
          />
        </Flex>
      )}

      <Flex mt="0.5rem" alignItems="center">
        <Text fontSize="sm" mr="0.5rem">
          게시 기간
        </Text>
        {!isModify ? (
          <Text fontSize="sm">
            {startDate} ~ {endDate}
          </Text>
        ) : (
          <>
            <Input
              type="date"
              size="sm"
              w="15rem"
              value={startDate}
              onChange={(e) =>
                setModifyData({ ...modifyData, startDate: e.target.value })
              }
            />
            <Text fontSize="sm" mx="0.5rem">
              ~
            </Text>
            <Input
              type="date"
              size="sm"
              w="15rem"
              value={endDate}
              onChange={(e) =>
                setModifyData({ ...modifyData, endDate: e.target.value })
              }
            />
          </>
        )}
      </Flex>
      <Flex mt="0.5rem" alignItems="center">
        <Text fontSize="sm" mr="0.5rem">
          링크
        </Text>
        {!isModify ? (
          <Text fontSize="sm">{link}</Text>
        ) : (
          <Input
            type="text"
            size="sm"
            w="15rem"
            value={link}
            onChange={(e) =>
              setModifyData({ ...modifyData, link: e.target.value })
            }
          />
        )}
      </Flex>
      <Flex mt="0.5rem" alignItems="center" justifyContent="flex-end">
        {!isModify ? (
          <>
            <Button variant="danger" size="sm">
              삭제
            </Button>
            <Button
              variant="primary"
              ml="0.5rem"
              size="sm"
              onClick={() => setIsModify(true)}
            >
              수정
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setIsModify(false)}
            >
              취소
            </Button>
            <Button
              variant="primary"
              ml="0.5rem"
              size="sm"
              onClick={() => setIsModify(false)}
            >
              등록
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
};

interface AddBannerItemProps {
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddBannerItem = ({ setIsAdd }: AddBannerItemProps) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [link, setLink] = useState("");

  const bannerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const formData = new FormData();

    formData.append("banner", e.target.files[0]);
  };

  return (
    <Box pt="1rem">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="full"
        border="1px solid"
        h="12rem"
      >
        배너 이미지
      </Box>
      <Flex my="0.75rem" alignItems="end">
        <FormLabel
          htmlFor="banner-input"
          w="7rem"
          h="2rem"
          my="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="1px solid"
          borderColor="blue.5"
          borderRadius="0.25rem"
          cursor="pointer"
          bgColor="blue.5"
          color="white"
          _hover={{ bgColor: "blue.7", color: "white" }}
        >
          배너 등록
        </FormLabel>
        <Text fontSize="xs" ml="-0.5rem">
          배너 권장 사이즈는 @ ✕ @ 입니다.
        </Text>
        <Input
          id="banner-input"
          type="file"
          accept="image/*"
          multiple={false}
          display="none"
          onChange={bannerInput}
        />
      </Flex>

      <Flex mt="0.5rem" alignItems="center">
        <Text fontSize="sm" mr="0.5rem">
          게시 기간
        </Text>
        <Input
          type="date"
          size="sm"
          w="15rem"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Text fontSize="sm" mx="0.5rem">
          ~
        </Text>
        <Input
          type="date"
          size="sm"
          w="15rem"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Flex>
      <Flex mt="0.5rem" alignItems="center">
        <Text fontSize="sm" mr="0.5rem">
          링크
        </Text>
        <Input
          type="text"
          size="sm"
          w="20rem"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </Flex>
      <Flex mt="0.5rem" alignItems="center" justifyContent="flex-end">
        <Button variant="danger" size="sm" onClick={() => setIsAdd(false)}>
          취소
        </Button>
        <Button
          variant="primary"
          ml="0.5rem"
          size="sm"
          onClick={() => setIsAdd(false)}
        >
          등록
        </Button>
      </Flex>
    </Box>
  );
};
