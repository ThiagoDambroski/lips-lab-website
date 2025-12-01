import React from 'react'

type FristStepProps = {
    allColors:string[],
    selected:string[],
    toggleColor: (hex:string) => void

}

function FristStep({allColors,selected,toggleColor}:FristStepProps) {
  return (
    <div className='colors-selection'>
          <h3>Combina até 4 pigmentos, mistura tons 
          e encontra a cor que reflete quem és!</h3>
          <div>
            {allColors.map((c) => {
            const active = selected.includes(c);
            return (
              <button className='colors-section'
                key={c}
                onClick={() => toggleColor(c)}
                style={{
                 
                  backgroundColor: c,
                  border: active ? '3px solid green' : '1px solid #ccc',
                  borderRadius: 50,
                  cursor: 'pointer',
                }}
                aria-pressed={active}
                aria-label={`Select color ${c}`}
              />
            );
            })}
          </div>
          <button>regula a intensidade</button>
        </div>
  )
}

export default FristStep