"use client";
import React from "react";
import { fun } from "./serverCode";

const ServerOnlyUsecase = () => {
  // fun is supossed to be used on server code only. It will give error on "/server-only" route
  fun();
  return <div>Server Only Usecase</div>;
};

export default ServerOnlyUsecase;
