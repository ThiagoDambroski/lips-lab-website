import React, { useMemo, useState, type ChangeEvent } from 'react';

type ColorsSelectionProps = {
  setSelectedColor: React.Dispatch<React.SetStateAction<string | undefined>>;
};

function ColorsSelection({setSelectedColor}:ColorsSelectionProps) {
 
  const allColors: string[] = ['#ff0000', '#0000ff', '#00ff00', '#ffff00', '#ff00ff', '#00ffff'];
  const [step, setStep] = useState<number>(0);
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

  
  const onWeightChange = (hex: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(100, Number(e.target.value) || 0));
    setWeights((w) => ({ ...w, [hex]: value }));
  };

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

  const mixedColor = useMemo(() => {
    if (selected.length === 0) return '#ffffff';
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

      <div
        style={{
          width: '100%',
          height: 120,
          borderRadius: 12,
          border: '1px solid #ccc',
          backgroundColor: mixedColor,
          marginBottom: 16,
        }}
        aria-label="Mixed color preview"
      />

      
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setStep(0)} disabled={step === 0}>
          Step 0 – Choose colors
        </button>
        <button onClick={() => setStep(1)} disabled={selected.length === 0 || step === 1}>
          Step 1 – Adjust intensities
        </button>
      </div>

      
      {step === 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {allColors.map((c) => {
            const active = selected.includes(c);
            return (
              <button
                key={c}
                onClick={() => toggleColor(c)}
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: c,
                  border: active ? '3px solid black' : '1px solid #ccc',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
                aria-pressed={active}
                aria-label={`Select color ${c}`}
              />
            );
          })}
        </div>
      )}

      {step === 1 && (
        <div style={{ display: 'grid', gap: 12 }}>
          {selected.map((c) => (
            <div key={c} style={{ display: 'grid', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: c,
                    border: '1px solid #ccc',
                    borderRadius: 6,
                  }}
                  aria-label={`Swatch ${c}`}
                />
                
                <span style={{ marginLeft: 'auto' }}>{weights[c] ?? 0}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={weights[c] ?? 0}
                onChange={onWeightChange(c)}
                aria-label={`Intensity for ${c}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ColorsSelection;
