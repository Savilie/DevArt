import React from 'react'
import './goals.css'
import ConsultationBtn from '../consultationBtn/ConsultationBtn'

const Goals = () => {
  return (
    <div className='goals'>
      <img src="goals-back-light.png" alt="" className='goals-back-light'/>
        <div className="container">
            <div className="goals__inner">
                <div className='goals-text-first'>
                    <div className='text-counter'>1</div>
                    <img src="goals-line-1.png" alt="" className='line-decor-first'/>
                    <p className='text-description'>Мы создаем инновационные технологии виртуальной и дополненной реальности</p>
                </div>
                <img src="head.png" alt="" className='head'/>
                <div className="glow-effect glow-effect-first"></div>
                <div className="glow-effect glow-effect-second"></div>
                <div className='goals-text-second'>
                    <p className='text-description'>Наша цель — предложить решения, которые делают взаимодействие с реальностью более увлекательным, эффективным и доступным.</p>
                    <img src="goals-line-2.png" alt="" className='line-decor-second'/>
                    <div className='text-counter counter-second'>2</div>
                </div>
                <div className="goals-consultation-wrapper">
                    <ConsultationBtn onClick={() => console.log("Clicked")}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Goals
