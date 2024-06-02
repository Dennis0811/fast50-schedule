import React from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollUpButton = ({className}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button>
      <FaArrowCircleUp
        onClick={scrollToTop}
        className={className}
      />
    </button>
  );
};

export default ScrollUpButton;
