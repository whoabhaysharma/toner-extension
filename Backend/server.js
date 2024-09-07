const express = require('express');
const cors = require('cors');
const { modifyTone } = require('./controllers/toneController');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/changetone', modifyTone);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
