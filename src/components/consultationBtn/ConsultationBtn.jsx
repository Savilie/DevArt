import React from 'react'
import './consultationBtn.css'

const ConsultationBtn = ({ text = "Получить консультацию", onClick }) => {
  return (
    <button 
      className="consultation-button"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default ConsultationBtn
