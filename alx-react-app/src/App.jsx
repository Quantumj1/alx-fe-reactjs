import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import './App.css'
import WelcomeMessage from './components/WelcomeMessage.jsx'
import Header from './components/Header.jsx'
import MainContent from './components/MainContent.jsx'
import Footer from './components/Footer.jsx'
import UserProfile from './components/UserProfile.jsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <WelcomeMessage />
            <Header />
            <MainContent />
            <UserProfile name="Eneritus" age="19" bio="Loves Reading and Programming" />
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App
