import React from 'react';
import { useQuery } from '@tanstack/react-query';

async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

function PostsComponent() {
  const {
    data,
    error,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60, // 1 minute
    cacheTime: 1000 * 60 * 5, // 5 minutes
  keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0 }}>Posts</h1>
        <div>
          <button onClick={() => refetch()} disabled={isFetching} style={{ marginRight: 8 }}>
            {isFetching ? 'Refreshing...' : 'Refetch'}
          </button>
        </div>
      </div>

      {isLoading && (
        <div style={{ padding: 16 }}>
          <p>Loading posts…</p>
        </div>
      )}

      {isError && (
        <div style={{ color: 'crimson', padding: 16 }}>
          <p>Error loading posts: {error?.message}</p>
          <button onClick={() => refetch()}>Try again</button>
        </div>
      )}

      {data && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {data.slice(0, 20).map((post) => (
            <li key={post.id} style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: 12, marginBottom: 10 }}>
              <h3 style={{ margin: '0 0 8px' }}>{post.title}</h3>
              <p style={{ margin: 0, color: '#374151' }}>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostsComponent;