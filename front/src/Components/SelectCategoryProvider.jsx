import React, { createContext, useContext, useState } from "react";

const CategoryContext = createContext();
export const useCategory = () => useContext(CategoryContext);

export default function SelectCategoryProvider({ children }) {
  const [selected, setContent] = useState("");

  function updateSelected(newContent) {
    setContent(newContent);
  }

  return <CategoryContext.Provider value={{ selected, updateSelected }}>{children}</CategoryContext.Provider>;
}
