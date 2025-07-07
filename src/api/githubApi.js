// src/api/githubApi.js

const GITHUB_API_BASE_URL = 'https://api.github.com';

// GitHub पर्सनल एक्सेस टोकन (इसे .env फाइल में रखें और .gitignore करें!)
// उदाहरण: const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
// यदि आप डेवलपमेंट के लिए अस्थायी रूप से उपयोग कर रहे हैं, तो इसे सीधे यहाँ जोड़ सकते हैं
// लेकिन उत्पादन में इसे कभी भी सीधे कोड में न रखें।
const GITHUB_TOKEN = ''; // <--- अपना GitHub Personal Access Token यहाँ पेस्ट करें (Optional, for higher rate limits)

// Headers for authenticated requests (if token is available)
const getHeaders = () => {
  if (GITHUB_TOKEN) {
    return {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
    };
  }
  return {
    'Accept': 'application/vnd.github.v3+json',
  };
};

export async function fetchUser(username) {
  try {
    const response = await fetch(`${GITHUB_API_BASE_URL}/users/${username}`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User "${username}" not found.`);
      }
      if (response.status === 403 && response.headers.get('X-RateLimit-Remaining') === '0') {
        throw new Error('GitHub API rate limit exceeded. Please try again later.');
      }
      throw new Error(`API error: ${response.statusText || response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function fetchUserRepos(username) {
  try {
    // GitHub API 100 रिपॉज़िटरीज़ प्रति पेज देता है।
    // हम pagination के लिए इसे बढ़ा सकते हैं, लेकिन इस उदाहरण के लिए, पहले 100 पर्याप्त हैं।
    // sort=updated और direction=desc से हाल ही में अपडेटेड रिपॉज़िटरीज़ पहले मिलेंगी।
    const response = await fetch(`${GITHUB_API_BASE_URL}/users/${username}/repos?per_page=100&sort=updated&direction=desc`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      if (response.status === 403 && response.headers.get('X-RateLimit-Remaining') === '0') {
        throw new Error('GitHub API rate limit exceeded for repositories. Please try again later.');
      }
      throw new Error(`Failed to fetch repos: ${response.statusText || response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user repos:", error);
    throw error;
  }
}

// यह फंक्शन एक विशिष्ट रिपॉज़िटरी की लैंग्वेजेज़ को fetch करेगा
export async function fetchRepoLanguages(username, repoName) {
  try {
    const response = await fetch(`${GITHUB_API_BASE_URL}/repos/${username}/${repoName}/languages`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      // Don't throw a critical error for languages, just return empty
      console.warn(`Could not fetch languages for ${repoName}: ${response.statusText || response.status}`);
      return {};
    }
    return await response.json();
  } catch (error) {
    console.warn(`Error fetching languages for ${repoName}:`, error);
    return {};
  }
}