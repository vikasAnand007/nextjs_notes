import React from "react";
import { fun } from "./clientCode";

const ClientOnlyUsecase = () => {
  // fun is supossed to be used on client code only. It will give error on "/client-only" route
  // fun();
  return <div>Client Only Usecase</div>;
};

export default ClientOnlyUsecase;
