import React, { useState } from "react";

export const usePasswordInput = () => {
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const handleClick = () => setShow(!show);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return {
    password,
    show,
    handleClick,
    handleChange,
  };
};
