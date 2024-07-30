import React from "react";
import { ProductType } from "../dataType";

const Page = async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const response = await fetch("http://localhost:3001/products");
  const data: ProductType[] = await response.json();
  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
