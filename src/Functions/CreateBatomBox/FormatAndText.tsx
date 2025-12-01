import React, { useState } from 'react'
import type {  TypesOptions} from './Types'

type FormatAndTextType = {
    step:number,
   
    type:TypesOptions,
    boxText:string,
    setBoxText:React.Dispatch<React.SetStateAction<string>>
}

function FormatAndText({step,type,boxText,setBoxText}:FormatAndTextType) {

    const formulaItems = [
        {
            id: "Lip Gloss",
            question: 'Lip Gloss',
            answers: 
            "Lanolin Oil, Hydroxylated Lanolin, Hydrogenated Polybutene, Cera Microcristallina (Microcrystalline Wax), Ricinus Communis (Castor) Seed Oil, Stearalkonium Hectorite, Propylene Carbonate, Ozokerite Wax, Euphorbia Cerifera (Candelilla) Wax, Copernicia Cerifera (Carnauba) Wax, Butyrospermum Parkii (Shea Butter), Simmondsia Chinensis (Jojoba) Seed Oil, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Caprylyl Glycol, Tocopherol (Vitamin E), Ascorbyl Palmitate (Vitamin C), Glycine Soja (Soybean) Oil, Aloe Barbadensis Leaf Extract.",
            
        },
        {
            id: 'Natural Lip Gloss Base',
            question: 'Natural Lip Gloss Base',
            answers: 
            'Copernicia Cerifera (Carnauba) Wax, Euphorbia Cerifera (Candelilla) Wax, Organic Butyrospermum Parkii (Shea Butter), Organic Ricinus Communis (Castor) Seed Oil, Lilium Candidum Flower Extract (White Lily), Oenothera Biennis (Evening Primrose) Oil Organic, Tocopherol (Vitamin E).',
            
        },
        {
            id: 'Lip glace',
            question: 'Lip glace',
            answers: 
            'Hydrogenated Polybutene, Caprylic/Capric Triglyceride, Vitis Vinifera (Grape) Seed Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Macadamia Ternifolia (Macadamia) Seed Oil, Caprylyl Glycol, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Tocopherol (Vitamin E).',
         
        },
        {
            id: 'Lip Gloss smoothie',
            question: 'Lip Gloss smoothie',
            answers: 
            'Hydrogenated Polybutene, Octyldodecyl Stearoyl Stearate, Ricinus Communis (Castor) Seed Oil, Cera Microcristallina (Microcrystalline Wax), Myristyl Lactate, Polyethylene, Ozokerite Wax, Caprylyl Glycol, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Tocopherol (Vitamin E), Camellia Sinensis Leaf Extract.'

        },
        {
            id:"Lip polish",
            question: 'Lip polish',
            answers: 
            'Diisostearyl Malate, Polybutene, Cera Microcristallina (Microcrystalline Wax), Bis-Diglyceryl Polyacyladipate-1, Tocopherol (Vitamin E), Caprylyl Glycol, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Tocopherol (Vitamin E).',

        },
        {
            id:"Finished Lipstick/Gloss or Liquid Matte",
            question: 'Finished Lipstick/Gloss or Liquid Matte',
            answers: 
            'May Contain (+/-): Mica (CI 77019), Titanium Dioxide (CI 77891), Iron Oxides (CI 77491, CI 77492, CI 77499), Red 7 (CI 15850), Red 6 (CI 15850), Red 27 (CI 45410), Red 21 (CI 45380), Red 30 (CI 73360), Red 36 (CI 12085), Orange 5 (CI 45370), Yellow 5 (CI 19140), Yellow 6 (CI 15985), Blue 1 (CI 42090), Carmine (CI 75470), Silica, Polyethylene Terephthalate.',
         
        },
       
    ]
    const [openFormulaId, setOpenFormulaId] = useState<string | null>(null)

    const toggleFormula = (id: string) => {
    setOpenFormulaId(prev => (prev === id ? null : id))
    }
  return (
    <>
        {step === 6 &&
            <div className='formula-section'>
                <h2>Na Lips Lab, cada fórmula começa com uma selecção rigorosa 
                de ingredientes seguros, nutritivos e de origem responsável!</h2>
                <ul className="formula-clean-list">
                    {formulaItems.map(item => {
                        const isOpen = openFormulaId === item.id

                        return (
                        <li
                            key={item.id}
                            className={`formula-clean-item ${isOpen ? "is-open" : ""}`}
                        >
                            <button
                            type="button"
                            className="formula-clean-header"
                            onClick={() => toggleFormula(item.id)}
                            >
                            <span>{item.question}</span>
                            <span className="formula-clean-toggle">+</span>
                            </button>

                            <div className={`formula-clean-body ${isOpen ? "is-open" : ""}`}>
                            <p>{item.answers}</p>
                            </div>
                        </li>
                        )
                    })}
                    </ul>
            <button className="continue-button">Continuar!</button>
        </div>
        }
        {step === 7 && 
        <div>
            <h2>Grava o teu nome, uma palavra ou símbolo.
            O toque final que torna o teu batom num 
            verdadeiro acessório de expressão pessoal!
            </h2>
            <input type="text" value={boxText} maxLength={10} onChange={(e) => setBoxText(e.target.value)}/>
        </div>
        }
    </>
  )
}

export default FormatAndText