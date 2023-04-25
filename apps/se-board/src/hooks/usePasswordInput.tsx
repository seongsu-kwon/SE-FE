import React, { useState } from "react";
import { useRecoilState } from "recoil";

import { modifyPostState } from "@/store";

export const usePasswordInput = () => {
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [modifyPost, setModifyPost] = useRecoilState(modifyPostState);

  const handleClick = () => setShow(!show);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    setModifyPost({
      ...modifyPost,
      exposeOption: {
        name: "비밀",
        password: e.target.value,
      },
    });
  };

  return {
    password,
    show,
    handleClick,
    handleChange,
  };
};
