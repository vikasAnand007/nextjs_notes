import React from "react";
import ClientComponent from "./ClientComponent";
import ServerComponent from "./ServerComponent";

const Interleaving = () => {
  return (
    <div>
      <h1>Interleaving</h1>
      {/* BAD USECASE (Should be avoided) */}
      {/* <ClientComponent /> */}

      {/* GOOD USECASE (Recommended) */}
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
};

export default Interleaving;
