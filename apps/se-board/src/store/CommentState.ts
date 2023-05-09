import { atom, useRecoilState } from "recoil";

export const writeCommentState = atom({
  key: "writeCommentState",
  default: false,
});

export const useWriteCommentState = () => {
  const [value, setValue] = useRecoilState(writeCommentState);
  return {
    writeCommentTrue: () => setValue(true),
  };
};

export const refetchCommentState = atom({
  key: "refetchCommentState",
  default: false,
});
