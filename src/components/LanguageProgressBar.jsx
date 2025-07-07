// src/components/LanguageProgressBar.jsx

import React from 'react';

// भाषाओं के लिए एक कलर मैप (अपनी पसंद के अनुसार बदल सकते हैं)
const languageColors = {
  JavaScript: '#f7df1e',
  TypeScript: '#007acc',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  Go: '#00ADD8',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Rust: '#dea584',
  Vue: '#42b883',
  React: '#61DAFB', // Custom for React projects
  Svelte: '#ff3e00',
  Default: '#cccccc', // Unknown or less common languages
};

function LanguageProgressBar({ languages }) {
  // अगर कोई भाषा डेटा नहीं है तो कुछ भी रेंडर न करें
  if (!languages || languages.length === 0) {
    return null;
  }

  // कुल प्रतिशत 100% होना चाहिए
  const totalPercentage = languages.reduce((sum, lang) => sum + lang.percentage, 0);
  
  return (
    <div className="w-full">
      {languages.map((lang, index) => (
        <div key={lang.name} className="mb-3">
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="font-semibold text-white">{lang.name}</span>
            <span className="text-purple-200">{lang.percentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-purple-300 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-2.5 rounded-full"
              style={{
                width: `${lang.percentage}%`,
                backgroundColor: languageColors[lang.name] || languageColors.Default,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LanguageProgressBar;