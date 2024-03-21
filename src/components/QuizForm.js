import React, { useState, useEffect } from 'react';
import styles from '../styles/Admin.module.css'; // Ensure this is the correct path

const QuizForm = ({ initialQuestion, onSubmit, onCancel }) => {
  const [question, setQuestion] = useState(initialQuestion ? initialQuestion.title : '');
  const [answers, setAnswers] = useState(initialQuestion ? initialQuestion.answers.map(a => a.text) : ['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(initialQuestion ? initialQuestion.answers.findIndex(a => a.correct) : 0);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (initialQuestion) {
      setQuestion(initialQuestion.title);
      setAnswers(initialQuestion.answers.map(a => a.text));
      const correctIndex = initialQuestion.answers.findIndex(a => a.correct);
      setCorrectAnswerIndex(correctIndex >= 0 ? correctIndex : 0);
    }
  }, [initialQuestion]);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || answers.some(answer => !answer.trim())) {
      setValidationError("Please fill in all fields.");
      return;
    }

    const formattedAnswers = answers.map((text, index) => ({
      id: index + 1,
      text,
      correct: index === correctAnswerIndex
    }));

    onSubmit({
      id: initialQuestion ? initialQuestion.id : Date.now(),
      title: question,
      answers: formattedAnswers
    });

    setQuestion('');
    setAnswers(['', '', '', '']);
    setCorrectAnswerIndex(0);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Question:</label>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          className={styles.inputField}
        />
      </div>

      {answers.map((answer, index) => (
        <div key={index} className={styles.inputGroup}>
          <label className={styles.label}>Answer {index + 1}:</label>
          <input
            type="text"
            value={answer}
            onChange={e => handleAnswerChange(index, e.target.value)}
            className={styles.inputField}
          />
          <input
            type="radio"
            name="correctAnswer"
            checked={correctAnswerIndex === index}
            onChange={() => setCorrectAnswerIndex(index)}
            className={styles.radioInput}
          />
          <span className={styles.radioLabel}>Correct</span>
        </div>
      ))}

      {validationError && <p className={styles.errorMessage}>{validationError}</p>}
      <button type="submit" className={styles.submitButton}>Submit</button>
      {onCancel && <button type="button" onClick={onCancel} className={styles.cancelButton}>Cancel</button>}
    </form>
  );
};

export default QuizForm;