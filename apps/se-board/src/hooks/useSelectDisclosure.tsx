import React, { useCallback, useState } from "react";

export function useSelectDisclosure() {
  const [subscript, setSubscript] = useState<string>("");
  const [active, setActive] = useState<string>("");

  const privacyOptions = [
    { id: "전체", value: "모든 사용자가 볼 수 있습니다." },
    { id: "금오인", value: "인증된 금오인만 볼 수 있습니다." },
    { id: "비밀", value: "비밀글입니다." },
  ];

  const onClickDisclosure = useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.TouchEvent<HTMLButtonElement>
    ) => {
      const { innerHTML } = e.currentTarget;

      if (innerHTML === "전체") {
        setSubscript("모든 사용자가 볼 수 있습니다.");
      } else if (innerHTML === "금오인") {
        setSubscript("인증된 금오인만 볼 수 있습니다.");
      } else if (innerHTML === "비밀") {
        setSubscript("비밀글입니다.");
      }

      setActive(innerHTML);
    },
    []
  );

  return { subscript, setSubscript, active, setActive, onClickDisclosure };
}
