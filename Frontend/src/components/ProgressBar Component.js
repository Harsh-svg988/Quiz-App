import React from 'react';

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
      <span>{current} / {total}</span>
    </div>
  );
};

export default ProgressBar;