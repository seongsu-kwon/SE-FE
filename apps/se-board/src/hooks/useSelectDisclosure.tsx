import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { modifyPostState, writePostState } from "@/store";

const privacyOptions = [
  { id: "전체", value: "모든 사용자가 볼 수 있습니다.", eng: "PUBLIC" },
  { id: "금오인", value: "인증된 금오인만 볼 수 있습니다.", eng: "KUMOH" },
  { id: "비밀", value: "비밀글입니다.", eng: "PRIVACY" },
];

export function useSelectDisclosure(
  beforePrivacy: string,
  isModified: boolean
) {
  const [subscript, setSubscript] = useState<string>("");
  const [active, setActive] = useState<string>("");
  const [modifyPost, setModifyPost] = useRecoilState(modifyPostState);
  const [writePost, setWritePost] = useRecoilState(writePostState);

  useEffect(() => {
    setActive(beforePrivacy);
    setSubscript(
      privacyOptions.find((option) => option.id === beforePrivacy)?.value || ""
    );
  }, [beforePrivacy]);

  const onClickDisclosure = useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.TouchEvent<HTMLButtonElement>
    ) => {
      const { innerHTML } = e.currentTarget;

      setSubscript(
        privacyOptions.find((option) => option.id === innerHTML)?.value || ""
      );

      setActive(innerHTML);

      const exposeOptionName =
        privacyOptions.find((option) => option.id === innerHTML)?.eng || "";

      if (!isModified) {
        setWritePost({
          ...writePost,
          exposeOption: {
            name: exposeOptionName,
            password: writePost.exposeOption.password,
          },
        });
      } else {
        setModifyPost({
          ...modifyPost,
          exposeOption: {
            name: exposeOptionName,
            password: modifyPost.exposeOption.password,
          },
        });
      }
    },
    [modifyPost, writePost]
  );

  return { subscript, setSubscript, active, setActive, onClickDisclosure };
}
