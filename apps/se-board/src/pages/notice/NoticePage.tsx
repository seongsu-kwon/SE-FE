import { Hide } from "@chakra-ui/react";

import { NoticeList } from "./NoticeList";

export const NoticePage = () => {
  return (
    <div>
      <Hide above="md">
        <NoticeList />
      </Hide>
    </div>
  );
};
