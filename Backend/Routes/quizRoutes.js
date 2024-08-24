// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');

// POST route to add a new quiz
router.post('/quizzes', async (req, res) => {
  const quiz = new Quiz(req.body); // req.body should contain the quiz object

  try {
    const savedQuiz = await quiz.save();
    res.json(savedQuiz);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save quiz', error });
  }
});
// Get
router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quizzes', error });
  }
});

module.exports = router;
