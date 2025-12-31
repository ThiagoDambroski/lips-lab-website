import React, { useState } from 'react'
import type { TypesOptions } from './Types'

type FormatAndTextType = {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  type: TypesOptions
  boxText: string
  setBoxText: React.Dispatch<React.SetStateAction<string>>
  
}

function FormatAndText({ step, setStep,type, boxText, setBoxText }: FormatAndTextType) {
  const formulaItemsUnfiltred = [
    {
      id: 'CLÁSSICO',
      question: 'CLÁSSICO',
      answers:
        'Lanolin Oil, Hydroxylated Lanolin, Hydrogenated Polybutene, Cera Microcristallina (Micro- crystalline Wax), Ricinus Communis (Castor) Seed Oil, Stearalkonium Hectorite, Propylene Carbonate, Ozokerite Wax, Euphorbia Cerifera (Candelilla) Wax, Copernicia Cerifera (Car- nauba) Wax, Butyrospermum Parkii (Shea Butter), Simmondsia Chinensis (Jojoba) Seed Oil, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Caprylyl Glycol, Tocopherol (Vitamin E), Ascorbyl Palmitate (Vitamin C), Glycine Soja (Soybe- an) Oil, Aloe Barbadensis Leaf Extract.',
      type:"gloss"
    },
    {
      id: 'BRILHO INTENSO',
      question: 'BRILHO INTENSO',
      answers:
        'Copernicia Cerifera (Carnauba) Wax, Euphorbia Cerifera (Candelilla) Wax, Organic Butyros- permum Parkii (Shea Butter), Organic Ricinus Communis (Castor) Seed Oil, Lilium Candidum Flower Extract (White Lily), Oenothera Biennis (Evening Primrose) Oil Organic, Tocopherol (Vitamin E).',
      type:"gloss"
    },
    {
      id: 'BÁLSAMO',
      question: 'BÁLSAMO',
      answers:
        'Hydrogenated Polybutene, Caprylic/Capric Triglyceride, Vitis Vinifera (Grape) Seed Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Macadamia Ternifolia (Macadamia) Seed Oil, Caprylyl Glycol, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysu- ckle) Extract, Tocopherol (Vitamin E).',
      type:"gloss"
    },
    {
      id: 'polish',
      question: 'polish',
      answers:
        'Hydrogenated Polybutene, Octyldodecyl Stearoyl Stearate, Ricinus Communis (Castor) Seed Oil, Cera Microcristallina (Microcrystalline Wax), Myristyl Lactate, Polyethylene, Ozokerite Wax, Caprylyl Glycol, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Ho- neysuckle) Extract, Tocopherol (Vitamin E), Camellia Sinensis Leaf Extract.',
      type:"gloss"
    },
    {
      id: 'NATURAL',
      question: 'NATURAL',
      answers:
        'Diisostearyl Malate, Polybutene, Cera Microcristallina (Microcrystalline Wax), Bis-Diglyceryl Polyacyladipate-1, Tocopherol (Vitamin E), Caprylyl Glycol, Lonicera Caprifolium (Honeysu- ckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Tocopherol (Vitamin E).',
      type:"gloss"
    },
    {
      id: 'Crème Lipstick',
      question: 'Crème Lipstick',
      answers:
        'Lanolin Oil, Cetyl Acetate, Acetylated Lanolin Alcohol, Cetyl Ricinolate, Euphorbia Cerifera (Candelilla) Wax, Propylene Glycol Dicaprylate/Dicaprate, Ethylhexyl Palmitate, Ozokerite Wax, Ricinus Communis (Castor) Seed Oil, Stearalkonium Hectorite, Propylene Carbonate, Copernicia Cerifera (Carnauba) Wax, Cera Microcristallina (Microcrystalline) Wax, Paraffin Wax, VP/Hexadecene Copolymer, Caprylyl Glycol, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Tocopherol (Vitamin E).',
      type:"batom"
    },
    {
      id: 'Long Last Matte Lipstick',
      question: 'Long Last Matte Lipstick',
      answers:
        'Cetyl Acetate, Acetylated Lanolin Alcohol, Lanolin Oil, Euphorbia Cerifera (Candelilla) Wax, Ethylhexyl Palmitate, Ozokerite Wax, Ricinus Communis (Castor) Seed Oil, Stearalkonium Hectorite, Propylene Carbonate, Cetyl Ricinolate, Caprylic/Capric Triglyceride, Silica, Polymethyl Methacrylate, Copernicia Cerifera (Carnauba) Wax, Lanolin, Cera Microcristallina (Microcrystalline) Wax, Propylene Glycol Dicaprylate/Dicaprate, Paraffin Wax, Myristyl Lactate, Polyethylene, Caprylyl Glycol, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Tocopherol (Vitamin E).',
      type:"batom"
    },
    {
      id: 'Butter Base Lipstick',
      question: 'Butter Base Lipstick',
      answers:
        'Lanolin Oil, Hydrogenated Polybutene, Cetyl Ricinoleate, Lanolin, Octyldodecyl Stearoyl Stearate, Euphorbia Cerifera (Candelilla) Wax, Ricinus Communis (Castor) Seed Oil, Stearalkonium Hectorite, Propylene Carbonate, Simmondsia Chinensis (Jojoba) Seed Oil, Cetyl Acetate, Acetylated Lanolin Alcohol, Copernicia Cerifera (Carnauba) Wax, Ethylhexyl Palmitate, Myristyl Lactate, Caprylyl Glycol, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Tocopherol (Vitamin E).',
      type:"batom"
    },
    {
      id: 'Natural Lipstick',
      question: 'Natural Lipstick',
      answers:
        'Copernicia Cerifera (Carnauba) Wax, Euphorbia Cerifera (Candelilla) Wax, Organic Butyrospermum Parkii (Shea Butter), Organic Ricinus Communis (Castor) Seed Oil, Simmondsia Chinensis (Organic Jojoba) Seed Oil, Organic Vitis Vinifera (Grape) Seed Oil, Lonicera Japonica (Japanese Honeysuckle), Lonicera Caprifolium (Honeysuckle Flower Extract), Tocopherol (Vitamin E).',
      type:"batom"
    },
    {
      id: 'Liquid Matte Lipstick',
      question: 'Liquid Matte Lipstick',
      answers:
        'Dimethicone Crosspolymer, Oryza Sativa (Rice) Bran Extract, Ricinus Communis (Castor) Seed Oil, Isododecane, Cyclopentasiloxane, Hydrogenated Polyisobutene, Rosmarinus Officinalis (Rosemary) Extract, Trimethylsiloxysilicate, Helianthus Annuus (Sunflower) Seed Extract, Silica, Aluminum Silicate, Beeswax, Polymethylsilsesquioxane, Disteardimonium Hectorite, Tocopherol (Vitamin E), Propylene Carbonate.',
      type:"batom"
    },
  ]
  const formulaItems = formulaItemsUnfiltred.filter((f) => f.type === type)
  const [openFormulaId, setOpenFormulaId] = useState<string | null>(null)

  const toggleFormula = (id: string) => {
    setOpenFormulaId(prev => (prev === id ? null : id))
    
  }

  /// nome
  type FontOption = {
    id: string
    label: string
    cssFamily: string
  }

  const FONTS: FontOption[] = [
    {
      id: 'century-gothic',
      label: 'Century Gothic',
      cssFamily: '"Century Gothic", Arial, sans-serif',
    },
    { id: 'candara', label: 'Candara', cssFamily: 'Candara, system-ui, sans-serif' },
    {
      id: 'palatino',
      label: 'Palatino Linotype',
      cssFamily: '"Palatino Linotype", "Book Antiqua", serif',
    },
    { id: 'tahoma', label: 'Tahoma', cssFamily: 'Tahoma, system-ui, sans-serif' },
    {
      id: 'lucida-sans',
      label: 'Lucida Sans Unicode',
      cssFamily: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
    },
  ]

  const SYMBOLS = [
    '★',
    '♡',
    '✿',
    '♕',
    '∞',
    '♈',
    '♉',
    '♊',
    '♋',
    '♌',
    '♍',
    '♎',
    '♏',
    '♐',
    '♑',
    '♒',
    '♓',
  ]

  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)
  const [selectedFont, setSelectedFont] = useState<FontOption>(FONTS[0])

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoxText(e.target.value)
    // if the user starts typing, “unselect” the symbol
    if (selectedSymbol) {
      setSelectedSymbol(null)
    }
  }

  const handleSymbolClick = (symbol: string) => {
    setSelectedSymbol(symbol)
    setBoxText(symbol) // put symbol in the input (optional)
  }

  const handleFontClick = (font: FontOption) => {
    setSelectedFont(font)
  }

  const canContinue = boxText.trim().length > 0

  return (
    <>
      {step === 7 && (
        <div className="formula-section">
          <h2>
            Na Lips Lab, cada fórmula começa com uma selecção rigorosa<br/> de ingredientes seguros, nutritivos e de origem responsável.
          </h2>
          <ul className="formula-clean-list">
            {formulaItems.map(item => {
              const isOpen = openFormulaId === item.id

              return (
                <li
                  key={item.id}
                  className={`formula-clean-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="formula-clean-header"
                    onClick={() => toggleFormula(item.id)}
                  >
                    <span>{item.question}</span>
                    <span className="formula-clean-toggle">+</span>
                  </button>

                  <div className={`formula-clean-body ${isOpen ? 'is-open' : ''}`}>
                    <p>{item.answers}</p>
                  </div>
                </li>
              )
            })}
          </ul>
          <button className="continue-button" onClick={() => setStep(8)}>Continuar!</button>
        </div>
      )}

      {step === 6 && (
        <section className="engraving">
          <div className="engraving-main">
            <span className='engraving-span-title'>personaliza a embalagem </span>
            <h2 className="engraving-title">
              Grava o teu nome, uma palavra ou símbolo.<br/>
              O toque  que torna o teu GLOSS único E ESPECIAL.
            </h2>

            <div className="engraving-input-wrapper">
              <input
                type="text"
                className="engraving-input"
                value={boxText}
                maxLength={10}
                placeholder="ESCREVE AQUI O QUE QUERES GRAVAR NO TEU PRODUTO!"
                onChange={handleTextChange}
                style={{ fontFamily: selectedFont.cssFamily }}
              />
              <button className="engraving-test-fonts" type="button">
                TESTA AS NOSSAS FONTES
               </button>
            </div>

            

            <p className="engraving-subtitle">OU ESCOLHE UM SÍMBOLO</p>

            <div className="engraving-symbol-list">
              {SYMBOLS.map(symbol => (
                <button
                  key={symbol}
                  type="button"
                  className={
                    'engraving-symbol' +
                    (selectedSymbol === symbol ? ' engraving-symbol--active' : '')
                  }
                  onClick={() => handleSymbolClick(symbol)}
                >
                  {symbol}
                </button>
              ))}
            </div>

            <button
              className="engraving-continue"
              type="button"
              disabled={!canContinue}
              onClick={() => setStep(7)}
            >
              CONTINUAR!
            </button>
          </div>

          <aside className="engraving-fonts">
            <h3 className="engraving-fonts-title">Escolhe a fonte</h3>
            <ul className="engraving-fonts-list">
              {FONTS.map(font => (
                <li key={font.id}>
                  <button
                    type="button"
                    className={
                      'engraving-font-item' +
                      (selectedFont.id === font.id
                        ? ' engraving-font-item--active'
                        : '')
                    }
                    style={{ fontFamily: font.cssFamily }}
                    onClick={() => handleFontClick(font)}
                  >
                    {font.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </section>
      )}
    </>
  )
}

export default FormatAndText
