import React from 'react'
import type { FormatOptions, TypesOptions} from './Types'

type FormatAndTextType = {
    step:number,
    format:FormatOptions,
    setFormat: React.Dispatch<React.SetStateAction<FormatOptions>>,
    type:TypesOptions,
    boxText:string,
    setBoxText:React.Dispatch<React.SetStateAction<string>>
}

function FormatAndText({step,format,setFormat,type,boxText,setBoxText}:FormatAndTextType) {

    const allFormat:{id:FormatOptions,name:string,description:string}[] = [
        {
            id:"classic",
            name:"Classic",
            description:"o clasico"
        },
        {
            id:"gotic",
            name:"Gotic",
            description:"o gotico"
        },
    ]

  return (
    <>
        {step === 6 && type != "gloss" &&
            <div>
            
            {allFormat.map((f) =>
            <>
                <li key={f.id} style={{backgroundColor: format === f.id ? "green" : ""}} onClick={() => setFormat(f.id)}>{f.name}</li>
            </>)}
            </div>
        }
        {step === 7 && 
        <>
            <input type="text" value={boxText} maxLength={10} onChange={(e) => setBoxText(e.target.value)}/>
        </>
        }
    </>
  )
}

export default FormatAndText