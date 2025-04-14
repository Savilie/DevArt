import Header from '../../components/header/Header'
import './consultation.css'
import '../../components/services/services.css'

const Consultation = () => {
  return (
    <div className='consultation-page'>
      <img src="goals-back-light.png" alt="" className='back-light'/>
      <div className="cons-header">
        <Header theme={false}/>
      </div>
      <div className="consultation-main">
        <div className="consultation-main__header">
          <h2>Получить консультацию</h2>
          <p>Мы всегда рады помочь вашему бизнесу и реализации ваших идей</p>
        </div>

        

      </div>
    </div>
  )
}

export default Consultation
