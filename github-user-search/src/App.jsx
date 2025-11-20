
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomeMessage from './components/WelcomeMessage';
import Search from './components/Search';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<WelcomeMessage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/user/:username" element={<UserProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
