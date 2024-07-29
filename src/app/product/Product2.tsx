import React from "react";

const Product2 = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return <div>This is product 2 detail</div>;
};

export default Product2;
