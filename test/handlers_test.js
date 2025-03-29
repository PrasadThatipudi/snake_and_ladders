import { createNewGame, handleUpdateBoard } from "../src/handlers.js";
import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { SnakeAndLadder } from "../src/snake_and_ladder.js";

describe("POST /create_game", () => {
  it("should create a game on server", async () => {
    const players = new FormData();
    const gameInfo = { gameId: 0 };

    players.set(0, 0);
    players.set(1, 1);

    const request = new Request("http://localhost/create_game", {
      method: "POST",
      body: players,
    });

    request.context = { games: new Map() };
    const response = await createNewGame(request);

    assertEquals(response.status, 200);
    assertEquals(await response.json(), gameInfo);
  });
});

describe("POST /update_board", () => {
  it("should update the board based on dice value", async () => {
    const formData = new FormData();

    formData.set("playerId", 0);
    formData.set("dice", 1);

    const request = new Request("http:localhost/update_board?gameId=0", {
      method: "POST",
      body: formData,
    });

    const game = new SnakeAndLadder(
      [0, 1],
      SnakeAndLadder.generateSnakesAndLadders()
    );

    request._url = new URL(request.url);
    request.context = { games: new Map().set(0, game) };

    const currentState = { score: [2, 1], tileOutcome: "none" };

    const response = await handleUpdateBoard(request);

    assertEquals(response.status, 200);
    assertEquals(await response.json(), currentState);
  });

  it("tileOutcome should be 'snake' when player caught by snake", async () => {
    const formData = new FormData();

    formData.set("playerId", 0);
    formData.set("dice", 27);

    const request = new Request("http:localhost/update_board?gameId=0", {
      method: "POST",
      body: formData,
    });

    const game = new SnakeAndLadder(
      [0, 1],
      SnakeAndLadder.generateSnakesAndLadders()
    );

    request._url = new URL(request.url);
    request.context = { games: new Map().set(0, game) };

    const currentState = { score: [10, 1], tileOutcome: "snake" };

    const response = await handleUpdateBoard(request);

    assertEquals(response.status, 200);
    assertEquals(await response.json(), currentState);
  });

  it("tileOutcome should be 'ladder' when player catches ladder", async () => {
    const formData = new FormData();

    formData.set("playerId", 0);
    formData.set("dice", 3);

    const request = new Request("http:localhost/update_board?gameId=0", {
      method: "POST",
      body: formData,
    });

    const game = new SnakeAndLadder(
      [0, 1],
      SnakeAndLadder.generateSnakesAndLadders()
    );

    request._url = new URL(request.url);
    request.context = { games: new Map().set(0, game) };

    const currentState = { score: [56, 1], tileOutcome: "ladder" };

    const response = await handleUpdateBoard(request);

    assertEquals(response.status, 200);
    assertEquals(await response.json(), currentState);
  });
});
