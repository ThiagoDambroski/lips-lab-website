import React from 'react'
type ColorOption = {
      hex: string;
      sub: string;
    };
type FristStepProps = {
    allColors:ColorOption[],
    selected:string[],
    toggleColor: (hex:string) => void,
    setStep: React.Dispatch<React.SetStateAction<number>>;

}


function FristStep({allColors,selected,toggleColor,setStep}:FristStepProps) {
  return (
    <section className='colors-selection'>
          <span className='title-button'>cria a cor</span>
          <h3>Combina até 4 pigmentos, mistura tons<br/> e encontra a cor que revela quem és!</h3>
          <h4>21 cores que te dão total controlo<br/>  para criares qualquer tom imaginável.</h4>
          <div className='colors-containers'>
            {allColors.map((c) => {
            const active = selected.includes(c.hex);
            return (
              <div className='colors-section-div'>
                <button className='colors-section'
                  key={c.hex}
                  onClick={() => toggleColor(c.hex)}
                  style={{
                  
                    backgroundColor: c.hex,
                    border: active ? '3px solid green' : '1px solid #ccc',
                    borderRadius: 50,
                    cursor: 'pointer',
                  }}
                  aria-pressed={active}
                  aria-label={`Select color ${c}`}
                />
                <p>{c.sub}</p>
              </div>
              
            );
            })}

          </div>
          <button onClick={() => setStep(1)} disabled={selected.length === 0}>regula a intensidade</button>
   </section>
  )
}

export default FristStep