import { useState } from "react"
import type { ColorsForBatom, TypesForBatom } from "./Types";
import ColorsSelection from "./ColorsSelection";



function CreateBatomBox() {

    const [newBattom,setNewBattom] = useState();
  
    const [smell,setSmell] = useState<string>();
    const [type,setType] = useState<TypesForBatom>();

  return (
    <div>
        <ColorsSelection/>
         <label>
            type:
            <select>
                <option value="matte">Matte</option>
                <option value="gloss">Gloss</option>
            </select>
        </label>
        <button>Implemnt</button>
    </div>
  )
}

export default CreateBatomBox