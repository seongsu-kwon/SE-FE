import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";

export const PostSearchForm = () => {
  const [searchPrams, setSearchParams] = useSearchParams();

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      field: { value: string };
      query: { value: string };
    };
    const field = target.field.value;
    const query = target.query.value;
    if (!query) {
      searchPrams.delete(field);
      setSearchParams(searchPrams);
    } else {
      searchPrams.append(field, query);
      setSearchParams(searchPrams);
    }
  };

  return (
    <form onSubmit={search}>
      <Flex gap="0.5rem" w="full">
        <Select name="field" rounded="full" w="10rem">
          <option value="title">제목</option>
          <option value="author">작성자</option>
        </Select>
        <InputGroup>
          <Input name="query" placeholder="검색" rounded="full" />
          <Tooltip label="검색">
            <InputRightElement>
              <Button variant="ghost" _hover={{ bgColor: "transparent" }}>
                <Icon as={BsSearch} />
              </Button>
            </InputRightElement>
          </Tooltip>
        </InputGroup>
      </Flex>
    </form>
  );
};
