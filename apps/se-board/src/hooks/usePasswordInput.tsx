import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";

import { modifyPostState, writePostState } from "@/store";

export const usePasswordInput = (isModified: boolean) => {
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [modifyPost, setModifyPost] = useRecoilState(modifyPostState);
  const [writePost, setWritePost] = useRecoilState(writePostState);

  const handleClick = () => setShow(!show);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);

      if (!isModified) {
        setWritePost({
          ...writePost,
          exposeOption: {
            name: writePost.exposeOption.name,
            password: e.target.value,
          },
        });
      } else {
        setModifyPost({
          ...modifyPost,
          exposeOption: {
            name: modifyPost.exposeOption.name,
            password: e.target.value,
          },
        });
      }
    },
    [writePost, modifyPost]
  );

  return {
    password,
    setPassword,
    show,
    handleClick,
    handleChange,
  };
};
