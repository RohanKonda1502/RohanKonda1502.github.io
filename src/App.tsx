import React, { useState } from 'react';
import ArrivingPage from './ArrivingPage';
import PortfolioPage from './PortfolioPage';

function App() {
  const [showPortfolio, setShowPortfolio] = useState(false);

  const handleIntroFinish = () => {
    setShowPortfolio(true);
  };

  const handleReplay = () => {
    setShowPortfolio(false);
  };

  return showPortfolio ? (
    <PortfolioPage onReplay={handleReplay} />
  ) : (
    <ArrivingPage onIntroFinish={handleIntroFinish} />
  );
}

export default App;