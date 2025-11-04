import Navbar from './Navbar/navbar'
import HomePage from './HomePage/HomePage'
import Faq from './Faq/Faq';
import OnlineExperiencie from './OnlineExperiencie/OnlineExperiencie';
import ReserveNow from './ReserveNow/ReserveNow';
import { Routes, Route } from 'react-router-dom';
import AppProvider from './Contexts/AppProvider';
import Footer from './footer/Footer';
import ExperiencieAndPrice from './expereiencieAndPrice/ExperiencieAndPrice';

function App() {

  return (
    <>
      
      <AppProvider>
        <Routes>
            <Route path='/' element ={<HomePage/>}/>
            <Route path='/reserve' element={<ReserveNow/>}/>
            <Route path='/create' element = {<OnlineExperiencie/>}/>
            <Route path='/faq' element={<Faq/>}/>
            <Route path='experiencie' element={<ExperiencieAndPrice/>}/>
        </Routes>
      </AppProvider>
      <Footer/>
      
    </>
  )
}

export default App
