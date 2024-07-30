export const fetchCache = "default-cache"

import React from "react";
import { ProductType } from "../dataType";

const Page = async () => {
  const r1 = await fetch("http://localhost:3001/products/1");
  const p1: ProductType = await r1.json();
  const response = await fetch("http://localhost:3001/products", {
    cache: "no-store",
  });
  const data: ProductType[] = await response.json();
  const r2 = await fetch("http://localhost:3001/products/2");
  const p2: ProductType = await r2.json();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        Product 1 details ---
        <br />
        {p1.title} - {p1.price}
      </div>
      <div>
        Fresh data on each refresh
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.title} - {item.price}
            </li>
          ))}
        </ul>
      </div>
      <div>
        Product 2 details ---
        <br />
        {p2.title} - {p2.price}
      </div>
    </div>
  );
};

export default Page;
