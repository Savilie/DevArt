import React from 'react'
import './serviceCard.css'

const ServiceCard = ({ title, description, counter, imageSrc }) => {
  return (
    <div className='service-card'>
      <div className='service-card__background'></div>
      <div className='service-card__content'>
        <h3 
          className='card-h3' 
          dangerouslySetInnerHTML={{ __html: title }}
        ></h3>
        
        <p 
          className='card-text'
          dangerouslySetInnerHTML={{ __html: description }}></p>
        
        <div className='card-counter'>{counter}</div>
      </div>
      <div className='service-card__image'>
        <img src={imageSrc} alt="" />
      </div>
    </div>
  )
}

export default ServiceCard