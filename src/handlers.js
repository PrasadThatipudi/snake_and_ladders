import * as path from "@bearz/path";
import mime from "mime";
import { SnakeAndLadder } from "./snake_and_ladder.js";
import { Player } from "./player.js";

const handleNotFound = () => {
  const options = { headers: { "content-type": "text/html" }, status: 404 };
  const responseBody = "<h1>Not Found!</h1>";

  return new Response(responseBody, options);
};

const readFile = async (filePath) => await Deno.readFile(filePath);

const contentHeaders = (extension) => {
  const headers = { "content-type": mime.getType(extension) };

  if (extension === ".pdf") headers["content-disposition"] = "attachment";

  return headers;
};

const handleFile = async (filePath) => {
  try {
    const fileContent = await readFile(filePath);
    const extension = path.parse(filePath).ext;
    const headers = contentHeaders(extension);

    return new Response(fileContent, { headers });
  } catch (_error) {
    return handleNotFound();
  }
};

const insertLogRecord = async (logRecord) =>
  await Deno.writeTextFile("./logRequest.txt", logRecord, { append: true });

const logRequest = (request) => {
  const date = new Date();
  const timeString = date.toTimeString().split(" ").at(0);
  const dateString = date.toDateString();
  const userAgent = request.headers.get("user-agent");

  const logRecord = [
    dateString,
    timeString,
    request.method,
    request.url,
    userAgent,
  ]
    .join(" ")
    .concat("\n");

  insertLogRecord(logRecord);
  console.log(logRecord);
};

const isRequestPresentInRoutes = (method, routes, request) =>
  method in routes && request._url.pathname in routes[method];

const handleRequest = (request) => {
  const { method, routes, _url: url } = request;

  if (isRequestPresentInRoutes(method, routes, request)) {
    const methodHandler = routes[method][url.pathname];

    return methodHandler(request);
  }

  return request.serveStaticFile(request);
};

const parsePlayers = (formData) => {
  const players = [];

  formData.forEach((playerId) => players.push(new Player(playerId)));

  return players;
};

const createNewGame = async (request) => {
  const gameInfo = { gameId: 0 };
  const formData = await request.formData();
  const players = parsePlayers(formData);
  const snakesAndLadders = SnakeAndLadder.generateSnakesAndLadders();

  const game = new SnakeAndLadder(players, snakesAndLadders);

  request.context.games.set(1, game);

  return new Response(JSON.stringify(gameInfo), { status: 200 });
};

export { handleFile, handleRequest, logRequest, createNewGame };
