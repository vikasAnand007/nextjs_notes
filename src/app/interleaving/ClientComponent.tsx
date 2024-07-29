"use client";
import React from "react";

// BAD USECASE (Should be avoided)

// import ServerComponent from "./ServerComponent";
// const ClientComponent = () => {
//   console.log("Client code");
//   return (
//     <div style={{ border: "1px solid black", padding: "10px" }}>
//       ClientComponent
//       <ServerComponent />
//     </div>
//   );
// };



// GOOD USECASE (Recommended)

const ClientComponent = ({ children }: { children: React.ReactNode }) => {
  console.log("Client code");
  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>
      ClientComponent
      {children}
    </div>
  );
};

export default ClientComponent;
