import React, { useState, useEffect } from 'react';
import { useQuestionsContext } from '../context/QuestionsContext';
import styles from '../styles/Quiz.module.css';
import { saveUserScore, getQuestionsFromLocalStorage } from '../utils/localStorageUtils';

const QuizPage = () => {
  const { setCurrentQuestionIndex } = useQuestionsContext();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [userName, setUserName] = useState('');
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const loadedQuestions = getQuestionsFromLocalStorage();
    if (loadedQuestions && loadedQuestions.length > 0) {
      setQuestions(loadedQuestions);
    }
  }, []);

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
    setIsAnswerChecked(false);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.answers.find(ans => ans.id === selectedAnswer).correct) {
      setIsAnswerCorrect(true);
      setScore(score + 10);
      if (currentQuestionIndex === questions.length - 1) {
        setHasWon(true); 
      }
    } else {
      setIsAnswerCorrect(false);
      setGameOver(true);
    }
    setIsAnswerChecked(true);
  };

  const goToNextQuestion = () => {
    if (hasWon) {
      endGame();
      return;
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setIsAnswerChecked(false);
      setIsAnswerCorrect(false);
      setSelectedAnswer(null);
    } else {
      setHasWon(true);
      endGame();
    }
  };

  const endGame = () => {
    saveUserScore(userName, score);
    setGameOver(true);
  };

  const startQuiz = () => {
    if (userName) {
      setQuizStarted(true);
    }
  };

  if (!quizStarted) {
    return (
      <div className={styles.quizContainer}>
        <h2 className={styles.enterUsernameText}>Enter your Username to begin the Quiz!</h2> {/* Instruction text */}
        <div className={styles.startQuizContainer}>
          <input 
            type="text" 
            placeholder="Enter your name" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)}
            className={styles.nameInput} 
          />
          <button 
            onClick={startQuiz}
            className={styles.startQuizButton}
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (gameOver || hasWon) {
    return (
      <div className={styles.quizContainer}>
        <div className={hasWon ? styles.winContainer : styles.gameOverContainer}>
          <p className={hasWon ? styles.winText : styles.gameOverText}>
            {hasWon ? "Congratulations! You are a Winner!" : "Game Over"}
          </p>
          <p>Your Score: {score}</p>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      </div>
    );
  }

  if (!questions[currentQuestionIndex]) {
    return (
      <div className={styles.quizContainer}>
        <div>Loading questions...</div>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.questionBox}>
        <h2>{questions[currentQuestionIndex].title}</h2>
      </div>
      <div className={styles.quizContentContainer}>
        <div className={styles.answersContainer}>
          {questions[currentQuestionIndex].answers.map((answer, index) => (
            <button
              key={answer.id}
              className={`${styles.answerButton} ${selectedAnswer === answer.id ? styles.selected : ''}`}
              onClick={() => handleAnswerSelect(answer.id)}
            >
              {String.fromCharCode(65 + index)}. {answer.text}
            </button>
          ))}
        </div>
        {!isAnswerChecked && (
          <button className={styles.checkAnswerButton} onClick={checkAnswer}>
            Check Answer
          </button>
        )}
        {isAnswerChecked && !hasWon && (
          <div>
            {isAnswerCorrect ? (
              <div>
                <p>Correct! +10 points</p>
                <button className={styles.nextQuestionButton} onClick={goToNextQuestion}>
                  Next Question
                </button>
              </div>
            ) : (
              <p>Incorrect! Game Over</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;