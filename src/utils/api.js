// api.js
import questionsData from '../data/questions.json';

export const getQuestions = () => {
  return questionsData;
};

export const addQuestion = (question) => {
  const newQuestion = { id: questionsData.length + 1, ...question };
  questionsData.push(newQuestion);
};

export const deleteQuestion = (id) => {
  const index = questionsData.findIndex(q => q.id === id);
  if (index !== -1) {
    questionsData.splice(index, 1);
  }
};

export const updateQuestion = (id, updatedQuestion) => {
  const index = questionsData.findIndex(q => q.id === id);
  if (index !== -1) {
    questionsData[index] = { ...questionsData[index], ...updatedQuestion };
  }
};

// Implement delete and update functions similarly