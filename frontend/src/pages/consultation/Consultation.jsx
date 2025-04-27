import Header from '../../components/header/Header'
import './consultation.css'
import { useState, useRef } from 'react'

const Consultation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: '',
    file: null,
    agreement: false
  });
  const [fileName, setFileName] = useState('Прикрепите файл');
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      const selectedFile = files[0];
      if (selectedFile) {
        setFormData({
          ...formData,
          [name]: selectedFile
        });
        
        // Обновляем отображаемое имя файла
        setFileName(selectedFile.name);
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the submission to your backend
    console.log('Form submitted:', formData);
  };

  const handleFileWrapperClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='consultation-page'>
      <img src="goals-back-light.png" alt="" className='back-light'/>
      <div className="cons-header">
        <Header theme={false}/>
      </div>
      <div className="container">
        <div className="consultation__inner">
          <div className="consultation-main">
            <div className="consultation-main__header">
              <h2>ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ</h2>
              <p>Мы всегда рады помочь вашему бизнесу<br />и реализации ваших идей</p>
            </div>

            <form onSubmit={handleSubmit} className="consultation-form">
              <div className="form-row">
                <div className="form-group">
                  <span className='form-red-star'>*</span>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    placeholder="Имя" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <span className='form-red-star'>*</span>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    placeholder="Телефон" 
                    value={formData.phone} 
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <span className='form-red-star'>*</span>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    placeholder="E-mail" 
                    value={formData.email} 
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group description-group">
                <input 
                  type="text"
                  id="description" 
                  name="description"
                  placeholder="Описание задачи" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="form-group file-upload">
                <div 
                  className="file-input-wrapper"
                  onClick={handleFileWrapperClick}
                >
                  <span className={`file-placeholder ${fileName !== 'Прикрепите файл' ? 'file-selected' : ''}`}>
                    {fileName}
                  </span>
                  <span className="file-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 6V12.5C13 13.8807 11.8807 15 10.5 15H5.5C4.11929 15 3 13.8807 3 12.5V3.5C3 2.11929 4.11929 1 5.5 1H8" stroke="#2D2D2D" strokeLinecap="round"/>
                      <path d="M10 1H13V4" stroke="#2D2D2D" strokeLinecap="round"/>
                      <path d="M13 1L8 6" stroke="#2D2D2D" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <input 
                    type="file" 
                    id="file" 
                    name="file"
                    onChange={handleInputChange} 
                    className="hidden-file-input"
                    ref={fileInputRef}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              
              <div className="form-group checkbox-group">
                <input 
                  type="checkbox" 
                  id="agreement" 
                  name="agreement" 
                  checked={formData.agreement} 
                  onChange={handleInputChange} 
                  required 
                />
                <label htmlFor="agreement">Согласен с политикой конфиденциальности</label>
              </div>
              
              <button type="submit" className="submit-btn">Оставить заявку</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Consultation