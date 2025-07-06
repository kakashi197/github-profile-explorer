// src/components/UserProfileSummary.jsx

import React from 'react';

function UserProfileSummary({ avatarUrl, name, login, bio, followers, following }) {
  if (!avatarUrl && !name && !login) {
    return null; // अगर कोई डेटा नहीं है तो कुछ भी डिस्प्ले न करें
  }

  return (
    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg shadow-inner">
      <img
        src={avatarUrl}
        alt={name || login}
        className="w-16 h-16 rounded-full border-2 border-blue-400"
      />
      <div>
        <h3 className="text-xl font-bold text-gray-800">{name || login}</h3>
        {name && <p className="text-gray-600 text-sm">@{login}</p>}
        {bio && <p className="text-gray-700 text-sm mt-1 line-clamp-1">{bio}</p>}
        <div className="flex text-gray-500 text-xs mt-2 space-x-3">
          <span>{followers} Followers</span>
          <span>{following} Following</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfileSummary;