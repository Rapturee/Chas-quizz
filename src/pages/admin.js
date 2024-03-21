import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import QuizForm from '../components/QuizForm';
import styles from '../styles/Admin.module.css';
import { saveQuestionsToLocalStorage, getQuestionsFromLocalStorage } from '../utils/localStorageUtils';
import { useQuestionsContext } from '../context/QuestionsContext';

const AdminPage = () => {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const { updateQuestions } = useQuestionsContext();

  useEffect(() => {
    const storedQuestions = getQuestionsFromLocalStorage();
    setQuestions(storedQuestions);
  }, []);

  const handleAddQuestion = (newQuestion) => {
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    saveQuestionsToLocalStorage(updatedQuestions);
    updateQuestions(updatedQuestions);
    setShowForm(false);
  };

  const handleRemoveQuestion = (id) => {
    const updatedQuestions = questions.filter(question => question.id !== id);
    setQuestions(updatedQuestions);
    saveQuestionsToLocalStorage(updatedQuestions);
    updateQuestions(updatedQuestions);
  };

  const handleEditQuestion = (editedQuestion) => {
    const updatedQuestions = questions.map(question =>
      question.id === editedQuestion.id ? editedQuestion : question
    );
    setQuestions(updatedQuestions);
    saveQuestionsToLocalStorage(updatedQuestions);
    updateQuestions(updatedQuestions);
    setCurrentQuestion(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    setCurrentQuestion(null);
    setShowForm(false);
  };

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.adminHeader}>ADMIN PAGE</h1>
      <div className={styles.buttonsContainer}>
        {!showForm && (
          <>
            <button className={styles.buttonBox} onClick={() => setShowForm(true)}>
              Add Question
            </button>
            <Link href="/quiz" passHref>
              <button className={`${styles.buttonBox} ${styles.startQuizButton}`}>
                Start Quiz
              </button>
            </Link>
          </>
        )}
      </div>

      {showForm && (
        <QuizForm
          initialQuestion={currentQuestion}
          onSubmit={currentQuestion ? handleEditQuestion : handleAddQuestion}
          onCancel={handleCancel}
        />
      )}

      {questions.map((question) => (
        <div key={question.id} className={styles.questionItem}>
          <p>{question.title}</p>
          <div className={styles.buttonsContainer}>
            <button className={styles.buttonBox} onClick={() => handleRemoveQuestion(question.id)}>
              Remove Question
            </button>
            <button className={styles.buttonBox} onClick={() => {
              setShowForm(true);
              setCurrentQuestion(question);
            }}>
              Edit Question
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;