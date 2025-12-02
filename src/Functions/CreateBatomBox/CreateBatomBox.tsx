import { useState } from "react"
import ColorsSelection from "./ColorsSelection";
import GlitterBaseSelection from "./GlitterBaseSelection";
import type { AdditivesOptions, BaseOptions, EsenceOptions, GlittersOptions, productType, SmelltOptions, TypesOptions} from "./Types";
import SmellAndAditive from "./SmellAndAditive";
import FormatAndText from "./FormatAndText";
import glossImage from "../../assets/gloss.png"
import glossWhioutImage from "../../assets/gloss whiout.png"
import batomImage from "../../assets/batom.png"
import libsbackg from "../../assets/libs back.png"
import "../../scss/CreateBatom.css"

import descVer from "../../assets/desc-ver.png"



function CreateBatomBox() {
    const [step, setStep] = useState<number>(0);
    const [newProduct,setNewProduct] = useState<productType >(null);

    const [type,setType] = useState<TypesOptions>(undefined);
    const [automaticChoice,setAutomaticChoice] = useState<boolean>()
    
    const [selectedColor,setSelectedColor] = useState<string | undefined>(undefined);
    const [glitterSelected,setGlitterSelected] = useState<string>("none")
    const [baseSelected,setBaseSelected] = useState<BaseOptions>("none")
    const [smell,setSmell] = useState<SmelltOptions>('none')
    const [aditive,setAditive] = useState<AdditivesOptions>('none')
    const [esence,setEsence] = useState<EsenceOptions>('none')
    const [boxText,setBoxText] = useState<string>("")

    const handleTypeChange = (typeInput:TypesOptions) => {
      setNewProduct(null)
      setType(typeInput)
      setSelectedColor(undefined)
      setStep(0)
      setSmell('none')
      setGlitterSelected('none')
      setBaseSelected('none')
      setAditive('none')
      setEsence('none')
      setBoxText("")
    }


    const generatedProduct = () => {
      const newProduct:productType = {id:1,type:type,color:selectedColor,glitter:glitterSelected,
        base:baseSelected,smell:smell,aditive:aditive,esence:esence,boxText:boxText} 
      setNewProduct(newProduct)
    }
    
    

  return (
    <div>
        {type === undefined && 
        <main style={{ backgroundImage: `url(${libsbackg})` }} className="main-create-box">
          
          <div className="gloss-or-batom-container">

            <div className="gloss-or-batom-container-image">
              <img src={glossImage}/>
              <button onClick={() => handleTypeChange("gloss")}>gloss labial</button>
            </div>
            <div className="gloss-or-batom-container-image">
              <img src={batomImage} alt="" />
              <button onClick={() => handleTypeChange("batom")}>Batom</button>
            </div>
              
          </div>
          
        </main>}
        {type !== undefined &&
         <>
          <p>{type} <button onClick={() => setType(undefined)}>X</button></p>
          
            <main className='main-color-selection' >
              {step <= 2 && 
              <>
                <div className='item-display'>
                      <div className='item-display-container'>
                        <div>
                          <h2>TEU GLOSS LABIAL DOS SONHOS!</h2>
                          <p className='p-1'>Segue os passos de personalização 
                          para criar o teu batom</p>
                          <img src={descVer} alt="" />
                        </div>
                        <p>*As cores podem variar dependendo do tipo de ecrã
                        Para obter melhores resultados, certifique-se de 
                        que o brilho do ecrã está no máximo</p>
                      </div>
                       <div className="item-img-color-wrapper">
                        <div
                          className="item-color-fill"
                          style={{ backgroundColor: selectedColor || "transparent" }}
                        />
                        <img src={glossWhioutImage} alt="" className="item-img" />
                      </div>
                </div>
              </>}
              {step >=3 &&
              <>
              <div className="item-display-2">
                 <div className="item-img-2-color-wrapper">
                  <div
                    className="item-color-fill item-color-fill-2"
                    style={{ backgroundColor: selectedColor || "transparent" }}
                  />
                  <img src={glossWhioutImage} alt="" className='item-img-2-create'/>
                </div>

                <img src={descVer} alt="" className="item-img-3"/>
              </div>
              
              </>}
              
            
              <ColorsSelection setSelectedColor={setSelectedColor} step={step} setStep={setStep}/>
              <GlitterBaseSelection step={step} setStep={setStep} glitterSelected={glitterSelected} 
              setGlitterSelected={setGlitterSelected} 
              type={type}
              baseSelected={baseSelected}
              setBaseSelected={setBaseSelected}/>
              <SmellAndAditive step={step} setStep={setStep} smell={smell} setSmell={setSmell} aditive={aditive} setAditive={setAditive} esence={esence} setEsence={setEsence}/>
              <FormatAndText step={step} type={type} boxText={boxText} 
              setBoxText={setBoxText}/>
            </main>
          </>}
        

         <label>
            color:{selectedColor}
            
        </label>
        <button disabled={step !== 7} onClick={() => generatedProduct()}>Implemnt</button>
        {newProduct !== null && 
        <>
          seu produto:
          <span>{newProduct.color}</span>
          <div><strong>Glitter:</strong> {newProduct.glitter}</div>
          <div><strong>Base:</strong> {newProduct.base}</div>
          <div><strong>Smell:</strong> {newProduct.smell}</div>
          <div><strong>Additive:</strong> {newProduct.aditive}</div>
          <div><strong>esesnce:</strong> {newProduct.esence ?? "(none)"}</div>
          {newProduct.boxText}
        
        </>}
    </div>
  )
}

export default CreateBatomBox