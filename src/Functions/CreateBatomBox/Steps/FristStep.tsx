import React from 'react'

type FristStepProps = {
    allColors:string[],
    selected:string[],
    toggleColor: (hex:string) => void

}

function FristStep({allColors,selected,toggleColor}:FristStepProps) {
  return (
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
                  border: active ? '3px solid green' : '1px solid #ccc',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
                aria-pressed={active}
                aria-label={`Select color ${c}`}
              />
            );
          })}
        </div>
  )
}

export default FristStep