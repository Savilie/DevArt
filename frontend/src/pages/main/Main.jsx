import Header from '../../components/header/Header'
import Landing from '../../components/landing/Landing'
import Services from '../../components/services/Services'
import Goals from '../../components/goals/Goals'

const Main = () => {
  return (
    <>
      <div className='background-blur'></div>
      <Header theme={true}/>
      <Landing/>
      <Services/>
      <Goals/>
    </>
  )
}

export default Main
