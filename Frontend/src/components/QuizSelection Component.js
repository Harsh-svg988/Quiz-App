import React from 'react';

const QuizSelection = ({ quizzes, onSelect }) => {
  return (
    <div className="quiz-selection">
      <h1>Select a Quiz</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <button onClick={() => onSelect(quiz)}>
              {quiz.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizSelection;