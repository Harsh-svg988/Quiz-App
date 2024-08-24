import React from 'react';

const QuizSummary = ({ score, total, onRestart }) => {
  return (
    <div className="quiz-summary">
      <h2>Quiz Completed!</h2>
      <p>Your score: {score} out of {total}</p>
      <button onClick={onRestart}>Back to Quiz Selection</button>
    </div>
  );
};

export default QuizSummary;