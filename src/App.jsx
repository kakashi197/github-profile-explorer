// src/App.jsx

import React, { useState, useEffect, useCallback } from 'react';
import UserProfileCard from './components/UserProfileCard';
import RepoCard from './components/RepoCard';
import { fetchUser, fetchUserRepos, fetchRepoLanguages } from './api/githubApi'; // API फंक्शंस
import './index.css'; // Tailwind CSS

function App() {
  const [username, setUsername] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  const [topLanguages, setTopLanguages] = useState([]); // नया स्टेट
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [userError, setUserError] = useState(null);
  const [repoError, setRepoError] = useState(null);

  const fetchGitHubData = useCallback(async (userToFetch) => {
    if (!userToFetch) {
      setCurrentUser(null);
      setUserRepos([]);
      setTopLanguages([]);
      setUserError(null);
      setRepoError(null);
      return;
    }

    setLoadingUser(true);
    setLoadingRepos(true);
    setUserError(null);
    setRepoError(null);
    setTopLanguages([]); // हर नई खोज पर रीसेट करें

    try {
      const userData = await fetchUser(userToFetch);
      setCurrentUser(userData);
      
      const reposData = await fetchUserRepos(userToFetch);
      setUserRepos(reposData);

      // शीर्ष भाषाओं की गणना करें
      const languageCounts = {};
      let totalBytes = 0;

      // प्रत्येक रिपॉज़िटरी की भाषाओं को fetch करें (यह थोड़ा धीमा हो सकता है यदि बहुत सारी रिपॉज़िटरीज़ हों)
      // वैकल्पिक रूप से, आप केवल repo.language (मुख्य भाषा) का उपयोग कर सकते हैं यदि performance महत्वपूर्ण है।
      // इस उदाहरण में, हम सटीक डेटा के लिए प्रत्येक रिपॉज़िटरी के सभी भाषाओं को fetch कर रहे हैं।
      const languagePromises = reposData.map(repo => fetchRepoLanguages(userToFetch, repo.name));
      const allRepoLanguages = await Promise.all(languagePromises);

      allRepoLanguages.forEach(repoLang => {
        for (const [lang, bytes] of Object.entries(repoLang)) {
          languageCounts[lang] = (languageCounts[lang] || 0) + bytes;
          totalBytes += bytes;
        }
      });

      const calculatedTopLanguages = Object.entries(languageCounts)
        .map(([name, bytes]) => ({
          name,
          percentage: (bytes / totalBytes) * 100,
        }))
        .sort((a, b) => b.percentage - a.percentage) // सबसे ज़्यादा प्रतिशत वाले पहले
        .slice(0, 5); // शीर्ष 5 भाषाएँ

      setTopLanguages(calculatedTopLanguages);

    } catch (err) {
      console.error("Error fetching GitHub data:", err);
      if (err.message.includes("User")) {
        setUserError(err.message);
        setCurrentUser(null);
      } else {
        setRepoError(err.message);
        setUserRepos([]);
      }
    } finally {
      setLoadingUser(false);
      setLoadingRepos(false);
    }
  }, []);

  const handleUsernameInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSearchClick = () => {
    fetchGitHubData(username.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  useEffect(() => {
    fetchGitHubData('octocat'); // डिफ़ॉल्ट यूज़र
  }, [fetchGitHubData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 flex flex-col items-center font-sans">
      <div className="max-w-7xl w-full mx-auto bg-white rounded-3xl shadow-3xl p-6 sm:p-8 space-y-10 sm:space-y-12 my-6 sm:my-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center text-indigo-900 mb-8 sm:mb-12 leading-tight tracking-tight">
          GitHub <span className="text-purple-600">DevHub</span>
        </h1>

        {/* यूज़रनेम इनपुट सेक्शन */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center mb-8 sm:mb-12">
          <input
            type="text"
            placeholder="Enter GitHub username (e.g., torvalds)"
            value={username}
            onChange={handleUsernameInputChange}
            onKeyDown={handleKeyDown}
            className="flex-grow w-full px-5 py-3 sm:px-7 sm:py-4 border-2 border-indigo-300 rounded-xl shadow-inner focus:outline-none focus:ring-5 focus:ring-purple-400 text-lg sm:text-xl placeholder-gray-400 transition-all duration-300 ease-in-out"
          />
          <button
            onClick={handleSearchClick}
            className="w-full sm:w-auto px-8 py-3 sm:px-12 sm:py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg sm:text-xl rounded-xl shadow-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 ease-in-out flex-shrink-0"
          >
            Explore DevHub
          </button>
        </div>

        {/* लोडिंग और एरर मैसेज */}
        {(loadingUser || loadingRepos) && (
          <div className="text-center text-indigo-700 text-2xl sm:text-3xl font-semibold animate-pulse py-6 sm:py-8">
            Loading data...
          </div>
        )}
        {userError && (
          <div className="text-center text-red-600 text-xl sm:text-2xl font-semibold p-4 sm:p-6 bg-red-50 rounded-lg border border-red-200">
            Error: {userError}
            <p className="text-base sm:text-lg text-gray-700 mt-2">Please check the username and try again.</p>
          </div>
        )}
        {repoError && (
          <div className="text-center text-red-600 text-xl sm:text-2xl font-semibold p-4 sm:p-6 bg-red-50 rounded-lg border border-red-200">
            Error fetching projects: {repoError}
            <p className="text-base sm:text-lg text-gray-700 mt-2">There might be an issue with fetching repository data for this user.</p>
          </div>
        )}

        {/* यूज़र प्रोफाइल कार्ड */}
        {!loadingUser && !userError && currentUser && (
          <div className="mb-10 sm:mb-16">
            <UserProfileCard
              avatarUrl={currentUser.avatar_url}
              name={currentUser.name}
              login={currentUser.login}
              bio={currentUser.bio}
              followers={currentUser.followers}
              following={currentUser.following}
              publicRepos={currentUser.public_repos}
              htmlUrl={currentUser.html_url}
              company={currentUser.company} // नया
              location={currentUser.location} // नया
              blog={currentUser.blog} // नया
              twitterUsername={currentUser.twitter_username} // नया
              topLanguages={topLanguages} // नया
            />
          </div>
        )}

        {/* रिपॉज़िटरीज़ सेक्शन */}
        {!loadingUser && !userError && currentUser && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-10 border-b-2 border-indigo-200 pb-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2 sm:mb-0">
                {currentUser.name || currentUser.login}'s Projects
              </h2>
              <span className="text-xl sm:text-2xl font-bold text-purple-600 bg-purple-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm">
                Total: {userRepos.length}
              </span>
            </div>

            {!loadingRepos && !repoError && userRepos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {userRepos.map((repo) => (
                  <RepoCard
                    key={repo.id}
                    name={repo.name}
                    description={repo.description}
                    language={repo.language} // यह मुख्य भाषा है
                    stars={repo.stargazers_count}
                    forks={repo.forks_count}
                    htmlUrl={repo.html_url}
                    homepage={repo.homepage}
                    lastUpdated={repo.updated_at}
                  />
                ))}
              </div>
            ) : (
              !loadingRepos && !repoError && (
                <div className="text-center text-gray-500 text-lg sm:text-xl p-6 bg-gray-50 rounded-lg shadow-inner">
                  <p className="mb-2">This user has no public projects, or we couldn't load them.</p>
                  <p className="text-sm sm:text-base mt-2">Projects listed are public repositories only.</p>
                </div>
              )
            )}
          </>
        )}

        {/* इनिशियल स्टेट या जब कोई यूज़र न हो */}
        {!currentUser && !loadingUser && !userError && (
          <div className="text-center text-gray-600 text-lg sm:text-2xl p-8 sm:p-10 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
            <p className="mb-4 sm:mb-6 leading-relaxed">Discover GitHub profiles and their amazing open-source projects!</p>
            <p className="text-sm sm:text-lg text-gray-500">
              Enter a GitHub username like <span className="font-semibold text-indigo-700">octocat</span>, <span className="font-semibold text-indigo-700">torvalds</span>, or <span className="font-semibold text-indigo-700">gaearon</span> to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;