import React from "react";
import { ProductType } from "../dataType";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const response = await fetch("http://localhost:3001/products");
  const data: ProductType[] = await response.json();
  console.log("data", data);
  return <>{children}</>;
};

export default Layout;
