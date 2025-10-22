export interface CreateBatom {
  id: number;
  name: string;
  types: TypesForBatom[];     
  colors: ColorsForBatom[];          
  photosBatom: string[];      
  photosHuman: string[];      
  smell: string;
}

export interface BatomVariant {
  id: number;
  color: ColorsForBatom;
  smell: string;
  type: TypesForBatom;
}

export type ColorsForBatom = 'red' | "blue"
export type TypesForBatom = 'matte' | 'gloss';