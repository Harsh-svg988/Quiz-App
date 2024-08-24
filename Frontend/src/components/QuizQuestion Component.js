import React, { useState, useEffect } from 'react';
import Timer from './Timer';

const QuizQuestion = ({ question, onAnswer, onTimeUp, timeLimit }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    setSelectedAnswers([]);
  }, [question]);

  const handleAnswerChange = (index) => {
    if (question.type === 'single' || question.type === 'boolean') {
      setSelectedAnswers([index]);
    } else if (question.type === 'multiple') {
      setSelectedAnswers(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAnswers.length > 0) {
      onAnswer(selectedAnswers);
    }
  };

  const handleTimeUp = () => {
    onTimeUp();
  };

  return (
    <div className="quiz-question">
      <Timer duration={timeLimit} onTimeUp={handleTimeUp} />
      <h2>{question.text}</h2>
      <form onSubmit={handleSubmit}>
        {question.answers.map((answer, index) => (
          <div className = "container" key={index}>
            <input
              type={question.type === 'multiple' ? 'checkbox' : 'radio'}
              id={`answer-${index}`}
              name="answer"
              value={index}
              checked={selectedAnswers.includes(index)}
              onChange={() => handleAnswerChange(index)}
            />
            <label className = "label"htmlFor={`answer-${index}`}>{answer}</label>
          </div>
        ))}
        <button type="submit" disabled={selectedAnswers.length === 0}>
          Submit Answer
        </button>
      </form>
    </div>
  );
};

export default QuizQuestion;