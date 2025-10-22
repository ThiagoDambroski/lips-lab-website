import { useState } from 'react'
import type { ColorsForBatom } from './Types';

function ColorsSelection() {

    const mixColors = (...colors: string[]) => {

    if (colors.length === 0) return '#000000';

    const hexToRgb = (hex: string) => {
        const c = hex.replace('#', '');
        const bigint = parseInt(c, 16);
        return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
    };
    const rgbToHex = (r: number, g: number, b: number) =>
        '#' +
        [r, g, b]
        .map((x) => {
            const hex = Math.round(x).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        })
        .join('');
        const rgbs = colors.map(hexToRgb);
        const total = rgbs.length;
        const avg = rgbs.reduce(
            (acc, cur) => ({
            r: acc.r + cur.r / total,
            g: acc.g + cur.g / total,
            b: acc.b + cur.b / total,
            }),
            { r: 0, g: 0, b: 0 },
        );
        return rgbToHex(avg.r, avg.g, avg.b);
    };

    const allColors:string[] = ['#ff0000', '#0000ff', '#00ff00', '#ffff00', '#ff00ff', '#00ffff']
    const [selectColors,setSelectColors] = useState<string[]>([])


    const color = selectColors.length > 0 ? mixColors(...selectColors) : '#ffffffff'

    const toggleColor = (c:string) => {
        setSelectColors((prev) => 
        prev.includes(c) ? prev.filter((old) => old !== c) : prev.length < 4 ? [...prev,c] : prev)
    }
    

  return (
    <div>
        <div style={{backgroundColor:color}}>battom color</div>
        <label>
            Color:
            
            <div>
                {allColors.map((c) => 
                <div onClick={() => toggleColor(c)} style={{backgroundColor:c, border: selectColors.includes(c) ? '2px solid black' : '0px'}}>
                    a
                </div>)}
            </div>
        </label>
        <button>Next Step,implement</button>
    </div>
  )
}

export default ColorsSelection