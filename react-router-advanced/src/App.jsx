import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import ProfileSettings from './components/ProfileSettings';
import PostsList from './components/PostsList';
import PostDetail from './components/PostDetail';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import { AuthProvider } from './auth/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div style={{ padding: 20 }}><h1>Home</h1><p><a href="/posts">View posts</a></p></div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }>
            <Route index element={<ProfileDetails />} />
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
          <Route path="/posts" element={<PostsList />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
