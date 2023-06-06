import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormLabel,
  Image,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Attachment } from "@types";
import React, { useEffect, useRef, useState } from "react";

import {
  useDeleteBannerQuery,
  usePostBannerQuery,
  usePutBannerQuery,
} from "@/react-query/hooks/useBannerQuery";
import {
  useDeleteFileQuery,
  usePostFileQuery,
} from "@/react-query/hooks/useFileQuery";
import { errorHandle } from "@/utils/errorHandling";

interface BannerItemProps {
  bannerId: number;
  fileMetaData: Attachment;
  startDate: string;
  endDate: string;
  link: string;
  refetch: () => void;
}

export const BannerItem = ({
  bannerId,
  fileMetaData,
  startDate,
  endDate,
  link,
  refetch,
}: BannerItemProps) => {
  const { mutate: bannerModifyMutate } = usePutBannerQuery();
  const { mutate: bannerInfoDeleteMutate } = useDeleteBannerQuery();
  const { mutate: bannerUploadMutate } = usePostFileQuery();
  const { mutate: bannerDeleteMutate } = useDeleteFileQuery();

  const [isModify, setIsModify] = useState(false);
  const [newFileMetaData, setNewFileMetaData] = useState<
    Attachment | undefined
  >(undefined);
  const [newStartDate, setNewStartDate] = useState(startDate);
  const [newEndDate, setNewEndDate] = useState(endDate);
  const [newLink, setNewLink] = useState(link);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setNewStartDate(startDate);
    setNewEndDate(endDate);
    setNewLink(link);
  }, [startDate, endDate, link]);

  const bannerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const formData = new FormData();

    formData.append("files", e.target.files[0]);
    console.log(formData);

    bannerUploadMutate(formData, {
      onSuccess: (metaData) => {
        if (newFileMetaData) {
          bannerDeleteMutate(newFileMetaData.fileMetaDataId);
        }
        setNewFileMetaData(metaData.fileMetaDataList[0]);
      },
    });
  };

  const onModify = () => {
    if (!newFileMetaData) {
      return alert("배너 이미지를 등록해주세요.");
    }

    if (!newStartDate || !newEndDate) {
      return alert("게시 기간을 입력해주세요.");
    }

    if (!newLink) {
      return alert("링크를 입력해주세요.");
    }

    bannerModifyMutate(
      {
        bannerId,
        data: {
          startDate: newStartDate,
          endDate: newEndDate,
          bannerUrl: newLink,
          fileMetaDataId: newFileMetaData.fileMetaDataId,
        },
      },
      {
        onSuccess: () => {
          setIsModify(false);
          bannerDeleteMutate(fileMetaData.fileMetaDataId);
          refetch();
        },
        onError: (error) => {
          errorHandle(error);
        },
      }
    );
  };

  return (
    <>
      <Box py="1rem">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="full"
          border="1px solid"
          borderColor="gray.2"
          h="12rem"
        >
          <Image
            w="full"
            h="full"
            objectFit="contain"
            src={
              !isModify
                ? `${process.env.REACT_APP_API_FILE_ENDPOINT}${fileMetaData.url}`
                : newFileMetaData
                ? `${process.env.REACT_APP_API_FILE_ENDPOINT}${newFileMetaData.url}`
                : `${process.env.REACT_APP_API_FILE_ENDPOINT}${fileMetaData.url}`
            }
            alt={fileMetaData.originalFileName}
          />
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
          <Text fontSize="sm" mr="0.5rem" fontWeight="bold">
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
                value={newStartDate}
                onChange={(e) => setNewStartDate(e.target.value)}
              />
              <Text fontSize="sm" mx="0.5rem">
                ~
              </Text>
              <Input
                type="date"
                size="sm"
                w="15rem"
                value={newEndDate}
                onChange={(e) => setNewEndDate(e.target.value)}
              />
            </>
          )}
        </Flex>
        <Flex mt="0.5rem" alignItems="center">
          <Text fontSize="sm" mr="0.5rem" fontWeight="bold">
            링크
          </Text>
          {!isModify ? (
            <Text fontSize="sm">{link}</Text>
          ) : (
            <Input
              type="text"
              size="sm"
              w="15rem"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
            />
          )}
        </Flex>
        <Flex mt="0.5rem" alignItems="center" justifyContent="flex-end">
          {!isModify ? (
            <>
              <Button variant="danger" size="sm" onClick={onOpen}>
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
                bgColor="gray.3"
                size="sm"
                _hover={{ bgColor: "gray.4" }}
                onClick={() => {
                  if (newFileMetaData) {
                    bannerDeleteMutate(newFileMetaData.fileMetaDataId);
                    setNewFileMetaData(undefined);
                  }
                  setIsModify(false);
                }}
              >
                취소
              </Button>
              <Button
                variant="primary"
                ml="0.5rem"
                size="sm"
                onClick={() => onModify()}
              >
                등록
              </Button>
            </>
          )}
        </Flex>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              배너 삭제
            </AlertDialogHeader>

            <AlertDialogBody>배너를 삭제하시겠습니까?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} size="sm">
                취소
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  bannerInfoDeleteMutate(bannerId, {
                    onSuccess: () => {
                      onClose();
                      refetch();
                    },
                    onError: (error) => {
                      errorHandle(error);
                    },
                  });
                }}
                ml={3}
              >
                삭제
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

interface AddBannerItemProps {
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

export const AddBannerItem = ({ setIsAdd, refetch }: AddBannerItemProps) => {
  const { mutate: bannerAddMutate, isLoading } = usePostBannerQuery();
  const { mutate: bannerUploadMutate } = usePostFileQuery();
  const { mutate: bannerDeleteMutate } = useDeleteFileQuery();

  const [fileMetaData, setFileMetaData] = useState<Attachment | undefined>(
    undefined
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [link, setLink] = useState("");

  const bannerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const formData = new FormData();

    formData.append("files", e.target.files[0]);

    bannerUploadMutate(formData, {
      onSuccess: (metaData) => {
        if (fileMetaData) {
          bannerDeleteMutate(fileMetaData.fileMetaDataId);
        }
        setFileMetaData(metaData.fileMetaDataList[0]);
      },
    });
  };

  const addBanner = () => {
    if (!fileMetaData) {
      alert("배너 이미지를 등록해주세요.");
      return;
    }

    if (!startDate || !endDate) {
      alert("게시 기간을 입력해주세요.");
      return;
    }

    if (!link) {
      alert("링크를 입력해주세요.");
      return;
    }

    const reqData = {
      startDate,
      endDate,
      bannerUrl: link,
      fileMetaDataId: fileMetaData.fileMetaDataId,
    };

    bannerAddMutate(reqData, {
      onSuccess: () => {
        setFileMetaData(undefined);
        setStartDate("");
        setEndDate("");
        setLink("");
        setIsAdd(false);
        refetch();
      },
      onError: (error) => {
        errorHandle(error);
      },
    });
  };

  return (
    <Box pt="1rem">
      {fileMetaData ? (
        <Image
          src={`${process.env.REACT_APP_API_FILE_ENDPOINT}${fileMetaData.url}`}
          alt={fileMetaData.originalFileName}
          w="1000px"
          h="180px"
          objectFit="contain"
        />
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="full"
          border="1px solid"
          h="12rem"
          color="gray.5"
        >
          배너 이미지
        </Box>
      )}

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
          배너 업로드
        </FormLabel>
        <Text fontSize="xs" ml="-0.5rem">
          배너 권장 사이즈는 2000px ✕ 360px 입니다.
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
          placeholder="링크를 입력해주세요."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </Flex>
      <Flex mt="0.5rem" alignItems="center" justifyContent="flex-end">
        <Button
          size="sm"
          onClick={() => {
            if (fileMetaData) {
              bannerDeleteMutate(fileMetaData.fileMetaDataId);
            }
            setIsAdd(false);
          }}
        >
          취소
        </Button>
        <Button
          variant="primary"
          ml="0.5rem"
          size="sm"
          isLoading={isLoading}
          loadingText="등록 중"
          onClick={addBanner}
        >
          등록
        </Button>
      </Flex>
    </Box>
  );
};
