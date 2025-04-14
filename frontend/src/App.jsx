import Main from './pages/main/Main.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Consultation from './pages/consultation/Consultation.jsx'

const App = () => {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/consultation" element={<Consultation/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
