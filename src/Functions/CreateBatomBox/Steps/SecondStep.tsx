import type React from "react";
import type { ChangeEvent } from "react"



type SecondStepProps = {
    selected:string[],
    weights: Record<string, number>,
    setWeights: React.Dispatch<React.SetStateAction<Record<string, number>>>,
    toggleColor: (hex:string) => void,
    setStep: React.Dispatch<React.SetStateAction<number>>

}

 

function SecondStep({selected,weights,setWeights,toggleColor,setStep}:SecondStepProps) {

    const onWeightChange = (hex: string) => (e: ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, Math.min(100, Number(e.target.value) || 0));
        setWeights((w) => ({ ...w, [hex]: value }));
    };



  return (
    <div className="second-step">
          {selected.map((c) => (
            <div key={c} style={{ display: 'grid', gap: 20,width: "90%"}}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8,justifyContent:"center" }}>
                <div
                  
                  style={{
                    width: 90,
                    height: 80,
                    backgroundColor: c,
                    border: '1px solid #ccc',
                    borderRadius: 50,
                  }}
                  aria-label={`Swatch ${c}`}
                />
                <input
                type="range"
                min={0}
                max={100}
                step={1}
                style={{
                    
                  backgroundColor: c,
                   
                  }}
                value={weights[c] ?? 0}
                onChange={onWeightChange(c)}
                aria-label={`Intensity for ${c}`}
              />
          
              </div>
              
              <button onClick={() => toggleColor(c)} >X</button>
            </div>
          ))}
          {selected.length != 4 && 
          <>
          <div className="add-color-wrapper">
            <button className="add-color-btn" onClick={() => setStep(0)}>
              <span className="plus">+</span>
            </button>
            <span className="add-color-text">adiciona outra cor!</span>
          </div>

          </>}

          <button className="continue-button" onClick={() => setStep(2)}>Continuar!</button>
        </div>
  )
}

export default SecondStep