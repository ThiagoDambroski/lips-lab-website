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
import glossImage from "../../assets/gloss.png";
import glossWhioutImage from "../../assets/gloss whiout.png";
import batomImage from "../../assets/batom.png";
import libsbackg from "../../assets/libs back.png";
import logoLibs from "../../assets/logo.png";
import "../../scss/CreateBatom.css";

import descVer from "../../assets/desc-ver.png";
import { useApp } from "../../Contexts/AppProvider";
import { useNavigate } from "react-router-dom";

type CreateBatomType = {
  typeInput: TypesOptions;
};

// helper type: product without null
type NonNullProduct = Exclude<productType, null>;

function CreateBatomBox({ typeInput }: CreateBatomType) {
  const [step, setStep] = useState<number>(0);
  const [newProduct, setNewProduct] = useState<productType>(null);

  const [type, setType] = useState<TypesOptions | undefined>(typeInput);
  // const [automaticChoice,setAutomaticChoice] = useState<boolean>()

  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined,
  );
  const [glitterSelected, setGlitterSelected] = useState<string>("none");
  const [baseSelected, setBaseSelected] = useState<BaseOptions>("none");
  const [smell, setSmell] = useState<SmelltOptions>("none");
  const [aditive, setAditive] = useState<AdditivesOptions>("none");
  const [esence, setEsence] = useState<EsenceOptions>("none");
  const [formula, setFormula] = useState<string>("none");
  const [boxText, setBoxText] = useState<string>("");

  const navigate = useNavigate();

  const { additiveOptions, glitterOptions, smellOptions, allEsence } = useApp();

  const handleTypeChange = (typeInput: TypesOptions) => {
    setNewProduct(null);
    setType(typeInput);
    setSelectedColor(undefined);
    setStep(0);
    setSmell("none");
    setGlitterSelected("none");
    setBaseSelected("none");
    setAditive("none");
    setEsence("none");
    setFormula("none");
    setBoxText("");
  };

  // build a product object from the current state
  const buildProductFromState = (): NonNullProduct => ({
    id: Date.now(), // simple unique id
    type: type!, // non-null, because we only use this when type is defined
    color: selectedColor,
    glitter: glitterSelected as any,
    base: baseSelected,
    smell,
    aditive,
    esence,
    formula,
    boxText,
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

  return (
    <div>
      {type === undefined && (
        <main
          style={{ backgroundImage: `url(${libsbackg})` }}
          className="main-create-box"
        >
          <div className="gloss-or-batom-container">
            <div className="gloss-or-batom-container-image">
              <img src={glossImage} />
              <button onClick={() => handleTypeChange("gloss")}>
                gloss labial
              </button>
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
          <p>
            {type} <button onClick={() => setType(undefined)}>X</button>
          </p>

          <main className="main-color-selection">
            {step <= 2 && (
              <>
                <div className="item-display">
                  <div className="item-display-container">
                    <div>
                      <h2>
                        TEU {type === "gloss" ? "GLOSS LABIAL" : "BATOM"} DOS
                        SONHOS!
                      </h2>
                      <p className="p-1">
                        Segue os passos de personalização para criar o teu{" "}
                        {type}
                      </p>
                      <img src={descVer} alt="" />
                    </div>
                    <p>
                      *As cores podem variar dependendo do tipo de ecrã Para
                      obter melhores resultados, certifique-se de que o brilho
                      do ecrã está no máximo
                    </p>
                  </div>
                  <div className="item-img-color-wrapper">
                    <div
                      className="item-color-fill"
                      style={{
                        backgroundColor: selectedColor || "transparent",
                      }}
                    />
                    <img src={glossWhioutImage} alt="" className="item-img" />
                  </div>
                </div>
              </>
            )}

            {step >= 3 && step < 8 && (
              <>
                <div className="item-display-2">
                  <div className="item-img-2-color-wrapper">
                    <div
                      className="item-color-fill item-color-fill-2"
                      style={{
                        backgroundColor: selectedColor || "transparent",
                      }}
                    />
                    <img
                      src={glossWhioutImage}
                      alt=""
                      className="item-img-2-create"
                    />
                  </div>

                  <img src={descVer} alt="" className="item-img-3" />
                </div>
              </>
            )}

            <ColorsSelection
              setSelectedColor={setSelectedColor}
              step={step}
              setStep={setStep}
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
              formula={formula}
              setFormula={setFormula}
              setBoxText={setBoxText}
            />
          </main>

          {step === 8 && (
            <div className="purchse-screen">
              <div className="purchse-screen-logo">
                <img src={logoLibs} alt="Lips Lab logo" />
                <div className="purchse-screen-logo-div">
                  <h2>
                    CRIASTE O TEU{" "}
                    {type === "gloss" ? "GLOSS LABIAL" : "BATOM"} DO ZERO!
                  </h2>
                  <p>
                    Antes de finalizar a compra, confirma se está tudo correto.
                  </p>
                </div>
                <ul>
                  <li>
                    <div
                      style={{ backgroundColor: selectedColor }}
                      onClick={() => setStep(1)}
                    />
                    <p>cor</p>
                  </li>
                  <li>
                    <div onClick={() => setStep(2)}>
                      <p>{baseSelected}</p>
                    </div>
                    <p>base</p>
                  </li>
                  <li>
                    <div onClick={() => setStep(3)}>
                      <img
                        src={
                          additiveOptions.filter((a) => a.id === aditive)[0].img
                        }
                        alt=""
                      />
                      <p>{aditive}</p>
                    </div>
                    <p>aditivo</p>
                  </li>
                  <li>
                    <div onClick={() => setStep(4)}>
                      <img
                        src={
                          glitterOptions.filter(
                            (a) => a.name === glitterSelected,
                          )[0].img
                        }
                        alt=""
                      />
                      <p>{glitterSelected}</p>
                    </div>
                    <p>pigmento</p>
                  </li>
                  <li>
                    <div onClick={() => setStep(5)}>
                      <div className="smell-esence">
                        <img
                          src={
                            smellOptions.filter((a) => a.id === smell)[0].img
                          }
                          alt=""
                        />
                        <img
                          src={
                            allEsence.filter((a) => a.id === esence)[0].img
                          }
                          alt=""
                        />
                      </div>
                      <p>
                        {smell} & {esence}
                      </p>
                    </div>
                    <p>SABOR & ESSÊNCIA</p>
                  </li>
                  <li>
                    <div onClick={() => setStep(6)}>
                      <p>{formula}</p>
                    </div>
                    <p>FÓRMULA</p>
                  </li>
                  <li>
                    <div onClick={() => setStep(7)}>
                      <p>{boxText}</p>
                    </div>
                    <p>PERSONALIZAÇÃO</p>
                  </li>
                </ul>
                <button onClick={handleFinishPurchase}>
                  <p>Conclui a tua compra</p>
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <label>color:{selectedColor}</label>
      <button disabled={step !== 7} onClick={generatedProduct}>
        Implemnt
      </button>
      {newProduct !== null && (
        <>
          seu produto:
          <span>{newProduct.color}</span>
          <div>
            <strong>Glitter:</strong> {newProduct.glitter}
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
