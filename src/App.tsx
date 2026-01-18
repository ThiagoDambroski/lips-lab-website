
import HomePage from './HomePage/HomePage'
import Faq from './Faq/Faq';
import OnlineExperiencie from './OnlineExperiencie/OnlineExperiencie';
import ReserveNow from './ReserveNow/ReserveNow';
import { Routes, Route } from 'react-router-dom';
import AppProvider from './Contexts/AppProvider';
import Footer from './footer/Footer';
import ExperiencieAndPrice from './expereiencieAndPrice/ExperiencieAndPrice';
import ScrollToTop from './ScrollToTop';
import CartPage from './Cart/CartPage';
import GiftCard from './GiftCard/GiftCard';
import PaymentMethodsPage from "./InfoPage/PaymentMethodsPage";
import TermsPage from "./InfoPage/TermsPage";
import PrivacyPage from "./InfoPage/PrivacyPage";


function App() {

  return (
    <>
   
      <AppProvider>
        <ScrollToTop />
        <Routes>
            
            <Route path='/' element ={<HomePage/>}/>
            <Route path='/reserve' element={<ReserveNow/>}/>
            <Route path='/create' element = {<OnlineExperiencie/>}/>
            <Route path='/faq' element={<Faq/>}/>
            <Route path='experiencie' element={<ExperiencieAndPrice/>}/>
            <Route path='/giftCard' element={<GiftCard/>}/>
            <Route path="/cart" element={<CartPage />} /> 
            <Route path="/payment-methods" element={<PaymentMethodsPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />

        </Routes>
      </AppProvider>
      <Footer/>
      
    </>
  )
}

export default App
