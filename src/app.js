import {
  handleFile,
  logRequest,
  handleRequest,
  createNewGame,
} from "./handlers.js";

const createServeStaticFile = (root) => (request) => {
  return handleFile(`./${root}${request._url.pathname}`);
};

const serveHomePage = () => handleFile("./public/index.html");

const createHandler = (games) => {
  const routes = {
    GET: { "/": serveHomePage },
    POST: { "/create_game": createNewGame },
  };

  return (request) => {
    logRequest(request);
    const url = new URL(request.url);

    request.serveStaticFile = createServeStaticFile("public");
    request.routes = routes;
    request._url = url;
    request.context = { games };

    return handleRequest(request);
  };
};
export { createHandler };
