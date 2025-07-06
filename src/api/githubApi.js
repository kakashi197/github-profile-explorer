// src/api/githubApi.js

const GITHUB_API_BASE_URL = 'https://api.github.com';

export async function fetchUser(username) {
  try {
    const response = await fetch(`${GITHUB_API_BASE_URL}/users/${username}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User "${username}" not found.`);
      }
      throw new Error(`API error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function fetchUserRepos(username) {
  try {
    // GitHub API 100 रिपॉज़िटरीज़ प्रति पेज देता है। हम pagination के लिए इसे बढ़ा सकते हैं
    // लेकिन इस उदाहरण के लिए, पहले 100 पर्याप्त हैं।
    const response = await fetch(`${GITHUB_API_BASE_URL}/users/${username}/repos?per_page=100&sort=updated&direction=desc`);
    if (!response.ok) {
      throw new Error(`Failed to fetch repos: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user repos:", error);
    throw error;
  }
}

// searchRepos फंक्शन की अभी इस प्रोजेक्ट में ज़रूरत नहीं है, लेकिन आप इसे रख सकते हैं।
// export async function searchRepos({ query = '', language = '', topic = '' }) { ... }