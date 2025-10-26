import React, { useState } from 'react'
import type { EyeColorOptions, HairColorOptions, SkinToneOptions } from '../Types'
import { useApp } from '../../../Contexts/AppProvider'

function AutomaticColors() {

    const {eyesOptions,skinOptions,hairOptions} = useApp()

    const [internalStep,setInternalStep] = useState<number>(0)
    const [eyeColor,setEyeColor] = useState<EyeColorOptions>(undefined)
    const [skinTone,setSkinTone] = useState<SkinToneOptions>(undefined)
    const [hairColor,setHairColor] = useState<HairColorOptions>(undefined)

    const handleEyeChange = (eye:EyeColorOptions):void => {
        setEyeColor(eye)
        setInternalStep(1)

    }

    const handleSkinChange = (skin:SkinToneOptions):void => {
        setSkinTone(skin)
        setInternalStep(2)
    }

    const handleHairChange = (hair:HairColorOptions):void => {
        setHairColor(hair)
        setInternalStep(3)
    }


  return (
    <div>
        {internalStep === 0 && 
        <>
           <div>
            Olhos
            {eyesOptions.map((e) => 
            <div key={e.id} onClick={() => handleEyeChange(e.id)}>
            {e.name}
            </div>)}
            
           </div>
        </>}
        {internalStep > 0 && 
        <button onClick={() => setInternalStep(prev => prev - 1)}>Go back</button>}
        {internalStep === 1 && 
        <>
            <div>
                Peles:
                {skinOptions.map((s) => 
                <div key={s.id} onClick={() => handleSkinChange(s.id)}>
                    {s.name}
                </div>)}
            </div>
        </>}
        {internalStep === 2 && 
        <>
           <div>
                Cabelo:
                {hairOptions.map((h) => 
                <div key={h.id} onClick={() => handleHairChange(h.id)}>
                    {h.name}
                </div>)}
            </div>
        </>}

    </div>
  )
}

export default AutomaticColors