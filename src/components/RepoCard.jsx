// src/components/RepoCard.jsx

import React from 'react';
import { FaStar, FaCodeBranch, FaGlobe, FaBug, FaRegClock } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi'; // बाहरी लिंक के लिए

function RepoCard({ name, description, language, stars, forks, htmlUrl, homepage, lastUpdated }) {
  // GitHub कोड पेज पर रीडायरेक्ट करने के लिए
  const handleViewCode = (e) => {
    e.stopPropagation(); // Parent div click event को रोकें
    window.open(htmlUrl, '_blank', 'noopener noreferrer');
  };

  // लाइव डेमो पेज पर रीडायरेक्ट करने के लिए
  const handleViewLiveDemo = (e) => {
    e.stopPropagation(); // Parent div click event को रोकें
    window.open(homepage, '_blank', 'noopener noreferrer');
  };

  // इश्यूज़ पेज पर रीडायरेक्ट करने के लिए
  const handleViewIssues = (e) => {
    e.stopPropagation(); // Parent div click event को रोकें
    const repoIssuesHtmlUrl = `${htmlUrl}/issues`; // GitHub रिपॉज़िटरी के इश्यूज़ पेज का URL
    window.open(repoIssuesHtmlUrl, '_blank', 'noopener noreferrer');
  };

  // आखिरी अपडेट के समय को दिखाने के लिए फ़ंक्शन
  const timeSinceLastUpdate = (updatedAt) => {
    if (!updatedAt) return "N/A";
    const now = new Date();
    const updatedDate = new Date(updatedAt);
    const diffTime = Math.abs(now - updatedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div className="
      bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between
      border-t-4 border-b-4 border-transparent hover:border-indigo-500
      transform hover:scale-105 transition-all duration-300 ease-in-out
      group relative overflow-hidden
    ">
      {/* Optional: Add a subtle background pattern or gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-50 z-0"></div>

      <div className="relative z-10"> {/* Content should be above the background */}
        {/* रिपॉज़िटरी का नाम */}
        <h3 className="text-2xl font-extrabold text-gray-900 mb-2 leading-snug truncate">
          {name}
        </h3>

        {/* डिस्क्रिप्शन */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {description || 'No description provided.'}
        </p>

        {/* मेटा डेटा: लैंग्वेज, स्टार्स, फोर्क्स, लास्ट अपडेट */}
        <div className="flex flex-wrap items-center text-gray-600 text-xs mb-4 gap-x-4 gap-y-2">
          {language && (
            <span className="flex items-center bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full font-medium">
              <FaCodeBranch className="mr-1.5 text-base text-blue-500" />
              {language}
            </span>
          )}
          <span className="flex items-center">
            <FaStar className="mr-1.5 text-base text-yellow-500" /> {stars}
          </span>
          <span className="flex items-center">
            <FaCodeBranch className="mr-1.5 text-base text-purple-500" /> {forks}
          </span>
          {lastUpdated && (
            <span className="flex items-center text-gray-500 text-xs">
              <FaRegClock className="mr-1.5 text-base" /> Updated {timeSinceLastUpdate(lastUpdated)}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row flex-wrap gap-3 justify-end">
        {homepage && (
          <button
            onClick={handleViewLiveDemo}
            className="
              inline-flex items-center justify-center w-full sm:w-auto px-4 py-2
              bg-green-600 text-white font-semibold rounded-lg shadow-md
              hover:bg-green-700 transition-colors duration-200
              text-sm group-hover:scale-105 group-hover:shadow-lg
            "
          >
            <FaGlobe className="mr-2" /> Live Demo
            <FiExternalLink className="ml-1" />
          </button>
        )}
        <button
          onClick={handleViewIssues}
          className="
            inline-flex items-center justify-center w-full sm:w-auto px-4 py-2
            bg-red-600 text-white font-semibold rounded-lg shadow-md
            hover:bg-red-700 transition-colors duration-200
            text-sm group-hover:scale-105 group-hover:shadow-lg
          "
        >
          <FaBug className="mr-2" /> Issues
          <FiExternalLink className="ml-1" />
        </button>
        <button
          onClick={handleViewCode}
          className="
            inline-flex items-center justify-center w-full sm:w-auto px-4 py-2
            bg-indigo-600 text-white font-semibold rounded-lg shadow-md
            hover:bg-indigo-700 transition-colors duration-200
            text-sm group-hover:scale-105 group-hover:shadow-lg
          "
        >
          <FaCodeBranch className="mr-2" /> View Code
          <FiExternalLink className="ml-1" />
        </button>
      </div>
    </div>
  );
}

export default RepoCard;