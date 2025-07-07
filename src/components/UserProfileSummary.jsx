// src/components/LanguageProgressBar.jsx

import React from 'react';

// कुछ सामान्य भाषाओं के लिए रंग। आप इसे अपनी पसंद के अनुसार बढ़ा सकते हैं।
const languageColors = {
  JavaScript: '#F7DF1E',
  Python: '#3572A5',
  Java: '#B07219',
  'C++': '#F34B7D',
  C: '#555555',
  HTML: '#E34C26',
  CSS: '#563D7C',
  TypeScript: '#2B7489',
  Shell: '#88E051',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Go: '#00ADD8',
  Swift: '#FEA500',
  Kotlin: '#F18E33',
  Rust: '#DEA584',
  Csharp: '#178600',
  Vue: '#41B883',
  React: '#61DAFB',
  Default: '#cccccc', // यदि कोई रंग परिभाषित नहीं है
};

function LanguageProgressBar({ languages }) {
  if (!languages || languages.length === 0) {
    return null;
  }

  // सुनिश्चित करें कि कुल 100% हो
  const totalPercentage = languages.reduce((sum, lang) => sum + lang.percentage, 0);

  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden shadow-inner">
      <div className="flex h-full">
        {languages.map((lang, index) => (
          <div
            key={lang.name}
            style={{
              width: `${(lang.percentage / totalPercentage) * 100}%`,
              backgroundColor: languageColors[lang.name] || languageColors.Default,
            }}
            className={`h-full ${index === 0 ? 'rounded-l-full' : ''} ${index === languages.length - 1 ? 'rounded-r-full' : ''}`}
            title={`${lang.name}: ${lang.percentage.toFixed(1)}%`}
          ></div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 mt-3 text-xs sm:text-sm text-gray-100">
        {languages.map((lang) => (
          <span key={lang.name} className="flex items-center space-x-1">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: languageColors[lang.name] || languageColors.Default }}
            ></span>
            <span>{lang.name} {lang.percentage.toFixed(1)}%</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default LanguageProgressBar;