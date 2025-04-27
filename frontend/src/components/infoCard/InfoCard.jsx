import React from 'react'
import "./infocard.css"

const InfoCard = ({image, text}) => {
  return (
    <div className='info-card'>
      <img src={image} alt="" className='info-card__img'/>
      <p className='info-card__text'>{text}</p>
    </div>
  )
}

export default InfoCard
