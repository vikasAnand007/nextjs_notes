import React, { Suspense } from "react";
import Product1 from "./Product1";
import Product2 from "./Product2";

const ProductDetails = () => {
  return (
    <div>
      <h1>This is product details</h1>
      <Suspense fallback="loading 1 ....">
        <Product1 />
      </Suspense>
      <Suspense fallback="loading 2 ....">
        <Product2 />
      </Suspense>
    </div>
  );
};

export default ProductDetails;
