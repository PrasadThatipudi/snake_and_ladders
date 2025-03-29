import { createHandler } from "./src/app.js";

const main = (port) => {
  const games = new Map();

  Deno.serve({ port }, createHandler(games));
};

main(8000);
