import { Button, HStack } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

export const AdminPostFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onClickAll = () => {
    setSearchParams("");
  };
  const onClickKumoh = () => {
    setSearchParams("expose=KUMOH");
  };
  const onClickSecret = () => {
    setSearchParams("expose=PRIVACY");
  };
  const onClickReported = () => {
    setSearchParams("reported=true");
  };

  return (
    <HStack flexWrap="wrap">
      <Button
        variant="ghost"
        onClick={onClickAll}
        color={
          searchParams.get("expose") === null &&
          searchParams.get("reported") === null
            ? "primary"
            : ""
        }
      >
        전체
      </Button>
      <Button
        variant="ghost"
        onClick={onClickKumoh}
        color={searchParams.get("expose") === "KUMOH" ? "primary" : ""}
      >
        금오
      </Button>
      <Button
        variant="ghost"
        onClick={onClickSecret}
        color={searchParams.get("expose") === "PRIVACY" ? "primary" : ""}
      >
        비밀
      </Button>
      <Button
        variant="ghost"
        onClick={onClickReported}
        color={searchParams.get("reported") === "true" ? "primary" : ""}
      >
        신고
      </Button>
    </HStack>
  );
};
