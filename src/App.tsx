import Navbar from './Navbar/navbar'
import HomePage from './HomePage/HomePage'
import Faq from './Faq/Faq';
import OnlineExperiencie from './OnlineExperiencie/OnlineExperiencie';
import ReserveNow from './ReserveNow/ReserveNow';
import { Routes, Route } from 'react-router-dom';
import AppProvider from './Contexts/AppProvider';

function App() {

  return (
    <>
      <Navbar/>
      <AppProvider>
        <Routes>
            <Route path='/' element ={<HomePage/>}/>
            <Route path='/reserve' element={<ReserveNow/>}/>
            <Route path='/create' element = {<OnlineExperiencie/>}/>
            <Route path='/faq' element={<Faq/>}/>
        </Routes>
      </AppProvider>
      
    </>
  )
}

export default App
