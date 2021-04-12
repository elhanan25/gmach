import React from "react";

const Footer = () => {
  return (
    <p className="border-top pt-3 text-center" style={{
      position: "fixed",
      bottom: "0",
      // right: "0",
      width: "100%",
      // border: "3px solid #73AD21"
    }}>
      אהבת חסד © {new Date().getFullYear()}
    </p>
  );
};

export default Footer;
