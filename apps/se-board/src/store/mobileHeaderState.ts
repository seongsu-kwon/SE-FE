import { atom, useRecoilState } from "recoil";

export const mobileHeaderState = atom({
  key: "mobileHeaderState",
  default: true,
});

export const useMobileHeaderState = () => {
  const [value, setValue] = useRecoilState(mobileHeaderState);
  return {
    mobileHeaderOpen: () => setValue(false),
    mobileHeaderClose: () => setValue(true),
  };
};
