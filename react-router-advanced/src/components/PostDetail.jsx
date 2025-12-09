import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const r = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        if (!r.ok) throw new Error('Failed to load post');
        const data = await r.json();
        if (mounted) setPost(data);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [postId]);

  if (loading) return <div style={{ padding: 20 }}>Loading post…</div>;
  if (error) return <div style={{ padding: 20, color: 'crimson' }}>Error: {error}</div>;
  if (!post) return <div style={{ padding: 20 }}>Post not found</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
