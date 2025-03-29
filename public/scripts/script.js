const readPlayers = (noOfPlayers) => {
  const players = new FormData();

  Array.from({ length: noOfPlayers }, (_, id) => players.set(id, id));

  return players;
};

const requestForNewGame = async (players) => {
  const response = await fetch("/create_game", {
    method: "POST",
    body: players,
  });

  console.log(response);
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
