import { useState } from "react"
import ColorsSelection from "./ColorsSelection";
import GlitterBaseSelection from "./GlitterBaseSelection";
import type { AdditivesOptions, BaseOptions, FormatOptions, GlittersOptions, productType, SmelltOptions, TypesOptions} from "./Types";
import SmellAndAditive from "./SmellAndAditive";
import FormatAndText from "./FormatAndText";



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
    const [format,setFormat] = useState<FormatOptions>(undefined)
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
      setFormat(undefined)
      setBoxText("")
    }


    const generatedProduct = () => {
      const newProduct:productType = {id:1,type:type,color:selectedColor,glitter:glitterSelected,
        base:baseSelected,smell:smell,aditive:aditive,format:format,boxText:boxText} 
      setNewProduct(newProduct)
    }
    
    

  return (
    <div>
        {type === undefined && 
        <>
          <div onClick={() => handleTypeChange("batom")}>Batom</div>
          <div onClick={() => handleTypeChange("gloss")}>gloss</div>
        </>}
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
                Step 2 - glitter
              </button>
              <button onClick={() => setStep(3)} disabled={step === 0 || step === 1 || step === 3}>
                Step 3 - Acabamento
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
                || step === 5 || step === 7 || (format === undefined && type !== "gloss")}>
                Step 7 - text
              </button>
            </div>
            <ColorsSelection setSelectedColor={setSelectedColor} step={step} setStep={setStep}/>
            <GlitterBaseSelection step={step} glitterSelected={glitterSelected} 
            setGlitterSelected={setGlitterSelected} 
            type={type}
            baseSelected={baseSelected}
            setBaseSelected={setBaseSelected}/>
            <SmellAndAditive step={step} smell={smell} setSmell={setSmell} aditive={aditive} setAditive={setAditive}/>
            <FormatAndText step={step} format={format} setFormat={setFormat} type={type} boxText={boxText} 
            setBoxText={setBoxText}/>
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
          <div><strong>Format:</strong> {newProduct.format ?? "(none)"}</div>
          {newProduct.boxText}
        
        </>}
    </div>
  )
}

export default CreateBatomBox