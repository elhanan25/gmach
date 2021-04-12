import React from "react";

const Footer = () => {
  return (
    <p
      className="border-top pt-3 text-center"
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
      }}
    >
      אהבת חסד © {new Date().getFullYear()}
    </p>
  );
};

export default Footer;
