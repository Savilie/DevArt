import React from 'react'
import './modalMenu.css'

const ModalMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="container">
        <div className="modal-button-wrapper">
          <button className="modal__close" onClick={onClose}>
            <div className="close-icon">
              <div className="close-icon-line"></div>
              <div className="close-icon-line"></div>
            </div>
          </button>
        </div>
      </div>
      
      <div className="modal__content">  
        <nav className="modal__nav">
          <div className="modal__nav-column">
            <a href="#" className="modal__link">Главная</a>
            <a href="#" className="modal__link">Технологиии</a>
            <a href="#" className="modal__link">Услуги</a>
            <a href="#" className="modal__link">Кейсы</a>
            <a href="#" className="modal__link">О компании</a>
          </div>
          <div className="modal__nav-column">
            <a href="#" className="modal__link">Сертификаты</a>
            <a href="#" className="modal__link">Команда</a>
            <a href="#" className="modal__link">Отзывы</a>
            <a href="#" className="modal__link">Блог</a>
            <a href="#" className="modal__link">Контакты</a>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default ModalMenu
