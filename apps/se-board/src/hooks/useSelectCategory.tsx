import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { modifyPostState, writePostState } from "@/store";

interface CategoryInfo {
  categoryId: number;
  name: string;
}

export function useSelectCategory(
  isModified: boolean,
  beforeCategory: CategoryInfo
) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryInfo>({
    categoryId: -1,
    name: "",
  });
  const [writePost, setWritePost] = useRecoilState(writePostState);
  const [modifyPost, setModifyPost] = useRecoilState(modifyPostState);

  useEffect(() => {
    setSelectedCategory(beforeCategory);
  }, [beforeCategory]);

  const selectOption = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value, id } = e.target;
      console.log(value, id);

      setSelectedCategory({ categoryId: Number(id), name: value });

      // 서버에 전달할 데이터 수정
      if (!isModified) {
        setWritePost({
          ...writePost,
          categoryId: Number(id),
        });
      } else {
        setModifyPost({
          ...modifyPost,
          categoryId: Number(id), // 카테고리 받아오는 로직 구현 후 선택된 카테고리 id로 수정
        });
      }
    },
    [writePost, modifyPost]
  );

  return { selectedCategory, setSelectedCategory, selectOption };
}
