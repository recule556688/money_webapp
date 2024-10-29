const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 4000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(cors());
app.use(express.json());

// Get all data
app.get('/api/data/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      'SELECT * FROM user_data WHERE user_id = $1',
      [userId]
    );
    res.json(result.rows[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update data
app.post('/api/data/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { expenses, subscriptions, moneyInfo, incomes } = req.body;
    
    const result = await pool.query(
      `INSERT INTO user_data (user_id, expenses, subscriptions, money_info, incomes)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id)
       DO UPDATE SET
         expenses = $2,
         subscriptions = $3,
         money_info = $4,
         incomes = $5
       RETURNING *`,
      [userId, expenses, subscriptions, moneyInfo, incomes]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 