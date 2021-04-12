import React from "react";

const PageHeader = ({ titleText }) => {
  return (
     
        <h3 className=" container alert alert-info mt-3 text-right">
            {titleText}
        </h3>    
  );
};

export default PageHeader;
