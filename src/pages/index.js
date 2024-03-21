import React, { useState } from 'react';
import styles from '../styles/Home.module.css'; // Make sure the path to your CSS module is correct

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleGetStarted = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    window.location.href = '/admin'; // Redirect to the admin page
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to the Amazon Quiz!</h1>
      <p className={styles.description}>This Quiz is made for localStorage usage, so you can create your own quiz! Please click on the "Get Started" button to continue.</p>
      <button onClick={handleGetStarted} className={styles.getStartedButton}>
        Get Started
      </button>

      {showPopup && (
        <div className={styles.popup}>
          To start the quiz, provide some questions and answer in the admin page! Good luck!
          <button onClick={handleClosePopup} className={styles.okayButton}>Okay</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;