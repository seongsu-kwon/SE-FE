import { atom, useRecoilState } from "recoil";

export const mobileHeaderState = atom({
  key: "mobileHeaderState",
  default: false,
});

export const useMobileHeaderState = () => {
  const [value, setValue] = useRecoilState(mobileHeaderState);
  return {
    mobileHeaderOpen: () => setValue(true),
    mobileHeaderClose: () => setValue(false),
  };
};
