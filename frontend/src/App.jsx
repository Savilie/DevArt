import Main from './pages/main/Main.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Consultation from './pages/consultation/Consultation.jsx'
import Portfolio from './pages/portfolio/Portfolio.jsx';

const App = () => {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/consultation" element={<Consultation/>}/>
        <Route path="/portfolio" element={<Portfolio/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
