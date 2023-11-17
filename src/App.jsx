import Header from './components/header/header';
import Start from './pages/start/start';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <Start />
    </Router>
  )
}

export default App
