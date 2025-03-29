import { handler } from "./src/app.js";

const main = (port) => {
  Deno.serve({ port }, handler);
};

main(8000);
