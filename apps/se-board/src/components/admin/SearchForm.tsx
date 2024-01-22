import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { BsSearch } from "react-icons/bs";

interface SearchFormProps {
  searchOption: string;
  query: string;
  setSearchOptionAndQuery: (searchOption: string, query: string) => void;
  searchOptions: { value: string; label: string }[];
}

export const SearchForm = ({
  searchOption,
  query,
  setSearchOptionAndQuery,
  searchOptions,
}: SearchFormProps) => {
  const [inputs, setInputs] = useState({
    searchOption: "ALL",
    query: "",
  });

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchOptionAndQuery(inputs.searchOption, inputs.query);
  };

  useEffect(() => {
    setInputs({ searchOption, query });
  }, [searchOption, query]);

  return (
    <form onSubmit={onSearch}>
      <Flex gap="0.5rem" w="full">
        <Select
          value={inputs.searchOption}
          onChange={(e) =>
            setInputs((prev) => ({ ...prev, searchOption: e.target.value }))
          }
          name="option"
          rounded="full"
          w="13rem"
        >
          {searchOptions.map((option, idx) => (
            <option value={option.value} key={option.value + idx}>
              {option.label}
            </option>
          ))}
        </Select>
        <InputGroup>
          <Input
            value={inputs.query}
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, query: e.target.value }))
            }
            name="query"
            placeholder="검색"
            rounded="full"
          />
          <Tooltip label="검색">
            <InputRightElement>
              <IconButton
                type="submit"
                variant="ghost"
                aria-label="Search"
                icon={<BsSearch />}
                _hover={{ bgColor: "transparent" }}
              />
            </InputRightElement>
          </Tooltip>
        </InputGroup>
      </Flex>
    </form>
  );
};
