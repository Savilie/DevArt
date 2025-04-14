import React from 'react'
import './consultationBtn.css'
import { Link } from 'react-router-dom'

const ConsultationBtn = ({ text = "Получить консультацию", onClick }) => {
  return (
    <Link 
      to="/consultation"
      className="consultation-button"
      onClick={onClick}
    >
      {text}
    </Link>
  )
}

export default ConsultationBtn
