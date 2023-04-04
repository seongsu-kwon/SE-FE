import { Button, HStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const categoryList = ["일반", "강의", "학사", "행사", "학생회"];

export const CategoryNavigation = () => {
  const [searchPrams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const category = searchPrams.get("category");
    if (!category) return;
    if (!categoryList.includes(category)) {
      searchPrams.delete("category");
      setSearchParams(searchPrams);
    }
  }, [searchPrams]);
  return (
    <HStack>
      <Button
        onClick={() => {
          searchPrams.delete("category");
          setSearchParams(searchPrams);
        }}
        variant="ghost"
        color={!searchPrams.get("category") ? "primary" : ""}
      >
        전체
      </Button>

      {categoryList.map((category) => (
        <Button
          key={category}
          onClick={() => setSearchParams([["category", category]])}
          variant="ghost"
          color={searchPrams.get("category") === category ? "primary" : ""}
        >
          {category}
        </Button>
      ))}
    </HStack>
  );
};
