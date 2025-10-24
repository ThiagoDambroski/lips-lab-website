import React from 'react'
import type { AdditivesOptions, SmelltOptions } from './Types';
import { useApp } from '../../Contexts/AppProvider';

type SmellAndAditivePros = {
    step:number,
    smell:SmelltOptions,
    setSmell:React.Dispatch<React.SetStateAction<SmelltOptions>>,
    aditive:AdditivesOptions,
    setAditive:React.Dispatch<React.SetStateAction<AdditivesOptions>>
}

function SmellAndAditive({step,smell,setSmell,aditive,setAditive}:SmellAndAditivePros) {

  const {smellOptions,additiveOptions} = useApp()

  return (
    <div>
        {step === 4 && 
        <>
          {smellOptions.map((s) => 
          <li key={s.id} style={{backgroundColor: s.id === smell ? "green" : ""} } onClick={() => setSmell(s.id)}>
            {s.name}
            <p>{s.description}</p>
          </li>)}
        </>
        }
        {step === 5 && 
        <>
          {additiveOptions.map((a) => 
          <li key={a.id} style={{backgroundColor: a.id === aditive ? "green" : ""} } onClick={() => setAditive(a.id)}>
            {a.name}
            <p>{a.description}</p>
          </li>
        )}

        </>}
    </div>
  )
}

export default SmellAndAditive