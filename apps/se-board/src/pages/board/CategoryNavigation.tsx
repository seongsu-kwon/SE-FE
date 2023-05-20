import { Button, HStack } from "@chakra-ui/react";
import { Menu } from "@types";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const CategoryNavigation = ({
  categoryList,
}: {
  categoryList: Menu[];
}) => {
  const [searchPrams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const category = searchPrams.get("category");
    if (!category) return;
    if (!categoryList.some((v) => v.urlId === category)) {
      searchPrams.delete("category");
      setSearchParams(searchPrams);
    }
  }, [searchPrams]);
  return (
    <HStack flexWrap="wrap">
      <Button
        onClick={() => {
          searchPrams.delete("category");
          searchPrams.delete("page");
          setSearchParams(searchPrams);
        }}
        variant="ghost"
        color={!searchPrams.get("category") ? "primary" : ""}
      >
        전체
      </Button>
      {categoryList.map((category) => (
        <Button
          key={category.menuId}
          onClick={() => {
            searchPrams.set("category", category.urlId);
            searchPrams.delete("page");
            setSearchParams(searchPrams);
          }}
          variant="ghost"
          color={
            searchPrams.get("category") === category.urlId ? "primary" : ""
          }
        >
          {category.name}
        </Button>
      ))}
    </HStack>
  );
};
