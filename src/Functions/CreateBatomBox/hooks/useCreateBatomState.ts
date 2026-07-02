import { useCallback, useState, type Dispatch, type SetStateAction } from "react";
import type {
  AdditivesOptions,
  BaseOptions,
  EsenceOptions,
  SmelltOptions,
  TypesOptions,
} from "../Types";
import { DEFAULT_BOX_FONT } from "../constants/productConfig";
import type { ColorOption } from "../utils/colorSelection";

export type CreateBatomState = {
  paletteOptions: ColorOption[] | null;
  step: number;
  type: TypesOptions;
  doItYourSelf: boolean | undefined;
  selectedColor: string | undefined;
  mixSelected: string[];
  mixWeights: Record<string, number>;
  glitterSelected: number | null;
  baseSelected: BaseOptions;
  smell: SmelltOptions;
  aditive: AdditivesOptions[];
  esence: EsenceOptions;
  boxText: string;
  boxFont: string;
  boxImage: string;
  batomFormat: string;
};

export type CreateBatomActions = {
  setPaletteOptions: Dispatch<SetStateAction<ColorOption[] | null>>;
  setStep: Dispatch<SetStateAction<number>>;
  setType: Dispatch<SetStateAction<TypesOptions>>;
  setDoItYourSelf: Dispatch<SetStateAction<boolean | undefined>>;
  setSelectedColor: Dispatch<SetStateAction<string | undefined>>;
  setMixSelected: Dispatch<SetStateAction<string[]>>;
  setMixWeights: Dispatch<SetStateAction<Record<string, number>>>;
  setGlitterSelected: Dispatch<SetStateAction<number | null>>;
  setBaseSelected: Dispatch<SetStateAction<BaseOptions>>;
  setSmell: Dispatch<SetStateAction<SmelltOptions>>;
  setAditive: Dispatch<SetStateAction<AdditivesOptions[]>>;
  setEsence: Dispatch<SetStateAction<EsenceOptions>>;
  setBoxText: Dispatch<SetStateAction<string>>;
  setBoxFont: Dispatch<SetStateAction<string>>;
  setBoxImage: Dispatch<SetStateAction<string>>;
  setBatomFormat: Dispatch<SetStateAction<string>>;
  resetProductState: (nextType?: TypesOptions) => void;
};

export function useCreateBatomState(typeInput: TypesOptions): {
  state: CreateBatomState;
  actions: CreateBatomActions;
} {
  const [paletteOptions, setPaletteOptions] = useState<ColorOption[] | null>(null);
  const [step, setStep] = useState<number>(-1);
  const [type, setType] = useState<TypesOptions>(typeInput);
  const [doItYourSelf, setDoItYourSelf] = useState<boolean | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [mixSelected, setMixSelected] = useState<string[]>([]);
  const [mixWeights, setMixWeights] = useState<Record<string, number>>({});
  const [glitterSelected, setGlitterSelected] = useState<number | null>(null);
  const [baseSelected, setBaseSelected] = useState<BaseOptions>("none");
  const [smell, setSmell] = useState<SmelltOptions>("none");
  const [aditive, setAditive] = useState<AdditivesOptions[]>([]);
  const [esence, setEsence] = useState<EsenceOptions>("none");
  const [boxText, setBoxText] = useState<string>("");
  const [boxFont, setBoxFont] = useState<string>(DEFAULT_BOX_FONT);
  const [boxImage, setBoxImage] = useState<string>("none");
  const [batomFormat, setBatomFormat] = useState<string>("");

  const resetProductState = useCallback((nextType?: TypesOptions) => {
    setType(nextType);
    setSelectedColor(undefined);
    setStep(-1);
    setSmell("none");
    setDoItYourSelf(undefined);
    setGlitterSelected(null);
    setBaseSelected("none");
    setAditive([]);
    setEsence("none");
    setBoxText("");
    setBoxFont(DEFAULT_BOX_FONT);
    setBoxImage("none");
    setBatomFormat("");
    setMixSelected([]);
    setMixWeights({});
    setPaletteOptions(null);
  }, []);

  return {
    state: {
      paletteOptions,
      step,
      type,
      doItYourSelf,
      selectedColor,
      mixSelected,
      mixWeights,
      glitterSelected,
      baseSelected,
      smell,
      aditive,
      esence,
      boxText,
      boxFont,
      boxImage,
      batomFormat,
    },
    actions: {
      setPaletteOptions,
      setStep,
      setType,
      setDoItYourSelf,
      setSelectedColor,
      setMixSelected,
      setMixWeights,
      setGlitterSelected,
      setBaseSelected,
      setSmell,
      setAditive,
      setEsence,
      setBoxText,
      setBoxFont,
      setBoxImage,
      setBatomFormat,
      resetProductState,
    },
  };
}
