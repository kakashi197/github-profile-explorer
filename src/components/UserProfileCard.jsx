// src/components/UserProfileCard.jsx

import React from 'react';
import { FaUsers, FaCodeBranch, FaBook } from 'react-icons/fa'; // आइकॉन्स के लिए

// सुनिश्चित करें कि आपने 'react-icons' इंस्टॉल किया है: npm install react-icons

function UserProfileCard({ avatarUrl, name, login, bio, followers, following, publicRepos, htmlUrl }) {
  if (!avatarUrl || !login) {
    return null; // अगर الأساسी डेटा उपलब्ध नहीं है तो कुछ भी रेंडर न करें
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-2xl p-8 text-white relative overflow-hidden">
      {/* Background circles for modern look */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-400 opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-400 opacity-20 rounded-full mix-blend-multiply filter blur-xl animation-delay-2000 animate-blob"></div>

      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 relative z-10">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={avatarUrl}
            alt={name || login}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg transform transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* User Details */}
        <div className="text-center md:text-left flex-grow">
          {/* User's Name and Login */}
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            {name || login}
          </h2>
          {name && (
            <p className="text-xl md:text-2xl text-blue-200 mt-1">@{login}</p>
          )}

          {/* User's Bio */}
          {bio && (
            <p className="text-blue-100 text-lg mt-4 max-w-lg mx-auto md:mx-0">
              {bio}
            </p>
          )}

          {/* Stats: Followers, Following, Public Repos */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-lg mt-6">
            <span className="flex items-center space-x-2">
              <FaUsers className="text-blue-200" />
              <span className="font-semibold">{followers}</span> Followers
            </span>
            <span className="flex items-center space-x-2">
              <FaUsers className="text-blue-200" />
              <span className="font-semibold">{following}</span> Following
            </span>
            <span className="flex items-center space-x-2">
              <FaBook className="text-blue-200" />
              <span className="font-semibold">{publicRepos}</span> Repos
            </span>
          </div>

          {/* GitHub Profile Link */}
          <div className="mt-8">
            <a
              href={htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
            >
              <FaCodeBranch className="mr-2" /> View GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;