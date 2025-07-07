// src/components/UserProfileCard.jsx

import React from 'react';
import { FaUsers, FaCodeBranch, FaBook, FaLink, FaMapMarkerAlt, FaBuilding, FaTwitter } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import LanguageProgressBar from './LanguageProgressBar'; // नया कंपोनेंट

function UserProfileCard({ avatarUrl, name, login, bio, followers, following, publicRepos, htmlUrl, company, location, blog, twitterUsername, topLanguages }) {
  if (!avatarUrl || !login) {
    return null;
  }

  return (
    <div className="
      bg-gradient-to-br from-purple-600 to-indigo-800 rounded-2xl shadow-3xl
      p-6 sm:p-8 text-white relative overflow-hidden
      transform hover:scale-[1.01] transition-transform duration-500 ease-in-out
    ">
      {/* Abstract Background Elements for modern look */}
      <div className="absolute -top-1/4 -right-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-purple-500 opacity-10 rounded-full mix-blend-lighten filter blur-3xl animate-blob"></div>
      <div className="absolute -bottom-1/4 -left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-500 opacity-10 rounded-full mix-blend-lighten filter blur-3xl animation-delay-2000 animate-blob"></div>

      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 relative z-10">
        {/* Profile Image and Name/Login */}
        <div className="flex-shrink-0 text-center md:text-left">
          <img
            src={avatarUrl}
            alt={name || login}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover border-4 sm:border-6 border-white shadow-xl transform transition-transform duration-300 hover:scale-105 ring-4 ring-purple-300"
          />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mt-4 sm:mt-6">
            {name || login}
          </h2>
          {name && (
            <p className="text-lg sm:text-xl md:text-2xl text-purple-200 mt-1 sm:mt-2">@{login}</p>
          )}
        </div>

        {/* User Details and Stats */}
        <div className="text-center md:text-left flex-grow">
          {/* Bio */}
          {bio && (
            <p className="text-purple-100 text-base sm:text-lg md:text-xl mt-4 max-w-xl mx-auto md:mx-0 leading-relaxed">
              {bio}
            </p>
          )}

          {/* Contact Info / Other Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-sm sm:text-lg mt-5 sm:mt-6">
            {location && (
              <span className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-purple-300" />
                <span>{location}</span>
              </span>
            )}
            {company && (
              <span className="flex items-center space-x-2">
                <FaBuilding className="text-purple-300" />
                <span>{company}</span>
              </span>
            )}
            {blog && (
              <a href={blog.startsWith('http') ? blog : `https://${blog}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-purple-200 hover:underline">
                <FaLink className="text-purple-300" />
                <span>Website</span>
              </a>
            )}
            {twitterUsername && (
              <a href={`https://twitter.com/${twitterUsername}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-purple-200 hover:underline">
                <FaTwitter className="text-purple-300" />
                <span>@{twitterUsername}</span>
              </a>
            )}
          </div>

          {/* Stats: Followers, Following, Public Repos */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4 text-lg sm:text-xl mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-purple-500">
            <span className="flex flex-col items-center">
              <span className="font-extrabold text-2xl sm:text-3xl">{followers}</span>
              <span className="text-purple-200 text-xs sm:text-sm">Followers</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="font-extrabold text-2xl sm:text-3xl">{following}</span>
              <span className="text-purple-200 text-xs sm:text-sm">Following</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="font-extrabold text-2xl sm:text-3xl">{publicRepos}</span>
              <span className="text-purple-200 text-xs sm:text-sm">Public Repos</span>
            </span>
          </div>

          {/* Top Languages Section */}
          {topLanguages && topLanguages.length > 0 && (
            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-purple-500">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Top Languages</h3>
              <LanguageProgressBar languages={topLanguages} />
            </div>
          )}
          
          {/* GitHub Profile Link */}
          <div className="mt-6 sm:mt-8">
            <a
              href={htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-white text-indigo-700 font-bold text-base sm:text-lg rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 group"
            >
              <FaCodeBranch className="mr-2 sm:mr-3 text-xl sm:text-2xl group-hover:animate-bounce-horizontal" /> View Full GitHub Profile <FiExternalLink className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;