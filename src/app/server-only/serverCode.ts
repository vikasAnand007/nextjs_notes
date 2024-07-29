"use server";

// this will restrict using this file's code on client component
import "server-only";

export const fun = () => {
  console.log("Server code used ....");
};
