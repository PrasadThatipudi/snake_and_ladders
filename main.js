import { createHandler } from "./src/app.js";

const main = (port) => {
  Deno.serve({ port }, createHandler());
};

main(8000);
