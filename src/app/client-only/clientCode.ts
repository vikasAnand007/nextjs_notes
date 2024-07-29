// this will restrict using this file's code on server component
import "client-only";

export const fun = () => {
  localStorage.setItem("data", "some data ...");
  console.log("Client code used ....");
};
