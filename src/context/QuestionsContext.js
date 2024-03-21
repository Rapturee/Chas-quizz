// src/context/QuestionsContext.js
import React, { createContext, useState } from 'react';

const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  const updateQuestions = (newQuestions) => {
    setQuestions(newQuestions);
  };

  return (
    <QuestionsContext.Provider value={{ questions, setQuestions, updateQuestions }}>
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestionsContext = () => React.useContext(QuestionsContext);