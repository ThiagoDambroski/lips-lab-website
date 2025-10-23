import React from 'react'

type GlitterBaseType = {
    step:number,
    glitterSelected:string,
    setGlitterSelected:React.Dispatch<React.SetStateAction<string>>
}

function GlitterBaseSelection({step,glitterSelected,setGlitterSelected}:GlitterBaseType) {

    const glitterOptions = ["rosa","bronze","dourado","preateado","vermelho","arco-iris"]

  return (
    <div>
        {step === 2 && (
        <div>
          <p onClick={() => setGlitterSelected('none')} style={{backgroundColor: glitterSelected === "none" ? "green" : ""}}>None</p>
          <p>Glitter</p>
          <ul>
            {glitterOptions.map((g) => 
            <li onClick={() => setGlitterSelected(g)} style={{backgroundColor: glitterSelected === g ? "green" : ""}}>
                {g}
            </li>)}
          </ul>
          <p>Dust</p>
          <ul>
            <li>Brilho Intenso</li>
            <li>Po dourado</li>
            <li>Po diamente</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default GlitterBaseSelection