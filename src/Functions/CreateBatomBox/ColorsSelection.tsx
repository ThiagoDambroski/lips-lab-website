import React, { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import FristStep from './Steps/FristStep';
import SecondStep from './Steps/SecondStep';

type ColorsSelectionProps = {
  setSelectedColor: React.Dispatch<React.SetStateAction<string | undefined>>,
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

function ColorsSelection({setSelectedColor,step,setStep}:ColorsSelectionProps) {
 
  const allColors: string[] = ['#4D1D25', '#D13C72', '#9B243C', 
    '#6D1718', '#E85D70', '#A42324','#C23210','#DF4728','#E8CA6C','#AA1B11',
    '#6F2C16','#D3571C','#4B301B','#53150B','#4E3320','#130201','#0D2B4A',
    '#C96D10','#B48A22','#0A0A4D','#FCFBF9'];

  const [selected, setSelected] = useState<string[]>([]);
  const [weights, setWeights] = useState<Record<string, number>>({});

  


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
    <div >

      

      
      {step === 0 && (
        <FristStep
        allColors={allColors}
        selected={selected}
        toggleColor={toggleColor}
        />
      )}

      {step === 1 && (
        <SecondStep
          selected={selected}
          weights={weights}
          setWeights={setWeights}
          toggleColor={toggleColor}
        />
      )}

      

    </div>
  );
}

export default ColorsSelection;
