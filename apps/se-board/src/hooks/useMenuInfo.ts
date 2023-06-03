import React, { useState } from "react";

export const useMenuInfo = () => {
  const [menuName, setMenuName] = useState<string>("");
  const [menuID, setMenuID] = useState<string>("");
  const [menuURL, setMenuURL] = useState<string>("");

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuName(e.target.value);
  };

  const onIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuID(e.target.value);
  };

  const onURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuURL(e.target.value);
  };

  return {
    menuName,
    menuID,
    menuURL,
    setMenuName,
    setMenuID,
    setMenuURL,
    onNameChange,
    onIDChange,
    onURLChange,
  };
};
