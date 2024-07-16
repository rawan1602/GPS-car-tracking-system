import React, { createContext, useContext, useState } from "react";

const CardContext = createContext();
export const useCard = () => useContext(CardContext);

export default function CardProvider({ children }) {
  const [content, setContent] = useState("");

  function updateContent(newContent) {
    setContent(newContent);
  }

  function toggleCard() {
    const card = document.getElementById("card");
    if (card.classList.contains("drop-active")) {
      card.classList.remove("drop-active");
      card.classList.add("drop-back");
    } else {
      card.classList.remove("drop-back");
      card.classList.add("drop-active");
    }
  }

  return <CardContext.Provider value={{ content, updateContent, toggleCard }}>{children}</CardContext.Provider>;
}
