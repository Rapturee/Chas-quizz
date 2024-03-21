export const saveQuestionsToLocalStorage = (questions) => {
  localStorage.setItem('questions', JSON.stringify(questions));
};

export const getQuestionsFromLocalStorage = () => {
  const storedQuestions = localStorage.getItem('questions');
  return storedQuestions ? JSON.parse(storedQuestions) : [];
};

export const saveUserScore = (userName, score) => {
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highScores.push({ userName, score });
  localStorage.setItem('highScores', JSON.stringify(highScores));
};

export const getHighScores = () => {
  const storedHighScores = localStorage.getItem('highScores');
  return storedHighScores ? JSON.parse(storedHighScores) : [];
};