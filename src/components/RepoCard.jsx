// src/components/RepoCard.jsx

import React from 'react';
import { FaStar, FaCodeBranch, FaGlobe } from 'react-icons/fa'; // आइकॉन्स के लिए

// सुनिश्चित करें कि आपने 'react-icons' इंस्टॉल किया है: npm install react-icons

function RepoCard({ name, description, language, stars, forks, htmlUrl, topics, homepage }) {
  // handleClick फंक्शन जो कार्ड क्लिक करने पर GitHub पेज पर रीडायरेक्ट करेगा
  const handleClick = () => {
    window.open(htmlUrl, '_blank', 'noopener noreferrer');
  };

  return (
    // कार्ड का मुख्य कंटेनर। क्लिकेबल बनाने के लिए cursor-pointer और ट्रांजीशन इफेक्ट्स।
    <div
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={handleClick} // कार्ड क्लिक करने पर handleClick फंक्शन कॉल होगा
    >
      {/* रिपॉज़िटरी का नाम */}
      <h3 className="text-2xl font-bold text-gray-800 mb-2 truncate">
        {name}
      </h3>

      {/* डिस्क्रिप्शन */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {description || 'No description provided.'}
      </p>

      {/* लैंग्वेज, स्टार्स और फोर्क्स */}
      <div className="flex items-center text-gray-500 text-xs mb-4 space-x-4">
        {language && (
          <span className="flex items-center bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
            <FaCodeBranch className="mr-1 text-blue-500" />
            {language}
          </span>
        )}
        <span className="flex items-center">
          <FaStar className="mr-1 text-yellow-500" /> {stars}
        </span>
        <span className="flex items-center">
          <FaCodeBranch className="mr-1 text-purple-500" /> {forks}
        </span>
      </div>

      {/* टॉपिक्स (अगर हैं तो) */}
      {topics && topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {topics.slice(0, 4).map((topic, index) => ( // सिर्फ पहले 4 टॉपिक्स दिखाएं
            <span key={index} className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-md">
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* वेबसाइट/डेमो लिंक (अगर homepage prop मौजूद है) */}
      {homepage && (
        <a
          href={homepage}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} // यह महत्वपूर्ण है ताकि लिंक क्लिक करने पर कार्ड का handleClick न चले
          className="inline-flex items-center text-indigo-600 hover:underline text-sm mt-2"
        >
          <FaGlobe className="mr-1" /> Visit Website
        </a>
      )}
    </div>
  );
}

export default RepoCard;