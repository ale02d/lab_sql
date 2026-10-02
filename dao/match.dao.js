const db = require('../services/mysql.service');

const insertMatch = async ({ season, homeTeamId, awayTeamId, goalsHome, goalsAway }) => {
  const [res] = await db.query(
    'INSERT INTO `match` (season, home_team_id, away_team_id, goals_home, goals_away) VALUES (?, ?, ?, ?, ?)',
    [season, homeTeamId, awayTeamId, goalsHome, goalsAway]
  );
  return res.insertId;
};

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM `match`');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM `match` WHERE id = ?', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { insertMatch, getAll, getById };