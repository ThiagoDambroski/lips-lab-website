import { useState } from "react"
import ColorsSelection from "./ColorsSelection";
import GlitterBaseSelection from "./GlitterBaseSelection";
import type { GlittersOptions, SmelltOptions } from "./Types";
import SmellAndAditive from "./SmellAndAditive";



function CreateBatomBox() {

    const [newBattom,setNewBattom] = useState();

    const [type,setType] = useState<string>("none");
    const [step, setStep] = useState<number>(0);
    const [selectedColor,setSelectedColor] = useState<string | undefined>(undefined);
    const [glitterSelected,setGlitterSelected] = useState<GlittersOptions>("none")
    const [baseSelected,setBaseSelected] = useState<string>("none")
    const [smell,setSmell] = useState<SmelltOptions>('none');

    const handleTypeChange = (typeInput:string) => {
      setType(typeInput)
      setSelectedColor(undefined)
      setStep(0)
      setSmell('none')
      setGlitterSelected('none')
      setBaseSelected('none')
    }

    
    

  return (
    <div>
        {type === "none" && 
        <>
          <div onClick={() => handleTypeChange("batom")}>Batom</div>
          <div onClick={() => handleTypeChange("gloss")}>gloss</div>
        </>}
        {type !== "none" &&
         <>
          <p>{type} <button onClick={() => setType("none")}>X</button></p>
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
            </div>
            <ColorsSelection setSelectedColor={setSelectedColor} step={step} setStep={setStep}/>
            <GlitterBaseSelection step={step} glitterSelected={glitterSelected} 
            setGlitterSelected={setGlitterSelected} 
            type={type}
            baseSelected={baseSelected}
            setBaseSelected={setBaseSelected}/>
            <SmellAndAditive step={step}/>
            
          </>}
        

         <label>
            color:{selectedColor}
            
        </label>
        <button>Implemnt</button>
    </div>
  )
}

export default CreateBatomBox