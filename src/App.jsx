// src/App.jsx

import React, { useState, useEffect, useCallback } from 'react';
import UserProfileCard from './components/UserProfileCard';
import RepoCard from './components/RepoCard';
import { fetchUser, fetchUserRepos } from './api/githubApi'; // API फंक्शंस
import './index.css'; // Tailwind CSS

// आपको react-icons इंस्टॉल करना होगा:
// npm install react-icons

function App() {
  const [username, setUsername] = useState(''); // इनपुट फील्ड के लिए यूज़रनेम
  const [currentUser, setCurrentUser] = useState(null); // Fetch किया गया यूज़र ऑब्जेक्ट
  const [userRepos, setUserRepos] = useState([]); // Fetch की गई रिपॉज़िटरीज़
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [userError, setUserError] = useState(null);
  const [repoError, setRepoError] = useState(null);

  // यूज़र डेटा और उनकी रिपॉज़िटरीज़ को एक साथ fetch करने का फंक्शन
  const fetchGitHubData = useCallback(async (userToFetch) => {
    if (!userToFetch) {
      setCurrentUser(null);
      setUserRepos([]);
      setUserError(null);
      setRepoError(null);
      return;
    }

    setLoadingUser(true);
    setLoadingRepos(true);
    setUserError(null);
    setRepoError(null);

    try {
      // यूज़र प्रोफाइल डेटा fetch करें
      const userData = await fetchUser(userToFetch);
      setCurrentUser(userData);
      
      // यूज़र की रिपॉज़िटरीज़ fetch करें
      const reposData = await fetchUserRepos(userToFetch);
      setUserRepos(reposData);

    } catch (err) {
      console.error("Error fetching GitHub data:", err);
      // त्रुटियों को अलग-अलग हैंडल करें
      if (err.message.includes("User")) { // अगर यूज़र नहीं मिला
        setUserError(err.message);
        setCurrentUser(null);
      } else { // अन्य API त्रुटियाँ
        setRepoError(err.message);
        setUserRepos([]);
      }
    } finally {
      setLoadingUser(false);
      setLoadingRepos(false);
    }
  }, []);

  // इनपुट फील्ड में बदलाव को हैंडल करें
  const handleUsernameInputChange = (e) => {
    setUsername(e.target.value);
  };

  // सर्च बटन क्लिक पर या एंटर दबाने पर डेटा fetch करें
  const handleSearchClick = () => {
    fetchGitHubData(username.trim()); // ट्रिम() ताकि लीडिंग/ट्रेलिंग स्पेस हट जाएं
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  // जब कंपोनेंट माउंट हो तो एक डिफ़ॉल्ट यूज़र के लिए डेटा fetch करें (वैकल्पिक)
  useEffect(() => {
    fetchGitHubData('octocat'); // आप यहाँ अपना पसंदीदा डिफ़ॉल्ट यूज़रनेम डाल सकते हैं
  }, [fetchGitHubData]); // dependency array में fetchGitHubData शामिल करें

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6 flex flex-col items-center">
      <div className="max-w-7xl w-full mx-auto bg-white rounded-xl shadow-2xl p-8 space-y-8 my-8">
        <h1 className="text-5xl font-extrabold text-center text-indigo-800 mb-10 leading-tight">
          GitHub Profile & Project Explorer
        </h1>

        {/* यूज़रनेम इनपुट सेक्शन */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-10">
          <input
            type="text"
            placeholder="Enter GitHub username (e.g., torvalds)"
            value={username}
            onChange={handleUsernameInputChange}
            onKeyDown={handleKeyDown}
            className="flex-grow px-6 py-4 border-2 border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-indigo-300 text-xl transition-all duration-300 placeholder-gray-400"
          />
          <button
            onClick={handleSearchClick}
            className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white font-bold text-xl rounded-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 flex-shrink-0"
          >
            Explore Profile
          </button>
        </div>

        {/* लोडिंग और एरर मैसेज */}
        {loadingUser && (
          <div className="text-center text-indigo-700 text-2xl font-semibold animate-pulse">
            Loading user profile...
          </div>
        )}
        {userError && (
          <div className="text-center text-red-600 text-2xl font-semibold">
            Error: {userError}
          </div>
        )}

        {/* यूज़र प्रोफाइल कार्ड */}
        {!loadingUser && !userError && currentUser && (
          <div className="mb-12">
            {/* currentUser ऑब्जेक्ट की सभी प्रासंगिक properties को UserProfileCard को props के रूप में पास करें */}
            <UserProfileCard
              avatarUrl={currentUser.avatar_url}
              name={currentUser.name}
              login={currentUser.login}
              bio={currentUser.bio}
              followers={currentUser.followers}
              following={currentUser.following}
              publicRepos={currentUser.public_repos}
              htmlUrl={currentUser.html_url} // GitHub प्रोफाइल लिंक के लिए
            />
          </div>
        )}

        {/* रिपॉज़िटरीज़ सेक्शन */}
        {!loadingUser && !userError && currentUser && (
          <>
            <hr className="border-gray-200 my-10" />
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
              {currentUser.name || currentUser.login}'s Projects ({userRepos.length})
            </h2>

            {loadingRepos && (
              <div className="text-center text-blue-700 text-2xl font-semibold animate-pulse">
                Loading projects...
              </div>
            )}
            {repoError && (
              <div className="text-center text-red-600 text-2xl font-semibold">
                Error fetching projects: {repoError}
              </div>
            )}

            {userRepos.length > 0 && !loadingRepos && !repoError ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* userRepos Array के हर ऑब्जेक्ट के लिए एक RepoCard रेंडर करें */}
                {userRepos.map((repo) => (
                  <RepoCard
                    key={repo.id} // React को लिस्ट आइटम्स को ट्रैक करने के लिए unique key चाहिए
                    name={repo.name}
                    description={repo.description}
                    language={repo.language}
                    stars={repo.stargazers_count}
                    forks={repo.forks_count}
                    htmlUrl={repo.html_url} // GitHub प्रोजेक्ट पेज के लिंक के लिए
                    topics={repo.topics}
                    homepage={repo.homepage} // वेबसाइट लिंक के लिए
                  />
                ))}
              </div>
            ) : (
              !loadingRepos && !repoError && (
                <div className="text-center text-gray-500 text-lg">
                  This user has no public projects, or we couldn't load them.
                </div>
              )
            )}
          </>
        )}

        {/* इनिशियल स्टेट या जब कोई यूज़र न हो */}
        {!currentUser && !loadingUser && !userError && (
          <div className="text-center text-gray-600 text-xl p-10 bg-gray-50 rounded-lg shadow-inner">
            <p className="mb-4">Enter a GitHub username above to explore their profile and projects!</p>
            <p className="text-sm text-gray-500">
              Try "octocat", "torvalds", or "gaearon" for examples.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;