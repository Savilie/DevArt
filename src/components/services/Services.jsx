import React from 'react'
import Header from '../header/Header.jsx'
import './services.css'
import ServiceCard from '../serviceCard/ServiceCard.jsx'

const Services = () => {
  return (
    <div className='services'>
      {/* <div className='dots-grid'></div> */}
      <Header theme={false} />
      <div className='container'>
        <div className='services__inner'>
          <div className="with-dots-mask">
            <img src="purple-ellipse.png" alt="" className='ellipse-beauty'/>
          </div>
          <h2 className='services-h2'>Отличия виртуальной реальности от дополненной</h2>

          <div className="services-description">
            <div className='services-description__item'>
              <h3>Виртуальная реальность</h3>
              <p>Отличается от дополненной реальности (AR) тем, что видимая действительность искусственна. Пользователю предлагают полное погружение, задействуя дополнительные органы чувств. Мы внедряем новейшие разработки VR — используем не только шлем, а ещё перчатки, костюмы и контроллеры движения.</p>
            </div>
            <div className='services-description__item'>
              <h3>Дополненная реальность</h3>
              <p>Технология, с помощью которой в видимую действительность помещают виртуальные объекты. Представьте, что вы на презентации архитектора надеваете специальные очки, и на пустом столе появляется макет здания. Движением руки вы сможете вращать объект, приближать, отдалять или даже что-то в нём поменять.</p>
            </div>
          </div>

          <img src="purple-ellipse.png" alt="" className='ellipse-beauty-second'/>

          <ServiceCard 
            title="Пример <span class='purple'>VR</span>" 
            description="Игры это <span class='regular'>минимум возможностей&nbspvr</span>"
            counter="1"
            imageSrc="service-card-vr.png"
          />
          <ServiceCard
            title="Пример <span class='purple'>AR</span>"
            description="Представьте <span class='regular'>новые ощущения</span> от покупки"
            counter="2"
            imageSrc="service-card-ar.png"
          />
        </div>
      </div>
    </div>
  )
}

export default Services
