import React, { useState } from 'react'
import type { TypesOptions } from './Types'

type FormatAndTextType = {
  step: number
  type: TypesOptions
  boxText: string
  setBoxText: React.Dispatch<React.SetStateAction<string>>
}

function FormatAndText({ step, type, boxText, setBoxText }: FormatAndTextType) {
  const formulaItems = [
    {
      id: 'Lip Gloss',
      question: 'Lip Gloss',
      answers:
        'Lanolin Oil, Hydroxylated Lanolin, Hydrogenated Polybutene, Cera Microcristallina (Microcrystalline Wax), Ricinus Communis (Castor) Seed Oil, Stearalkonium Hectorite, Propylene Carbonate, Ozokerite Wax, Euphorbia Cerifera (Candelilla) Wax, Copernicia Cerifera (Carnauba) Wax, Butyrospermum Parkii (Shea Butter), Simmondsia Chinensis (Jojoba) Seed Oil, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Caprylyl Glycol, Tocopherol (Vitamin E), Ascorbyl Palmitate (Vitamin C), Glycine Soja (Soybean) Oil, Aloe Barbadensis Leaf Extract.',
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
        'Hydrogenated Polybutene, Octyldodecyl Stearoyl Stearate, Ricinus Communis (Castor) Seed Oil, Cera Microcristallina (Microcrystalline Wax), Myristyl Lactate, Polyethylene, Ozokerite Wax, Caprylyl Glycol, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Tocopherol (Vitamin E), Camellia Sinensis Leaf Extract.',
    },
    {
      id: 'Lip polish',
      question: 'Lip polish',
      answers:
        'Diisostearyl Malate, Polybutene, Cera Microcristallina (Microcrystalline Wax), Bis-Diglyceryl Polyacyladipate-1, Tocopherol (Vitamin E), Caprylyl Glycol, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Tocopherol (Vitamin E).',
    },
    {
      id: 'Finished Lipstick/Gloss or Liquid Matte',
      question: 'Finished Lipstick/Gloss or Liquid Matte',
      answers:
        'May Contain (+/-): Mica (CI 77019), Titanium Dioxide (CI 77891), Iron Oxides (CI 77491, CI 77492, CI 77499), Red 7 (CI 15850), Red 6 (CI 15850), Red 27 (CI 45410), Red 21 (CI 45380), Red 30 (CI 73360), Red 36 (CI 12085), Orange 5 (CI 45370), Yellow 5 (CI 19140), Yellow 6 (CI 15985), Blue 1 (CI 42090), Carmine (CI 75470), Silica, Polyethylene Terephthalate.',
    },
  ]

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
      {step === 6 && (
        <div className="formula-section">
          <h2>
            Na Lips Lab, cada fórmula começa com uma selecção rigorosa de
            ingredientes seguros, nutritivos e de origem responsável!
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
          <button className="continue-button">Continuar!</button>
        </div>
      )}

      {step === 7 && (
        <section className="engraving">
          <div className="engraving-main">
            <h2 className="engraving-title">
              Grava o teu nome, uma palavra ou símbolo. <br />
              O toque final que torna o teu batom num <br />
              verdadeiro acessório de expressão pessoal!
            </h2>

            <div className="engraving-input-wrapper">
              <input
                type="text"
                className="engraving-input"
                value={boxText}
                maxLength={10}
                placeholder="Escreve aqui o que queres gravar"
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
