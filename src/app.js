import {
  handleFile,
  logRequest,
  handleRequest,
  createNewGame,
  serveBoard,
  handleUpdateBoard,
} from "./handlers.js";

const createServeStaticFile = (root) => (request) => {
  return handleFile(`./${root}${request._url.pathname}`);
};

const serveHomePage = () => handleFile("./public/index.html");

const createHandler = (games) => {
  const routes = {
    GET: { "/": serveHomePage, "/fetch_board": serveBoard },
    POST: { "/create_game": createNewGame, "/update_board": handleUpdateBoard },
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
