import { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';
import { getUserDetails } from '../services/githubApi';

const Search = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const fetchUserDetails = async (userList) => {
    const details = {};
    for (const u of userList) {
      try {
        const detail = await getUserDetails(u.login);
        details[u.login] = detail;
      } catch (error) {
        console.error(`Error fetching details for ${u.login}:`, error);
      }
    }
    setUserDetails(details);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(false);
    setUser(null);
    setUsers([]);
    setUserDetails({});
    setPage(1);
    try {
      if (location.trim() || (minRepos && parseInt(minRepos) > 0)) {
        // Use advanced search if location or minRepos is provided
        const searchData = await searchUsers(query, location, minRepos, 1);
        const userList = searchData.items || [];
        setUsers(userList);
        if (userList.length > 0) {
          setLoadingDetails(true);
          await fetchUserDetails(userList);
          setLoadingDetails(false);
        }
      } else {
        // Use simple user fetch if no advanced criteria
        const data = await fetchUserData(query);
        setUser(data);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const searchData = await searchUsers(query, location, minRepos, nextPage);
      const newUsers = searchData.items || [];
      setUsers(prev => [...prev, ...newUsers]);
      setPage(nextPage);
      if (newUsers.length > 0) {
        await fetchUserDetails(newUsers);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Search GitHub User</h1>
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Username
          </label>
          <input
            id="username"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter GitHub username"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-describedby="username-help"
          />
          <p id="username-help" className="text-xs text-gray-500 mt-1">Required field</p>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., San Francisco"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Repositories
          </label>
          <input
            id="minRepos"
            type="number"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            placeholder="e.g., 10"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {loading && <p className="text-center mt-4 text-gray-600">Loading...</p>}
      {loadingDetails && <p className="text-center mt-4 text-gray-600">Loading user details...</p>}
      {error && <p className="text-center mt-4 text-red-600">Looks like we can't find the user</p>}
      {users.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          <div className="space-y-4">
            {users.map((u) => (
              <div key={u.id} className="p-4 bg-gray-50 rounded-md flex items-center space-x-4">
                <img src={u.avatar_url} alt={u.login} className="w-16 h-16 rounded-full" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{u.name || u.login}</h3>
                  <p className="text-gray-600">@{u.login}</p>
                  {userDetails[u.login] && (
                    <>
                      <p className="text-sm text-gray-500">Location: {userDetails[u.login].location || 'N/A'}</p>
                      <p className="text-sm text-gray-500">Repos: {userDetails[u.login].public_repos}</p>
                    </>
                  )}
                  <a
                    href={u.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="w-full mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingMore ? 'Loading More...' : 'Load More'}
          </button>
        </div>
      )}
      {user && !users.length && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-center">{user.name || user.login}</h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center mt-2 text-blue-500 hover:text-blue-700"
          >
            View on GitHub
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
