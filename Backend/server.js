// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quizRoutes = require('./Routes/quizRoutes');

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://harshprabhakar305:cTRN02FlZU7eVeyM@cluster0.tjk0pix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Routes
app.use('/api', quizRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
