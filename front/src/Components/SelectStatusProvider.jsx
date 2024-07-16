import React, { createContext, useContext, useState } from "react";

const StatusContext = createContext();
export const useStatus = () => useContext(StatusContext);

export default function SelectStatusProvider({ children }) {
  const [selected, setContent] = useState("");

  function updateSelected(newContent) {
    setContent(newContent);
  }

  return <StatusContext.Provider value={{ selected, updateSelected }}>{children}</StatusContext.Provider>;
}
