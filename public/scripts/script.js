const readPlayers = (noOfPlayers) => {
  const players = new FormData();

  Array.from({ length: noOfPlayers }, (_, id) => players.set(id, id));

  return players;
};

const requestForNewGame = async (players) => {
  await fetch("http:localhost:8000/create_game", {
    method: "POST",
    body: players,
  });
};

const createGame = () => {
  const noOfPlayers = 2;
  const players = readPlayers(noOfPlayers);

  requestForNewGame(players);
};

const handleGame = () => {
  createGame();
  // startGame();
};

document.addEventListener("DOMContentLoaded", handleGame);
