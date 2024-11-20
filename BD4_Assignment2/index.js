let express = require("express");
let cors = require("cors");
let sqlite3 = require("sqlite3").verbose();
let { open } = require("sqlite");

let app = express();
let PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: "./BD4_Assignment2/database.sqlite",
    driver: sqlite3.Database,
  });
})();


const fetchAllGames = async () => {
  let query = 'SELECT * FROM games';
  let response = await db.all(query, []);

  return { games: response };
};

app.get('/games', async (req, res) => {
  let results = await fetchAllGames();
  res.status(200).json(results);
});


async function fetchAllGamesById(id){
  let query = 'SELECT * FROM games WHERE id = ?';
  let response = await db.all(query, [id]);

  return { games: response };
};

app.get('/games/details/:id', async (req, res) => {
  let id = req.params.id;
  let results = await fetchAllGamesById(id);
  res.status(200).json(results);
});


async function fetchGamesByGenre(genre){
  let query = 'SELECT * FROM games WHERE genre = ?';
  let response = await db.all(query, [genre]);

  return { games: response };
};

app.get('/games/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let results = await fetchGamesByGenre(genre);
  res.status(200).json(results);
});


async function fetchGamesByPlatform(platform){
  let query = 'SELECT * FROM games WHERE platform = ?';
  let response = await db.all(query, [platform]);

  return { games: response };
};

app.get('/games/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  let results = await fetchGamesByPlatform(platform);
  res.status(200).json(results);
});


async function fetchGamesByRating() {
  let query = 'SELECT * FROM games WHERE rating <= 4.5 ';
  let response = await db.all(query, []);

  return { games: response };
};

app.get('/games/sort-by-rating', async (req, res) => {
  
  let results = await fetchGamesByRating();
  res.status(200).json(results);
});


const fetchAllPlayers = async () => {
  let query = 'SELECT * FROM players';
  let response = await db.all(query, []);

  return { players: response };
};

app.get('/players', async (req, res) => {
  let results = await fetchAllPlayers();
  res.status(200).json(results);
});


async function fetchAllPlayersById(id){
  let query = 'SELECT * FROM players WHERE id = ?';
  let response = await db.all(query, [id]);

  return { players: response };
};

app.get('/players/details/:id', async (req, res) => {
  let id = req.params.id;
  let results = await fetchAllPlayersById(id);
  res.status(200).json(results);
});


async function fetchAllPlayersByPlatform(platform){
  let query = 'SELECT * FROM players WHERE platform = ?';
  let response = await db.all(query, [platform]);

  return { players: response };
};

app.get('/players/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  let results = await fetchAllPlayersByPlatform(platform);
  res.status(200).json(results);
});


async function fetchPlayersByRating() {
  let query = 'SELECT * FROM players WHERE rating <= 4.5 ';
  let response = await db.all(query, []);

  return { players: response };
};

app.get('/players/sort-by-rating', async (req, res) => {
  
  let results = await fetchPlayersByRating();
  res.status(200).json(results);
});


const fetchAllTournaments = async () => {
  let query = 'SELECT * FROM tournaments';
  let response = await db.all(query, []);

  return { tournaments: response };
};

app.get('/tournaments', async (req, res) => {
  let results = await fetchAllTournaments();
  res.status(200).json(results);
});


async function fetchAllTournamentsById(id){
  let query = 'SELECT * FROM tournaments WHERE id = ?';
  let response = await db.all(query, [id]);

  return { tournaments: response };
};

app.get('/tournaments/details/:id', async (req, res) => {
  let id = req.params.id;
  let results = await fetchAllTournamentsById(id);
  res.status(200).json(results);
});


async function fetchTournamentsByGameId(id){
  let query = 'SELECT * FROM tournaments WHERE id = ?';
  let response = await db.all(query, [id]);

  return { tournaments: response };
};

app.get('/tournaments/game/:id', async (req, res) => {
  let id = req.params.id;
  let results = await fetchTournamentsByGameId(id);
  res.status(200).json(results);
});


async function fetchTournamentsSortedByPricePool(){
  let query = 'SELECT * FROM tournaments WHERE prizepool <= 5000';
  let response = await db.all(query, []);

  return { tournaments: response };
};

app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  
  let results = await fetchTournamentsSortedByPricePool();
  res.status(200).json(results);
});

app.listen(PORT, () => console.log("Server running on port 3000"));
