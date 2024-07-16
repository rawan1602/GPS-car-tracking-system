import React from "react";

import { useCard } from "./CardProvider";
import "../Styles/Card.css";

export default function Card({ ...props }) {
  const { content } = useCard();

  return (
    <div {...props} id="card" className="border border-dark rounded">
      {content}
    </div>
  );
}
