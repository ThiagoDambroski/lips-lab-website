import type React from "react";
import type { ChangeEvent } from "react"



type SecondStepProps = {
    selected:string[],
    weights: Record<string, number>,
    setWeights: React.Dispatch<React.SetStateAction<Record<string, number>>>,
    toggleColor: (hex:string) => void

}

 

function SecondStep({selected,weights,setWeights,toggleColor}:SecondStepProps) {

    const onWeightChange = (hex: string) => (e: ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, Math.min(100, Number(e.target.value) || 0));
        setWeights((w) => ({ ...w, [hex]: value }));
    };



  return (
    <div style={{ display: 'grid', gap: 12 }}>
          {selected.map((c) => (
            <div key={c} style={{ display: 'grid', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: c,
                    border: '1px solid #ccc',
                    borderRadius: 6,
                  }}
                  aria-label={`Swatch ${c}`}
                />
                
                <span style={{ marginLeft: 'auto' }}>{weights[c] ?? 0}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={weights[c] ?? 0}
                onChange={onWeightChange(c)}
                aria-label={`Intensity for ${c}`}
              />
              <button onClick={() => toggleColor(c)} >X</button>
            </div>
          ))}
        </div>
  )
}

export default SecondStep