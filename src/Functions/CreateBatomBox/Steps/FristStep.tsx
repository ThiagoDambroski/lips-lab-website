import React from 'react'

type FristStepProps = {
    allColors:string[],
    selected:string[],
    toggleColor: (hex:string) => void,
    setStep: React.Dispatch<React.SetStateAction<number>>;

}


function FristStep({allColors,selected,toggleColor,setStep}:FristStepProps) {
  return (
    <section className='colors-selection'>
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
          <button onClick={() => setStep(1)} disabled={selected.length === 0}>regula a intensidade</button>
   </section>
  )
}

export default FristStep