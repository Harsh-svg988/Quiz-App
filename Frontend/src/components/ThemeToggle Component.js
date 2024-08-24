import React from 'react';

const ThemeToggle = ({ isDarkTheme, toggleTheme }) => {
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggle;