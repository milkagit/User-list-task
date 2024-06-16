import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// import UserList from './components/UserList';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
      </Routes>
    </Router>
  );
}

export default App;
