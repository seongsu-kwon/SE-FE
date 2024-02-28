import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { modifyPostState, writePostState } from "@/store";

export const useAnonymousAndPined = (
  isModified: boolean,
  beforePined: boolean
) => {
  const [writePost, setWritePost] = useRecoilState(writePostState);
  const [modifyPost, setModifyPost] = useRecoilState(modifyPostState);

  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPined, setIsPined] = useState(false);
  const [isOldVersion, setIsOldVersion] = useState(false);

  useEffect(() => {
    setIsPined(beforePined);
  }, [beforePined]);

  const onClickAnonymous = useCallback(() => {
    setIsAnonymous(!isAnonymous);

    if (!isModified) {
      setWritePost({
        ...writePost,
        anonymous: !isAnonymous,
      });
    }
  }, [writePost]);

  const onClickPined = useCallback(() => {
    setIsPined(!isPined);

    if (!isModified) {
      setWritePost({
        ...writePost,
        pined: !isPined,
      });
    } else {
      setModifyPost({
        ...modifyPost,
        pined: !isPined,
      });
    }
  }, [writePost, modifyPost]);

  const onClickOldVersion = () => {
    setIsOldVersion(!isOldVersion);

    if (!isModified) {
      setWritePost({
        ...writePost,
        isSyncOldVersion: !isOldVersion,
      });
    }
  };

  return {
    isAnonymous,
    setIsAnonymous,
    isPined,
    setIsPined,
    onClickAnonymous,
    onClickPined,
    isOldVersion,
    onClickOldVersion,
  };
};
