import { useState } from "react";
import ColorsSelection from "./ColorsSelection";
import GlitterBaseSelection from "./GlitterBaseSelection";
import type {
  AdditivesOptions,
  BaseOptions,
  EsenceOptions,
  productType,
  SmelltOptions,
  TypesOptions,
} from "./Types";
import SmellAndAditive from "./SmellAndAditive";
import FormatAndText from "./FormatAndText";
import glossImage from "../../assets/gloss online exp.svg";
import glossWhioutImage from "../../assets/gloss whiout.png";
import batomComplete from "../../assets/batomCompleteForColor.png"
import batomBaseNoTip from "../../assets/batom_base_no_tip.png";
import batomTipMaskAlpha from "../../assets/batom_tip_shading2.png";
import batomTipShading from "../../assets/batom_tip_shading2.png";

import batomTipMask from "../../assets/batomTipMask.png"
import pinkGloss from "../../assets/gloss pink.svg";
import finalBatom from "../../assets/final batom.svg"
import batomImage from "../../assets/batom final exp.svg";
import libsbackg from "../../assets/libs back.png";
import logoLibs from "../../assets/logo.png";
import "../../scss/CreateBatom.css";
import pinkArrow from "../../assets/pink go back arrow.svg"

import descVer from "../../assets/display icons exp.svg";
import { useApp } from "../../Contexts/AppProvider";
import { useNavigate } from "react-router-dom";
import sparks from "../../assets/sparks.svg";
import star from "../../assets/star.svg";
import heart from "../../assets/heart.svg";
import flower from "../../assets/flower.svg";
import lipsIcon from "../../assets/libs icon.svg";
import infinity from "../../assets/inifity.svg";
import aries from "../../assets/aries.svg";
import taurus from "../../assets/taurus.svg";
import gemini from "../../assets/gemini.svg";
import cancer from "../../assets/cancer.svg";
import leo from "../../assets/leo.svg";
import virgo from "../../assets/virgo.svg";
import libra from "../../assets/libra.svg";
import scorpio from "../../assets/scorpio.svg";
import sagittarius from "../../assets/sagittarius.svg";
import capricornio from "../../assets/capricornio.svg";
import aquarius from "../../assets/aquarius.svg";
import peixe from "../../assets/peixe.svg";


import editIcon from "../../assets/edit icon.svg"

  type SymbolOption = {
  id: string;
  img: string;
};
const SYMBOLS: SymbolOption[] = [
  { id: "sparks", img: sparks },
  { id: "star", img: star },
  { id: "heart", img: heart },
  { id: "flower", img: flower },
  { id: "lips", img: lipsIcon },
  { id: "infinity", img: infinity },
  { id: "aries", img: aries },
  { id: "taurus", img: taurus },
  { id: "gemini", img: gemini },
  { id: "cancer", img: cancer },
  { id: "leo", img: leo },
  { id: "virgo", img: virgo },
  { id: "libra", img: libra },
  { id: "scorpio", img: scorpio },
  { id: "sagittarius", img: sagittarius },
  { id: "capricornio", img: capricornio },
  { id: "aquarius", img: aquarius },
  { id: "peixes", img: peixe },
];
type CreateBatomType = {
  setCreateActive:React.Dispatch<React.SetStateAction<boolean>>
  typeInput: TypesOptions;
};

type NonNullProduct = Exclude<productType, null>;


type ProductGlitterValue = number | string | null | undefined;

function CreateBatomBox({setCreateActive, typeInput }: CreateBatomType) {

  type ColorOption = { hex: string; sub: string };

  const [paletteOptions, setPaletteOptions] = useState<ColorOption[] | null>(null);
  const [step, setStep] = useState<number>(-1);
  const [newProduct, setNewProduct] = useState<productType>(null);

  const [type, setType] = useState<TypesOptions | undefined>(typeInput);

  const [doItYourSelf, setDoItYourSelf] = useState<Boolean | undefined>(
    undefined,
  );

  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined,
  );

  const [glitterSelected, setGlitterSelected] = useState<number | null>(null);

  const [baseSelected, setBaseSelected] = useState<BaseOptions>("none");
  const [smell, setSmell] = useState<SmelltOptions>("none");
  const [aditive, setAditive] = useState<AdditivesOptions>("none");
  const [esence, setEsence] = useState<EsenceOptions>("none");
  const [boxText, setBoxText] = useState<string>("");
  const [boxImage,setBoxImage] = useState<string>("none")
  const price = 55.00

  const navigate = useNavigate();

  const { additiveOptions, glitterOptions, smellOptions, allEsence } = useApp();

  const selectedGlitterObj =
    glitterSelected !== null
      ? glitterOptions.find((g) => g.id === glitterSelected)
      : undefined;

  const handleTypeChange = (typeInput: TypesOptions) => {
    setNewProduct(null);
    setType(typeInput);
    setSelectedColor(undefined);
    setStep(0);
    setSmell("none");
    setDoItYourSelf(undefined)

    setGlitterSelected(null);

    setBaseSelected("none");
    setAditive("none");
    setEsence("none");
    setBoxText("");
    setBoxImage("none")
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  };


  const buildProductFromState = (): NonNullProduct => ({
    id: Date.now(), // simple unique id
    type: type!, // non-null, because we only use this when type is defined
    color: selectedColor,

    glitter: (glitterSelected ?? "none") as any,

    base: baseSelected,
    smell,
    aditive,
    esence,
    boxText,
    boxImage,
    price
  });

  const generatedProduct = () => {
    const product = buildProductFromState();
    setNewProduct(product);
  };

  const handleFinishPurchase = () => {
    const product = buildProductFromState();

    const stored = localStorage.getItem("lipslab_cart");
    let cart: NonNullProduct[] = [];

    if (stored) {
      try {
        cart = JSON.parse(stored) as NonNullProduct[];
      } catch (error) {
        console.error("Invalid cart data in localStorage", error);
      }
    }

    const updatedCart = [...cart, product];
    localStorage.setItem("lipslab_cart", JSON.stringify(updatedCart));

    setNewProduct(product);

    navigate("/cart");
  };

  const displayNewProductGlitter = (() => {
    if (!newProduct) return "";
    const glitterValue = (newProduct.glitter as ProductGlitterValue) ?? "none";

    if (typeof glitterValue === "number") {
      return glitterOptions.find((g) => g.id === glitterValue)?.name ?? "none";
    }

    return glitterValue;
  })();

  const goBackFunction = () => {
    if(type === undefined){
      setCreateActive(false)
    }else{
      if (step === 0) {
          setType(undefined);
          return;
        }
        setStep((prev) => Math.max(0, prev - 1));
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  return (
    <div>
      {doItYourSelf !== false && 
      <img src={pinkArrow} alt=""  className="pink-go-back-arrow" onClick={() => goBackFunction()}/>
      }
      
      {type === undefined && (
        <main
          style={{ backgroundImage: `url(${libsbackg})` }}
          className="main-create-box"
        >
          <h1>Inicia a tua experiência</h1>
          <p>escolhe o teu produto:</p>
          <div className="gloss-or-batom-container">
            <div className="gloss-or-batom-container-image">
              <img src={glossImage} />
              <button onClick={() => handleTypeChange("gloss")}>GLOSS</button>
            </div>
            <div className="gloss-or-batom-container-image">
              <img src={batomImage} alt="" />
              <button onClick={() => handleTypeChange("batom")}>Batom</button>
            </div>
          </div>
        </main>
      )}

      {type !== undefined && (
        <>
        

          {step !== 8 && <>
            <main
              className="main-color-selection"
              style={{ backgroundImage: `url(${libsbackg})` }}
            >
              <div className="main-color-back">
                {doItYourSelf === undefined && (
                  <>
                    <div className="item-display">
                      <div className="item-display-container">
                        <div>
                          <h2>
                            Prepara-te para criares o teu{" "}
                            {type === "gloss" ? "GLOSS " : "BATOM"} de sonho!
                          </h2>
                          <p className="p-1">
                            Segue os próximos passos e dá vida ao teu {type} labial.
                          </p>
                          <img src={descVer} alt="" />
                        </div>
                        <p>
                          *As cores podem variar dependendo do tipo de ecrã Para
                          obter melhores resultados, certifique-se de que o brilho
                          do ecrã está no máximo
                        </p>
                      </div>

                      <img src={ type === "gloss" ? pinkGloss : finalBatom} alt="" className="pink-gloss" />
                    </div>
                  </>
                )}

                {(step >= 0 && step < 3 || step >= 5 && step < 8) && doItYourSelf === true && (
                    <>
                      <div className="item-display-2">
                        {type === "gloss" ? (
                          <div className="item-img-2-color-wrapper">
                            <div
                              className="item-color-fill item-color-fill-2 is-tip"
                              style={{ backgroundColor: selectedColor || "transparent" }}
                            />
                            <img src={glossWhioutImage} alt="" className="item-img-2-create" />
                          </div>
                        ) : (
                          <div className="item-batom-wrapper">
                            <div
                              className="batom-color-fill"
                              style={
                                {
                                  backgroundColor: selectedColor || "transparent",
                                  ["--batomMask" as any]: `url(${batomTipMaskAlpha})`,
                                } as any
                              }
                            />

                            <img src={batomTipShading} alt="" className="batom-tip-shading" />
                            <img src={batomBaseNoTip} alt="" className="item-batom-img" />
                          </div>
                        )}
                      </div>
                    </>
                  )}



                <ColorsSelection
                  setSelectedColor={setSelectedColor}
                  currentSelectedColor={selectedColor}
                  paletteOptions={paletteOptions}
                  setPaletteOptions={setPaletteOptions}
                  step={step}
                  setStep={setStep}
                  doItYourSelf={doItYourSelf}
                  setDoItYourSelf={setDoItYourSelf}
                />


                <GlitterBaseSelection
                  step={step}
                  setStep={setStep}
                  glitterSelected={glitterSelected}
                  setGlitterSelected={setGlitterSelected}
                  type={type}
                  baseSelected={baseSelected}
                  setBaseSelected={setBaseSelected}
                />

                <SmellAndAditive
                  step={step}
                  setStep={setStep}
                  smell={smell}
                  setSmell={setSmell}
                  aditive={aditive}
                  setAditive={setAditive}
                  esence={esence}
                  setEsence={setEsence}
                />

                <FormatAndText
                  step={step}
                  setStep={setStep}
                  type={type}
                  boxText={boxText}
                  setBoxText={setBoxText}
                  boxImg={boxImage}
                  setBoxImg={setBoxImage}
                />
              </div>
            </main>
          </>}
          

          {step === 8 && (
           <div className="purchse-screen">
            <div className="purchse-screen-logo">
              <img src={logoLibs} alt="Lips Lab logo" />
              <div className="purchse-screen-logo-div">
                <h2>
                  CRIASTE O TEU próprio{" "}
                  {type === "gloss" ? "GLOSS LABIAL" : "BATOM"}!
                </h2>
                <p>Antes de adicionares ao carrinho, confirma se está tudo correto.</p>
              </div>

              <ul className="purchase-summary">
                <li>
                  <div
                    style={{ ["--swatch" as any]: selectedColor }}
                    onClick={() => {
                      setDoItYourSelf(true); 
                      setStep(0);         
                    }}
                  />

                  <p>cor</p>
                  <img src={editIcon} alt="" className="edit-icon"/>
                </li>

               <li>
                  <div onClick={() => setStep(2)}>
                    <p>{baseSelected === "none" ? "none" : baseSelected}</p>
                  </div>
                  <p>base</p>
                  <img src={editIcon} alt="" className="edit-icon"/>
                </li>

                <li>
                  <div onClick={() => setStep(3)}>
                      {aditive !== "none" ? (
                        <img
                          src={additiveOptions.find((a) => a.id === aditive)?.img}
                          alt=""
                        />
                      ) : (
                        <p>none</p>
                      )}
                    </div>
                  <p>aditivo</p>
                  <img src={editIcon} alt="" className="edit-icon"/>
                </li>

                <li>
                  <div onClick={() => setStep(4)}>
                      {selectedGlitterObj ? (
                        <img src={selectedGlitterObj.img} alt="" />
                      ) : (
                        <p>none</p>
                      )}
                    </div>
                  <p>pigmento</p>
                  <img src={editIcon} alt="" className="edit-icon"/>
                </li>

                <li>
                  <div onClick={() => setStep(5)}>
                    <div className="smell-esence">
                      {smell !== "none" ? (
                        <img
                          src={smellOptions.find((a) => a.id === smell)?.img}
                          alt=""
                        />
                      ) : (
                        <p>none</p>
                      )}
                    </div>
                  </div>

                  <p>SABOR</p>
                  <img src={editIcon} alt="" className="edit-icon"/>
                </li>

                <li onClick={() => setStep(5)}>
                  <div>
                    <div className="smell-esence">
                      {esence !== "none" ? (
                        <img
                          src={allEsence.find((a) => a.id === esence)?.img}
                          alt=""
                        />
                      ) : (
                        <p>none</p>
                      )}
                    </div>
                  </div>
                  <p>ESSÊNCIA</p>
                  <img src={editIcon} alt="" className="edit-icon"/>
                </li>

              <li>
                <div onClick={() => setStep(6)}>
                  {boxImage !== "none" && (
                    <img
                      src={SYMBOLS.find(s => s.id === boxImage)?.img}
                      alt=""
                    />
                  )}

                  {boxText.trim() !== "" && (
                    <p>{boxText.trim()}</p>
                  )}
                </div>

                <p>PERSONALIZAÇÃO</p>
                <img src={editIcon} alt="" className="edit-icon"/>
              </li>

              </ul>
              <div className="button-container">
                  <span>55,00€</span>
                  <button onClick={handleFinishPurchase}>
                    <p>ADICIONAR AO CARRINHO</p>
                  </button>
              </div>
              
            </div>
          </div>

          )}
        </>
      )}

      {newProduct !== null && (
        <>
          seu produto:
          <span>{newProduct.color}</span>
          <div>
            <strong>Glitter:</strong> {displayNewProductGlitter}
          </div>
          <div>
            <strong>Base:</strong> {newProduct.base}
          </div>
          <div>
            <strong>Smell:</strong> {newProduct.smell}
          </div>
          <div>
            <strong>Additive:</strong> {newProduct.aditive}
          </div>
          <div>
            <strong>esesnce:</strong> {newProduct.esence ?? "(none)"}
          </div>
          {newProduct.boxText}
        </>
      )}
    </div>
  );
}

export default CreateBatomBox;
