import { createNewGame } from "../src/handlers.js";
import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";

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
    const response = await createNewGame(request);

    assertEquals(response.status, 200);
    assertEquals(await response.json(), gameInfo);
  });
});
