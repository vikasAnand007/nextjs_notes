import React from "react";
import { ProductType } from "../dataType";

const Page = async () => {
  const response = await fetch("http://localhost:3001/products");
  const data: ProductType[] = await response.json();
  return (
    <div>
      Cached data on refresh
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.title} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
