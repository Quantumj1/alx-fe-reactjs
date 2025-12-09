import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!res.ok) throw new Error('Failed to fetch blog post');
        const json = await res.json();
        if (mounted) setPost(json);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div style={{ padding: 20 }}>Loading blog post…</div>;
  if (error) return <div style={{ padding: 20, color: 'crimson' }}>Error: {error}</div>;
  if (!post) return <div style={{ padding: 20 }}>Not found</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
