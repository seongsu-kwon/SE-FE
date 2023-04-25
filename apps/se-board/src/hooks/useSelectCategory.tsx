import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";

import { modifyPostState } from "@/store";

export function useSelectCategory(beforeCategory?: string) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    beforeCategory || ""
  );
  const [modifyPost, setModifyPost] = useRecoilState(modifyPostState);

  const selectOption = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;

      setSelectedCategory(value);

      setModifyPost({
        ...modifyPost,
        // categoryId: 5, // 카테고리 받아오는 로직 구현 후 선택된 카테고리 id로 수정
      });
    },
    []
  );

  return { selectedCategory, setSelectedCategory, selectOption };
}
