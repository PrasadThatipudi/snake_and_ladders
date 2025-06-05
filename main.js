import { createHandler } from "./src/app.js";

const echo = (arg)=> console.log(arg) || arg;

const main = (port) => {
  const games = new Map();

  Deno.serve({ port }, createHandler(games));
};

main(8000);
