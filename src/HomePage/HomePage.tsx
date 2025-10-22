
import { useApp } from '../Contexts/AppProvider'
import CreateBatomBox from '../Functions/CreateBatomBox/CreateBatomBox'


function HomePage() {

    const {lightBox,toggleLightBox} = useApp()
    
  return (
    <main>
        HomePage
        {lightBox && "hello"}
        <button onClick={toggleLightBox}>Click me</button>
    </main>
   
  )
}

export default HomePage