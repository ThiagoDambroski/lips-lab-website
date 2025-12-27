import React from 'react'
import type { AdditivesOptions, EsenceOptions, SmelltOptions } from './Types';
import { useApp } from '../../Contexts/AppProvider';
import monthAditive from "../../assets/monthAditive.svg"

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
        <section className='adtive-section'>
            <img src={monthAditive} alt="" />
            <div className='adtive-container'>
              <span className='title-button'>escolhe o aditivo</span>
              <p>Os aditivos de hidratação e suavização<br/> alteram a textura do gloss.</p>
              <ul>
                {additiveOptions.map((a) => 
                <li key={a.id} style={{backgroundColor: a.id === aditive ? "#c41123" : ""} } onClick={() => setAditive(a.id)}>
                  <img src={a.img} alt="" />
                  <p>{a.name}</p>
                  
                </li>
                )}
              </ul>
              <button onClick={() => setStep(5)} disabled={aditive === 'none'}>Continuar</button>
              
            </div>
        </section>
        
        }

        {step === 5 && 
        <div className='taste-section'>
          <span className='title-button'>ADICIONA O AROMA E a ESSÊNCIA</span>
          
          <div className='taste-container'>
            <h3>AROMAS</h3>
            <ul>
              {smellOptions.map((s) => 
              <li key={s.id} onClick={() => setSmell(s.id)}>
                <div  style={{backgroundColor: s.id === smell ? "#c41123" : ""} }>
                  <img src={s.img} alt="" />
                </div>
                
                <p>{s.name}</p>
            
              </li>)}
            </ul>
            
            <h3>ESSÊNCIAS</h3>
            <div className='esence-container'>
                {allEsence.map((e) => 
                  <>
                    <button onClick={() => setEsence(e.id)} style={{backgroundColor: esence === e.id ? "#c41123" : ""}}>
                      <img src={e.img}/>
                      <p>{e.name}</p>
                    </button>
                  </>)}
            </div> 
          </div>
          
          <span className='span-botom'>Os aromas e essências são usados para personalizar e intensificar<br/> o sabor e a experiência dos produtos labiais personalizados.</span>
          <div className='aditive-button-container'>
            <button className='continue-button' onClick={() => setStep(6)} disabled={smell === 'none' || esence === 'none'}>
              continuar
            </button>
            <div>
              <button className='creative'>Exemplos de combinações criativas</button>
              <p>Os aromas e essências podem ser combinados entre si<br/> para criar sabores únicos e personalizados.</p>
            </div>
          </div>
          
        </div>
        }
       
    </>
  )
}

export default SmellAndAditive