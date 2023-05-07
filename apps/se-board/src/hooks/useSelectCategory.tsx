import React, { useCallback, useState } from "react";

export function useSelectCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const selectOption = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;

      setSelectedCategory(value);
    },
    []
  );

  return { selectedCategory, setSelectedCategory, selectOption };
}
