import React, { useState, useEffect } from 'react';
import QuizSelection from './components/QuizSelection Component';
import QuizQuestion from './components/QuizQuestion Component';
import QuizSummary from './components/QuizSummary Component';
import ProgressBar from './components/ProgressBar Component';
import ThemeToggle from './components/ThemeToggle Component';
import './App.css';

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(30); // Add a state for time remaining

  useEffect(() => {
    // Fetch quizzes from the backend
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/quizzes');
        const data = await response.json();
        setQuizzes(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizSelect = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleAnswerSubmit = (selectedAnswers) => {
    if (!currentQuiz || !currentQuiz.questions) return;

    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const isCorrect = JSON.stringify(selectedAnswers.sort()) === JSON.stringify(currentQuestion.correctAnswer.sort());
    
    if (isCorrect) {
      setScore(score + 1);
    }

    moveToNextQuestion();
  };

  const handleTimeUp = () => {
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeRemaining(30); // Reset time remaining to 30 seconds
    } else {
      setCurrentQuestionIndex(currentQuiz.questions.length); // This will trigger showing the summary
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`app ${isDarkTheme ? 'dark' : 'light'}`}>
      <ThemeToggle isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      {!currentQuiz ? (
        quizzes.length > 0 ? (
          <QuizSelection quizzes={quizzes} onSelect={handleQuizSelect} />
        ) : (
          <div>No quizzes available.</div>
        )
      ) : currentQuestionIndex < currentQuiz.questions.length ? (
        <>
          <ProgressBar 
            current={currentQuestionIndex + 1}
            total={currentQuiz.questions.length}
          />
          <QuizQuestion
            question={currentQuiz.questions[currentQuestionIndex]}
            onAnswer={handleAnswerSubmit}
            onTimeUp={handleTimeUp}
            timeLimit={timeRemaining} // Pass the time remaining to the QuizQuestion component
          />
        </>
      ) : (
        <QuizSummary score={score} total={currentQuiz.questions.length} onRestart={() => setCurrentQuiz(null)} />
      )}
    </div>
  );
}

export default App;