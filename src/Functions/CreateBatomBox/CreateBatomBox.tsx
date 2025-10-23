import { useState } from "react"
import type { ColorsForBatom, TypesForBatom } from "./Types";
import ColorsSelection from "./ColorsSelection";
import GlitterBaseSelection from "./GlitterBaseSelection";



function CreateBatomBox() {

    const [newBattom,setNewBattom] = useState();
  
    const [selectedColor,setSelectedColor] = useState<string | undefined>(undefined);
    const [step, setStep] = useState<number>(0);
    const [smell,setSmell] = useState<string>();
    const [type,setType] = useState<TypesForBatom>();

    const [glitterSelected,setGlitterSelected] = useState<string>("none")
    

  return (
    <div>
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
        </div>
        <ColorsSelection setSelectedColor={setSelectedColor} step={step} setStep={setStep}/>
        <GlitterBaseSelection step={step} glitterSelected={glitterSelected} setGlitterSelected={setGlitterSelected}/>

         <label>
            type:{selectedColor}
            <select>
                <option value="matte">Matte</option>
                <option value="gloss">Gloss</option>
            </select>
        </label>
        <button>Implemnt</button>
    </div>
  )
}

export default CreateBatomBox