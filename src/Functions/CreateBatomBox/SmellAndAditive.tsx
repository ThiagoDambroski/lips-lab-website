import React from 'react'
import type { AdditivesOptions, EsenceOptions, SmelltOptions } from './Types';
import { useApp } from '../../Contexts/AppProvider';

type SmellAndAditivePros = {
    step:number,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    smell:SmelltOptions,
    setSmell:React.Dispatch<React.SetStateAction<SmelltOptions>>,
    aditive:AdditivesOptions,
    setAditive:React.Dispatch<React.SetStateAction<AdditivesOptions>>,
    esence:EsenceOptions,
    setEsence:React.Dispatch<React.SetStateAction<EsenceOptions>>

}

function SmellAndAditive({step,setStep,smell,setSmell,aditive,setAditive,esence,setEsence}:SmellAndAditivePros) {

  const {smellOptions,additiveOptions,allEsence} = useApp()

  return (
    <>

      {step === 4 && 
        <div className='adtive-container'>
          <p>Os aditivos especiais são utilizados para melhorar 
            e personalizar ainda mais o teu produto!</p>
          <ul>
            {additiveOptions.map((a) => 
            <li key={a.id} style={{backgroundColor: a.id === aditive ? "green" : ""} } onClick={() => setAditive(a.id)}>
              <img src={a.img} alt="" />
              {a.name}
              
            </li>
            )}
          </ul>
          <button onClick={() => setStep(5)} disabled={aditive === 'none'}>Continuar</button>
          <span>*Os aditivos de hidratação (Moisture Additive) e suavização (Silkening Modifier) alteram a textura e as propriedades do batom</span>
        </div>}

        {step === 5 && 
        <div className='taste-section'>
          <h2>Os sabores e essências são usados para personalizar 
            e realçar ainda mais os produtos labiais personalizados!</h2>
          <h3>SABORES</h3>
          <ul>
            {smellOptions.map((s) => 
            <li key={s.id} style={{backgroundColor: s.id === smell ? "green" : ""} } onClick={() => setSmell(s.id)}>
              <div>
                <img src={s.img} alt="" />
              </div>
              
              <p>{s.name}</p>
           
            </li>)}
          </ul>
          
          <h3>ESSÊNCIAS</h3>
          <div className='esence-container'>
              {allEsence.map((e) => 
                <>
                  <button onClick={() => setEsence(e.id)} style={{backgroundColor: esence === e.id ? "green" : ""}}>
                    <img src={e.img}/>
                    <p>{e.name}</p>
                  </button>
                </>)}
          </div> 
          <button className='continue-button' onClick={() => setStep(6)} disabled={smell === 'none' || esence === 'none'}>
            continuar!
          </button>
        </div>
        }
       
    </>
  )
}

export default SmellAndAditive