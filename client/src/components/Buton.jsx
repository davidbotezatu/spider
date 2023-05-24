import React from "react";

import { useStateContext } from "../contexts/ContextProvider";

const Buton = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
}) => {
  const { setClicked, stareInitiala } = useStateContext();

  return (
    <button
      type="button"
      onClick={() => setClicked(stareInitiala)}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Buton;
