import React, { useState } from 'react'
import type { EyeColorOptions, HairColorOptions, SkinToneOptions,Palette } from '../Types'
import { useApp } from '../../../Contexts/AppProvider'
import { getPaletteFor } from './Rules'

type AutomaticColors = {
    toggleColor: (hex:string) => void,
    selected:string[],
    setSelected:React.Dispatch<React.SetStateAction<string[]>>;
}

function AutomaticColors({toggleColor,selected,setSelected}:AutomaticColors) {

    const {eyesOptions,skinOptions,hairOptions} = useApp()

    const [internalStep,setInternalStep] = useState<number>(0)
    const [eyeColor,setEyeColor] = useState<EyeColorOptions>(undefined)
    const [skinTone,setSkinTone] = useState<SkinToneOptions>(undefined)
    const [hairColor,setHairColor] = useState<HairColorOptions>(undefined)
    const [pallete,setPallete] = useState<Palette>()

    const handleEyeChange = (eye:EyeColorOptions):void => {
        setEyeColor(eye)

    }

    const handleSkinChange = (skin:SkinToneOptions):void => {
        setSkinTone(skin)
        
    }

    const handleHairChange = (hair:HairColorOptions):void => {
        setHairColor(hair)
        
    }
    
    const setLastStep = () => {
        setInternalStep(3)
        setSelected([])
        var newPalette:Palette = getPaletteFor(hairColor,skinTone,eyeColor)
        setPallete(newPalette)
        toggleColor(newPalette.primary)
    }


  return (
    <>
        {internalStep === 0 && 
        <>
            <div className='automatic-color-container'>
                <div className='automatic-color-bgk'>
                    <span>PASSO 1 DE 3</span>
                    <h2>QUAL É O TOM DA TUA PELE?</h2>
                    <p>Seleciona o tom que mais se aproxima do teu tom de pele.</p>
                    <div>
                        {skinOptions.map((s) => 
                        <img style={{backgroundColor: skinTone == s.id ? "green" : ""}} 
                        src={s.img} alt="" key={s.id} onClick={() => handleSkinChange(s.id)}/>

                        )}
                    </div>
                    <button disabled={skinTone === undefined} onClick={() => setInternalStep(1)}>CONTINUAR</button>
                </div>
                
            </div>
        </>}
        {internalStep === 1 && 
        <>
           <div className='automatic-color-container'>
            <div className='automatic-color-bgk'>
                    <span>PASSO 2 DE 3</span>
                    <h2>QUAL É A COR DOS TEUS OLHOS?</h2>
                    <p>Seleciona o tom que mais se aproxima da cor natural dos teus olhos.</p>
                    <div>
                        {eyesOptions.map((e) => 
                        <img style={{backgroundColor: eyeColor == e.id ? "green" : ""}}
                         key={e.id} onClick={() => handleEyeChange(e.id)} src={e.img}/>
                        )}
                    </div>
                    <button disabled={eyeColor === undefined} onClick={() => setInternalStep(2)}>CONTINUAR</button>
            </div>
            
           </div>
        </>}
        {internalStep > 0 && 
        <button onClick={() => setInternalStep(prev => prev - 1)}>Go back</button>}
        
        {internalStep === 2 && 
        <>
           <div className='automatic-color-container'>
                <div className='automatic-color-bgk'>
                        <span>PASSO 3 DE 3</span>
                        <h2>QUAL É A COR DO TEU CABELO?</h2>
                        <p>Seleciona o tom que mais se aproxima da cor atual do teu cabelo.</p>
                        <div>
                        {hairOptions.map((h) => 
                            <img style={{backgroundColor: hairColor== h.id ? "green" : ""}} 
                            key={h.id} onClick={() => handleHairChange(h.id)} src={h.img}/>

                        )}
                        </div>
                        <button disabled={hairColor === undefined} onClick={() => setLastStep()}>CONTINUAR</button>
                </div>
                
            </div>
        </>}
        {internalStep === 3 &&
        <>
            <div>
                {pallete?.colors.map((c) => 
                <>
                <p>{selected.includes(c) ? "Selected" : ""}</p>
                <p style={{backgroundColor: c }} onClick={() => toggleColor(c)}>{c}</p>
                </>)}
            </div>
        </>}

    </>
  )
}

export default AutomaticColors