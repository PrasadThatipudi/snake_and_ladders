import { handleFile, logRequest, handleRequest } from "./handlers.js";

const createServeStaticFile = (root) => (request) => {
  return handleFile(`./${root}${request._url.pathname}`);
};

const serveHomePage = () => handleFile("./public/index.html");

const createHandler = () => {
  const routes = {
    GET: { "/": serveHomePage },
  };

  return (request) => {
    logRequest(request);
    const url = new URL(request.url);

    request.serveStaticFile = createServeStaticFile("public");
    request.routes = routes;
    request._url = url;

    return handleRequest(request);
  };
};
export { createHandler };
