// highscore.js or similar
import React, { useEffect, useState } from 'react';
import styles from '../styles/HighScores.module.css'; // Adjust the path as needed
import { getHighScores } from '../utils/localStorageUtils';

const HighScorePage = () => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('highScores')) || [];
    setHighScores(storedScores);
  }, []);

  return (
    <div className={styles.highScoresContainer}>
      <h1 className={styles.highScoresHeader}>HIGH SCORES</h1>
      <ul>
        {highScores.map((score, index) => (
          <li key={index} className={styles.highScoreItem}>
            {score.userName}: {score.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HighScorePage;