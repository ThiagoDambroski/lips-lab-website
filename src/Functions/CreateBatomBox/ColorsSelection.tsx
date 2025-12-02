import React, { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import FristStep from './Steps/FristStep';
import SecondStep from './Steps/SecondStep';
import { useApp } from '../../Contexts/AppProvider';
import AutomaticColors from './automatic/AutomaticColors';

import virtual from "../../assets/virutal as.png"
import cloud from "../../assets/cloud pens.png"
import "../../scss/CreateBatom.css"

type ColorsSelectionProps = {
  setSelectedColor: React.Dispatch<React.SetStateAction<string | undefined>>,
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

function ColorsSelection({setSelectedColor,step,setStep}:ColorsSelectionProps) {
 


  const {allColors} = useApp()

  const [selected, setSelected] = useState<string[]>([]);
  const [weights, setWeights] = useState<Record<string, number>>({});
  const [doItYourSelf,setDoItYourSelf] = useState<Boolean | undefined>()

  


  const toggleColor = (hex: string) => {
    setSelected((prev) => {
      if (prev.includes(hex)) {
        
        setWeights((w) => {
          const { [hex]: _, ...rest } = w;
          return rest;
        });
        return prev.filter((c) => c !== hex);
      }
      if (prev.length >= 4) return prev; // limit 4
      
      setWeights((w) => ({ ...w, [hex]: 100 }));
      return [...prev, hex];
    });
   
  };

  useEffect(() => {
  if (selected.length === 0) setStep(0);
  }, [selected.length]);

  
 

  const hexToRgb = (hex: string) => {
    const c = hex.replace('#', '');
    const bigint = parseInt(c, 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  };

  const rgbToHex = (r: number, g: number, b: number) =>
    '#' +
    [r, g, b]
      .map((x) => {
        const h = Math.round(x).toString(16);
        return h.length === 1 ? '0' + h : h;
      })
      .join('');

  useMemo(() => {
    if (selected.length === 0) {
      setSelectedColor('#ffffff')
      return '#ffffff'
    };
    const raw = selected.map((hex) => ({ hex, w: weights[hex] ?? 0 }));
    const sum = raw.reduce((acc, { w }) => acc + w, 0);
    const normalized = sum > 0 ? raw.map((x) => ({ ...x, w: x.w / sum })) : raw.map((x) => ({ ...x, w: 1 / raw.length }));

    const acc = normalized.reduce(
      (a, { hex, w }) => {
        const { r, g, b } = hexToRgb(hex);
        a.r += r * w;
        a.g += g * w;
        a.b += b * w;
        return a;
      },
      { r: 0, g: 0, b: 0 }
    );
    setSelectedColor(rgbToHex(acc.r, acc.g, acc.b))
    return rgbToHex(acc.r, acc.g, acc.b);
  }, [selected, weights]);

  return (
    <>
      
      {doItYourSelf === undefined &&
        <div className='main-color-selection-options'>
          <h3>Escolhe como vais viver a experiência lips lab!</h3>
          <div>
            <button onClick={() => setDoItYourSelf(false)}>
              <img src={virtual} alt="" />
              assistência virtual
            </button>
            <button onClick={() => setDoItYourSelf(true)}>
              <img src={cloud} alt="" />
            cria a partir do zero
            </button>
            
          </div>          
          
        </div>
        
      }
      
      {doItYourSelf === true &&
      <>
        {step === 0 && (
          <FristStep
          allColors={allColors}
          selected={selected}
          toggleColor={toggleColor}
          setStep = {setStep}
          />
        )}

        {step === 1 && (
          <SecondStep
            selected={selected}
            weights={weights}
            setWeights={setWeights}
            toggleColor={toggleColor}
            setStep = {setStep}
          />
        )}

      </>}
      {doItYourSelf === false && 
        <>
          <AutomaticColors toggleColor={toggleColor} selected = {selected} setSelected={setSelected}/>
        </>
      }
      
      
      

    </>
  );
}

export default ColorsSelection;
