import { PostTable } from "@/components";

import { MOCK_NOTICE_LIST } from "./mockData";

export const NoticeTable = () => {
  return <PostTable data={MOCK_NOTICE_LIST} />;
};
