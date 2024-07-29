import React from "react";

const Product1 = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <div>This is product 1 detail</div>;
};

export default Product1;
