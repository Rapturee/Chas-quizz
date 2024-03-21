import React from 'react';
import { QuestionsProvider } from '../context/QuestionsContext';
import '../styles/globals.css';
import Navbar from '../components/Navbar'; // Import the Navbar component

function MyApp({ Component, pageProps }) {
  return (
    <QuestionsProvider>
      <Navbar /> {/* Include Navbar here so it appears on every page */}
      <Component {...pageProps} />
    </QuestionsProvider>
  );
}

export default MyApp;