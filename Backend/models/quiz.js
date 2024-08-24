const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: String,
  questions: [
    {
      text: String,
      type: { type: String, enum: ['single', 'multiple', 'boolean'] },
      answers: [String],
      correctAnswer: [Number]
    }
  ]
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
