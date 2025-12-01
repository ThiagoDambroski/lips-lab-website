import { useState } from "react"
import ColorsSelection from "./ColorsSelection";
import GlitterBaseSelection from "./GlitterBaseSelection";
import type { AdditivesOptions, BaseOptions, EsenceOptions, GlittersOptions, productType, SmelltOptions, TypesOptions} from "./Types";
import SmellAndAditive from "./SmellAndAditive";
import FormatAndText from "./FormatAndText";
import glossImage from "../../assets/gloss.png"
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
    const [glitterSelected,setGlitterSelected] = useState<GlittersOptions>("none")
    const [baseSelected,setBaseSelected] = useState<BaseOptions>("none")
    const [smell,setSmell] = useState<SmelltOptions>('none')
    const [aditive,setAditive] = useState<AdditivesOptions>('none')
    const [esence,setEsence] = useState<EsenceOptions>(undefined)
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
      setEsence(undefined)
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
          <div
            style={{
              width: '100%',
              height: 120,
              borderRadius: 12,
              border: '1px solid #ccc',
              backgroundColor: selectedColor,
              marginBottom: 16,
            }}
            aria-label="Mixed color preview"
          />
            <h2 >step for fonts</h2>
            
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <button onClick={() => setStep(0)} disabled={step === 0}>
                Step 0 – Choose colors
              </button>
              <button onClick={() => setStep(1)} disabled={selectedColor === "#ffffff" || step === 1}>
                Step 1 – Adjust intensities
              </button>
              <button onClick={() => setStep(2)} disabled={step === 0 || step === 2}>
                Step 2 - Acabamento
              </button>
              <button onClick={() => setStep(3)} disabled={step === 0 || step === 1 || step === 3}>
                Step 3 - Glitter
              </button>
              <button onClick={() => setStep(4)} disabled={step === 0 || step === 1 || step === 2 || step === 4}>
                Step 4- Cheiro/gosto
              </button>
              <button onClick={() => setStep(5)} disabled={step === 0 || step === 1 || step === 2 || step === 3 || step === 5}>
                Step 5- Aditivo
              </button>
              <button onClick={() => setStep(6)} disabled={step === 0 || step === 1 || step === 2 || step === 3 || step === 4 
                || step === 6}>
                Step 6 - format
              </button>
              <button onClick={() => setStep(7)} disabled={step === 0 || step === 1 || step === 2 || step === 3 || step === 4 
                || step === 5 || step === 7 || (esence=== undefined && type !== "gloss")}>
                Step 7 - text
              </button>
            </div>
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
                      <img src={glossImage} alt="" className='item-img'/>
                </div>
              </>}
              {step >=3 &&
              <>
              <div className="item-display-2">
                <img src={glossImage} alt="" className='item-img-2'/>
                <img src={descVer} alt="" className="item-img-3"/>
              </div>
              
              </>}
              
            
              <ColorsSelection setSelectedColor={setSelectedColor} step={step} setStep={setStep}/>
              <GlitterBaseSelection step={step} glitterSelected={glitterSelected} 
              setGlitterSelected={setGlitterSelected} 
              type={type}
              baseSelected={baseSelected}
              setBaseSelected={setBaseSelected}/>
              <SmellAndAditive step={step} smell={smell} setSmell={setSmell} aditive={aditive} setAditive={setAditive} esence={esence} setEsence={setEsence}/>
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