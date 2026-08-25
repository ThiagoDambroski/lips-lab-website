import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PageSeo from "../components/PageSeo";
import glossWithoutImage from "../assets/gloss whiout.png";
import infoCircleIcon from "../assets/info circle.svg";
import batomBaseNoTip from "../assets/batom_base_no_tip.png";
import batomTipMaskAlpha from "../assets/batom_tip_shading2.png";
import batomTipShading from "../assets/batom_tip_shading2.png";
import lisaTip from "../assets/lisa tip.png";
import comeiaTip from "../assets/comeia tip.png";
import { SYMBOL_OPTIONS, type SymbolOption } from "../Functions/CreateBatomBox/constants/symbolOptions";
import { allColors, allEsence, additiveOptions, glitterOptions, smellOptions } from "../Functions/CreateBatomBox/data/builderOptions";
import type { AdditivesOptions, EsenceOptions, SmelltOptions } from "../Functions/CreateBatomBox/Types";
import { productsPageItems, PRODUCT_EXTRA_PRICE, type ProductsPageProduct, type ProductsPageProductId } from "../data/productsPageItems";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { addCartItem } from "../Cart/utils/cartStorage";
import { buildCartDescription } from "../Cart/utils/cartItems";
import { PRODUCTS_VARIANT_IDS, type ProductExtraCount } from "../config/productsShopify";
import { ROUTES } from "../config/routes";
import "../styles/products-page/index.css";

type BatomFormatOption = "liso" | "comeia";

type ProductBuilderState = {
  selectedColorHexes: string[];
  glitterIds: number[];
  isGlitterOnly: boolean;
  smell: SmelltOptions;
  essence: EsenceOptions;
  additive: AdditivesOptions;
  engraving: string;
  engravingSymbol: string;
  hasCharms: boolean;
  batomFormat: BatomFormatOption;
};

type ProductInfoCopy = {
  shortDescription: string;
  moreDescription: string;
  ingredients: string;
};

type AromaEssenceOption =
  | {
      kind: "smell";
      id: SmelltOptions;
      name: string;
      img: string;
    }
  | {
      kind: "essence";
      id: EsenceOptions;
      name: string;
      img: string;
    };

const MAX_COLOR_SELECTIONS = 4;
const MAX_GLITTER_ONLY_SELECTIONS = 3;
const MAX_ENGRAVING_LENGTH = 7;

const DEFAULT_COLOR_HEX = allColors[0]?.hex ?? "#d13c72";

const FEATURED_GLITTER_IDS = [17, 23, 21, 7, 9];
const FEATURED_SMELL_IDS: SmelltOptions[] = ["Cereja jubilee", "Pêssego"];
const FEATURED_ESSENCE_IDS: EsenceOptions[] = ["Baunilha", "Chocolate", "Cappuccino"];
const FEATURED_SYMBOL_IDS = ["heart", "star", "sparks", "flower", "infinity", "lips"];

const GLITTER_CATEGORY_DETAILS: Record<string, { title: string; lines: string[] }> = {
  Frosts: {
    title: "Frosts",
    lines: ["Cria um efeito cintilante", "Altera ligeiramente a cor final"],
  },
  "Multidimensional Frosts": {
    title: "Multidimensional Frosts",
    lines: ["Cria um efeito holográfico", "Muda conforme a luz"],
  },
  Foils: {
    title: "Foils",
    lines: ["Apenas brilho"],
  },
};

const GLITTER_CATEGORY_ORDER = ["Frosts", "Multidimensional Frosts", "Foils"];

const PRODUCT_GLITTER_LABELS: Record<number, string> = {
  7: "Diamante Rosa",
  9: "Prata",
  17: "Ouro",
  21: "Champagne",
  23: "Ouro Rosa",
};

const PRODUCT_SMELL_LABELS: Partial<Record<SmelltOptions, string>> = {
  "Cereja jubilee": "Cereja",
};

const SYMBOL_LABELS: Record<string, string> = {
  sparks: "Brilho",
  star: "Estrela",
  heart: "Coração",
  flower: "Flor",
  lips: "Lábios",
  infinity: "Infinito",
  aries: "Áries",
  taurus: "Touro",
  gemini: "Gêmeos",
  cancer: "Câncer",
  leo: "Leão",
  virgo: "Virgem",
  libra: "Libra",
  scorpio: "Escorpião",
  sagittarius: "Sagitário",
  capricornio: "Capricórnio",
  aquarius: "Aquário",
  peixes: "Peixes",
};

const getDefaultState = (): ProductBuilderState => ({
  selectedColorHexes: [DEFAULT_COLOR_HEX],
  glitterIds: [],
  isGlitterOnly: false,
  smell: "none",
  essence: "none",
  additive: "none",
  engraving: "",
  engravingSymbol: "none",
  hasCharms: false,
  batomFormat: "liso",
});

const productInfoCopy: Record<ProductsPageProductId, ProductInfoCopy> = {
  gloss: {
    shortDescription:
      "Bálsamo labial com cor, hidratante e nutritivo, com acabamento brilhante, que hidrata, suaviza e protege os lábios de forma imediata.",
    moreDescription:
      "Formulado com ceras vegetais naturais, chá verde e vitamina E, ajuda a nutrir, reparar e cuidar dos lábios, proporcionando conforto imediato e um acabamento luminoso.",
    ingredients:
      "Fórmula com ceras vegetais naturais, chá verde e vitamina E. A composição final pode variar conforme a personalização escolhida. Polibuteno hidrogenado, triglicerídeo caprílico/cáprico, óleo de semente de Vitis vinifera (uva), óleo de semente de Simmondsia chinensis (jojoba), óleo de semente de Macadamia ternifolia (macadâmia), caprilil glicol, extrato de Lonicera caprifolium (madressilva), extrato de Lonicera japonica (madressilva), tocoferol (vitamina E).",
  },
  batom: {
    shortDescription:
      "Batom labial com cor, confortável e nutritivo, com acabamento personalizado, que hidrata, suaviza e protege os lábios de forma imediata.",
    moreDescription:
      "A textura foi pensada para oferecer conforto nos lábios e um acabamento bonito, com a possibilidade de adicionar extras que tornam cada produto único.",
    ingredients:
      "Fórmula cosmética labial com ingredientes de cuidado e acabamento personalizável. A composição final pode variar conforme a personalização escolhida. Cetyl Acetate, Acetylated Lanolin Alcohol, Lanolin Oil, Euphorbia Cerifera (Candelilla) Wax, Ethylhexyl Palmitate, Ozokerite Wax, Ricinus Communis (Castor) Seed Oil, Stearalkonium Hectorite, Propylene Carbonate, Cetyl Ricinolate, Caprylic/Capric Triglyceride, Silica, Polymethyl Methacrylate, Copernicia Cerifera (Carnauba) Wax, Lanolin, Cera Microcristallina (Microcrystalline) Wax, Propylene Glycol Dicaprylate/Dicaprate, Paraffin Wax, Myristyl Lactate, Polyethylene, Caprylyl Glycol, Lonicera Caprifolium (Honeysuckle) Extract, Lonicera Japonica (Honeysuckle) Extract, Tocopherol (Vitamin E).",
  },
};

function formatPrice(value: number) {
  return `${value.toFixed(2).replace(".", ",")}€`;
}

function getGlitterDisplayName(glitter: (typeof glitterOptions)[number]) {
  return PRODUCT_GLITTER_LABELS[glitter.id] ?? glitter.name;
}

function getGlitterDisplayNameForMode(glitter: (typeof glitterOptions)[number], isGlitterOnly: boolean) {
  return isGlitterOnly ? glitter.name : getGlitterDisplayName(glitter);
}



function getSmellName(smell: SmelltOptions) {
  if (smell === "none") return undefined;

  const smellOption = smellOptions.find((item) => item.id === smell);

  return smellOption ? PRODUCT_SMELL_LABELS[smellOption.id] ?? smellOption.name : String(smell);
}

function getEssenceName(essence: EsenceOptions) {
  if (essence === "none") return undefined;
  return allEsence.find((item) => item.id === essence)?.name ?? String(essence);
}

function getAdditiveName(additive: AdditivesOptions) {
  if (additive === "none") return undefined;
  return additiveOptions.find((item) => item.id === additive)?.name ?? String(additive);
}

function getSymbolName(symbolId: string) {
  if (symbolId === "none") return undefined;
  return SYMBOL_LABELS[symbolId] ?? symbolId;
}

function getEngravingSummary(text: string, symbolId: string) {
  const engravingText = text.trim();
  const symbolName = getSymbolName(symbolId);
  const symbolSummary = symbolName ? `${symbolName} (símbolo)` : undefined;

  if (engravingText && symbolSummary) return `${engravingText} + ${symbolSummary}`;
  if (engravingText) return engravingText;
  if (symbolSummary) return symbolSummary;

  return "none";
}

function getBatomFormatName(format: BatomFormatOption) {
  return format === "comeia" ? "Colmeia" : "Liso";
}

function getSelectedColors(colorHexes: string[]) {
  const selectedColors = colorHexes
    .map((hex) => allColors.find((color) => color.hex.toLowerCase() === hex.toLowerCase()))
    .filter((color): color is (typeof allColors)[number] => Boolean(color));

  return selectedColors.length > 0 ? selectedColors : allColors.slice(0, 1);
}

function getActiveExtrasCount(state: ProductBuilderState) {
  return [
    state.glitterIds.length > 0 && !state.isGlitterOnly,
    state.smell !== "none" || state.essence !== "none",
    state.additive !== "none",
    state.engraving.trim().length > 0 || state.engravingSymbol !== "none",
    state.hasCharms,
  ].filter(Boolean).length;
}

function normalizeHexColor(hex: string) {
  const cleanHex = hex.trim().replace("#", "");

  if (cleanHex.length === 3) {
    return cleanHex
      .split("")
      .map((character) => character + character)
      .join("");
  }

  return cleanHex.padEnd(6, "0").slice(0, 6);
}

function hexToRgb(hex: string) {
  const normalizedHex = normalizeHexColor(hex);
  const numericColor = Number.parseInt(normalizedHex, 16);

  return {
    r: (numericColor >> 16) & 255,
    g: (numericColor >> 8) & 255,
    b: numericColor & 255,
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
    .join("")}`;
}

function mixHexColors(colors: string[]) {
  if (colors.length === 0) return DEFAULT_COLOR_HEX;

  const mixedColor = colors.reduce(
    (accumulator, color) => {
      const rgb = hexToRgb(color);

      return {
        r: accumulator.r + rgb.r,
        g: accumulator.g + rgb.g,
        b: accumulator.b + rgb.b,
      };
    },
    { r: 0, g: 0, b: 0 }
  );

  return rgbToHex(
    mixedColor.r / colors.length,
    mixedColor.g / colors.length,
    mixedColor.b / colors.length
  );
}

function getAromaEssenceDisplayName(smell: SmelltOptions, essence: EsenceOptions) {
  const smellName = getSmellName(smell);
  const essenceName = getEssenceName(essence);

  if (smellName && essenceName) return `Aroma: ${smellName} / Essência: ${essenceName}`;
  if (smellName) return `Aroma: ${smellName}`;
  if (essenceName) return `Essência: ${essenceName}`;

  return "none";
}

function ProductsPage() {
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState<ProductsPageProductId | null>(null);
  const [state, setState] = useState<ProductBuilderState>(() => getDefaultState());

  const selectedProduct = useMemo(() => {
    return productsPageItems.find((product) => product.id === selectedProductId) ?? null;
  }, [selectedProductId]);

  const totalPrice = useMemo(() => {
    if (!selectedProduct) return 0;
    return selectedProduct.basePrice + getActiveExtrasCount(state) * PRODUCT_EXTRA_PRICE;
  }, [selectedProduct, state]);

  const selectedGlitters = useMemo(() => {
    return state.glitterIds
      .map((glitterId) => glitterOptions.find((item) => item.id === glitterId))
      .filter((glitter): glitter is (typeof glitterOptions)[number] => Boolean(glitter));
  }, [state.glitterIds]);

  const selectedAdditive = useMemo(() => {
    return additiveOptions.find((item) => item.id === state.additive) ?? null;
  }, [state.additive]);

  const selectedColors = useMemo(() => getSelectedColors(state.selectedColorHexes), [state.selectedColorHexes]);

  useEffect(() => {
    if (state.selectedColorHexes.length > 0) return;

    setState((previousState) => ({
      ...previousState,
      selectedColorHexes: [DEFAULT_COLOR_HEX],
    }));
  }, [state.selectedColorHexes.length]);

  const handleSelectProduct = (product: ProductsPageProduct) => {
    setSelectedProductId(product.id);
    setState(getDefaultState());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateState = (partial: Partial<ProductBuilderState>) => {
    setState((previousState) => ({ ...previousState, ...partial }));
  };

  const toggleProductColor = (colorHex: string) => {
    const normalizedHex = colorHex.toLowerCase();

    setState((previousState) => {
      const currentHexes = previousState.selectedColorHexes;
      const isSelected = currentHexes.some((hex) => hex.toLowerCase() === normalizedHex);

      if (isSelected) {
        if (currentHexes.length <= 1) {
          return previousState;
        }

        return {
          ...previousState,
          selectedColorHexes: currentHexes.filter((hex) => hex.toLowerCase() !== normalizedHex),
        };
      }

      if (currentHexes.length >= MAX_COLOR_SELECTIONS) {
        return previousState;
      }

      return {
        ...previousState,
        selectedColorHexes: [...currentHexes, colorHex],
      };
    });
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const isGlitterOnly = selectedProduct.id === "gloss" && state.isGlitterOnly;

    if (isGlitterOnly && state.glitterIds.length === 0) return;

    const selectedColorNamesArray = isGlitterOnly ? ["Transparente"] : selectedColors.map((color) => color.sub);
    const selectedColorHexesArray = isGlitterOnly ? ["Transparente"] : selectedColors.map((color) => color.hex);
    const selectedGlitterNames = selectedGlitters.map((glitter) =>
      getGlitterDisplayNameForMode(glitter, isGlitterOnly)
    );
    const selectedGlitterName = selectedGlitterNames[0] ?? "Sem glitter";
    const selectedSmellName = getSmellName(state.smell) ?? "Sem aroma";
    const selectedEssenceName = getEssenceName(state.essence) ?? "Sem essência";
    const selectedAdditiveName = getAdditiveName(state.additive) ?? "Sem aditivo";
    const engravingText = state.engraving.trim() || "Sem gravação";
    const engravingSymbol = getSymbolName(state.engravingSymbol) ?? "Sem símbolo";
    const extraCount = Math.min(getActiveExtrasCount(state), 5) as ProductExtraCount;
    const details = [
      ...(selectedProduct.id === "gloss"
        ? [{ label: "Opção", value: isGlitterOnly ? "Apenas glitter" : "Com cor" }]
        : []),
      { label: "Cores", value: selectedColorNamesArray.join(", ") || "Sem cor selecionada" },
      { label: "Cores HEX", value: selectedColorHexesArray.join(", ") || "Sem cor selecionada" },
      ...(isGlitterOnly
        ? selectedGlitterNames.map((glitterName, index) => ({
            label: `Glitter ${index + 1}`,
            value: glitterName,
          }))
        : [{ label: "Glitter", value: selectedGlitterName }]),
      { label: "Aroma", value: selectedSmellName },
      { label: "Essência", value: selectedEssenceName },
      { label: "Aditivo", value: selectedAdditiveName },
      { label: "Gravação", value: engravingText },
      { label: "Símbolo", value: engravingSymbol },
      ...(selectedProduct.id === "batom"
        ? [{ label: "Formato", value: getBatomFormatName(state.batomFormat) }]
        : []),
      { label: "Charms", value: state.hasCharms ? "Sim" : "Não" },
    ];

    addCartItem({
      source: "products",
      name: selectedProduct.title,
      quantity: 1,
      unitPrice: totalPrice,
      shopifyVariantId: PRODUCTS_VARIANT_IDS[selectedProduct.id][extraCount],
      details,
      description: buildCartDescription(details),
    });

    navigate(ROUTES.cart);
  };

  return (
    <>
      <PageSeo />
      <Navbar css={1} />

      <main id="main-content" className="products-page" aria-labelledby="products-page-title">
        {!selectedProduct && <ProductSelection onSelectProduct={handleSelectProduct} />}

        {selectedProduct && (
          <ProductCustomizer
            product={selectedProduct}
            state={state}
            totalPrice={totalPrice}
            selectedGlitters={selectedGlitters}
            selectedAdditive={selectedAdditive}
            selectedColors={selectedColors}
            onBack={() => setSelectedProductId(null)}
            onUpdateState={updateState}
            onToggleColor={toggleProductColor}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>
    </>
  );
}

function ProductSelection({ onSelectProduct }: { onSelectProduct: (product: ProductsPageProduct) => void }) {
  return (
    <section className="products-page__selection" aria-labelledby="products-page-title">
      <header className="products-page__header">
        <h1 id="products-page-title" className="products-page__title">Produtos</h1>
        <span className="products-page__title-line" aria-hidden="true" />
        <p className="products-page__subtitle">Escolhe o produto que pretendes personalizar.</p>
      </header>

      <div className="products-page__grid" aria-label="Produtos Lips Lab">
        {productsPageItems.map((product) => (
          <article key={product.id} className="products-page__card" onClick={() => onSelectProduct(product)}>
            <div className="products-page__image-box">
              <img src={product.image} alt={product.imageAlt} className={`products-page__image products-page__image--${product.id}`} loading="lazy" decoding="async" />
            </div>

            <div className="products-page__content">
              <h2 className="products-page__product-title">{product.title}</h2>
              <span className="products-page__product-line" aria-hidden="true" />
              <p className="products-page__price">{formatPrice(product.basePrice).replace(",00", "")}</p>

              <button type="button" className="products-page__button">
                <span>Personalizar</span>
                <span className="products-page__button-arrow" aria-hidden="true">›</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

type ProductCustomizerProps = {
  product: ProductsPageProduct;
  state: ProductBuilderState;
  totalPrice: number;
  selectedGlitters: (typeof glitterOptions)[number][];
  selectedAdditive: (typeof additiveOptions)[number] | null;
  selectedColors: (typeof allColors)[number][];
  onBack: () => void;
  onUpdateState: (partial: Partial<ProductBuilderState>) => void;
  onToggleColor: (colorHex: string) => void;
  onAddToCart: () => void;
};

function ProductCustomizer({
  product,
  state,
  totalPrice,
  selectedGlitters,
  selectedAdditive,
  selectedColors,
  onBack,
  onUpdateState,
  onToggleColor,
  onAddToCart,
}: ProductCustomizerProps) {
  const selectedColorNames = selectedColors.map((color) => color.sub).join(", ");
  const selectedAromaEssenceName = getAromaEssenceDisplayName(state.smell, state.essence);
  const isGlitterOnly = product.id === "gloss" && state.isGlitterOnly;
  const requiresGlitterSelection = isGlitterOnly && state.glitterIds.length === 0;

  return (
    <section className="products-builder" aria-labelledby="products-builder-title">
      <button type="button" className="products-builder__back" onClick={onBack}>← Voltar aos produtos</button>

      <div className="products-builder__layout">
        <div className="products-builder__main">
          <header className="products-builder__hero products-builder__hero--without-texture">
            <div className="products-builder__hero-copy">
              <h1 id="products-builder-title" className="products-builder__title" aria-label={product.displayTitle}>
                <span className="products-builder__title-intro">Cria o teu</span>
                <span className="products-builder__title-product">{product.id === "gloss" ? "Lip Gloss" : "Batom"}</span>
                <span className="products-builder__title-script">
                  Personalizado <span className="products-builder__title-heart" aria-hidden="true">♡</span>
                </span>
              </h1>
              <p className="products-builder__description">{product.description}</p>
            </div>
          </header>

          <div className="products-summary products-summary--mobile-preview" aria-label={`Pré-visualização do ${product.title}`}>
            <ProductPreviewCard
              product={product}
              selectedColors={selectedColors}
              batomFormat={state.batomFormat}
              isGlitterOnly={isGlitterOnly}
            />
          </div>

          {product.id === "gloss" && (
            <GlossModeSelector
              isGlitterOnly={isGlitterOnly}
              onSelectColor={() =>
                onUpdateState({
                  isGlitterOnly: false,
                  glitterIds: state.glitterIds.slice(0, 1),
                })
              }
              onSelectGlitterOnly={() => onUpdateState({ isGlitterOnly: true })}
            />
          )}

          {isGlitterOnly ? (
            <GlitterOnlySelector
              selectedGlitterIds={state.glitterIds}
              onSelectGlitters={(glitterIds) => onUpdateState({ glitterIds })}
            />
          ) : (
            <section className="products-builder__accordion products-builder__accordion--always-open" aria-labelledby="products-color-title">
              <div className="products-builder__accordion-button products-builder__accordion-button--static">
                <span className="products-builder__accordion-text">
                  <strong id="products-color-title">Escolhe a cor</strong>
                  <small>{`Seleciona até ${MAX_COLOR_SELECTIONS} cores para o produto.`}</small>
                </span>
              </div>

              <div className="products-builder__panel products-builder__panel--static">
                <div className="products-builder__colors">
                  {allColors.map((color) => {
                    const isSelected = state.selectedColorHexes.some((hex) => hex.toLowerCase() === color.hex.toLowerCase());
                    const isDisabled = state.selectedColorHexes.length >= MAX_COLOR_SELECTIONS && !isSelected;

                    return (
                      <button
                        key={color.hex}
                        type="button"
                        className={`products-builder__color ${isSelected ? "products-builder__color--active" : ""}`}
                        onClick={() => onToggleColor(color.hex)}
                        aria-pressed={isSelected}
                        aria-label={`Selecionar cor ${color.sub}`}
                        disabled={isDisabled}
                      >
                        <span className="products-builder__swatch" style={{ backgroundColor: color.hex }} aria-hidden="true" />
                        <span>{color.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {product.id === "batom" && (
            <BatomTipSelector
              selectedFormat={state.batomFormat}
              onSelectFormat={(batomFormat) => onUpdateState({ batomFormat })}
            />
          )}

          <ExtrasBox state={state} hideGlitter={isGlitterOnly} onUpdateState={onUpdateState} />
        </div>

        <aside className="products-summary" aria-label="Resumo do pedido">
          <ProductPreviewCard
            product={product}
            selectedColors={selectedColors}
            batomFormat={state.batomFormat}
            isGlitterOnly={isGlitterOnly}
            className="products-summary__card--desktop-preview"
          />

          <div className="products-summary__card products-summary__card--order">
            <h2>Resumo do pedido</h2>
            <SummaryRow label={`${product.title} Base`} value={formatPrice(product.basePrice)} />
            <SummaryRow
              label={isGlitterOnly ? "Cor: Transparente" : `Cores: ${selectedColorNames || "none"}`}
              value="+0,00€"
              colors={isGlitterOnly ? undefined : selectedColors.map((color) => color.hex)}
            />
            {product.id === "batom" && <SummaryRow label={`Formato: ${getBatomFormatName(state.batomFormat)}`} value="+0,00€" />}
            <SummaryRow
              label={`${isGlitterOnly ? "Glitters" : "Glitter"}: ${
                selectedGlitters.length > 0
                  ? selectedGlitters
                      .map((glitter) => getGlitterDisplayNameForMode(glitter, isGlitterOnly))
                      .join(", ")
                  : isGlitterOnly
                    ? "Seleciona pelo menos um glitter"
                    : "none"
              }`}
              value={state.glitterIds.length > 0 && !isGlitterOnly ? `+${formatPrice(PRODUCT_EXTRA_PRICE)}` : "+0,00€"}
            />
            <SummaryRow label={`Aroma/Essência: ${selectedAromaEssenceName}`} value={state.smell !== "none" || state.essence !== "none" ? `+${formatPrice(PRODUCT_EXTRA_PRICE)}` : "+0,00€"} />
            <SummaryRow label={`Aditivo: ${selectedAdditive?.name ?? "none"}`} value={state.additive !== "none" ? `+${formatPrice(PRODUCT_EXTRA_PRICE)}` : "+0,00€"} />
            <SummaryRow label={`Gravação: ${getEngravingSummary(state.engraving, state.engravingSymbol)}`} value={state.engraving.trim() || state.engravingSymbol !== "none" ? `+${formatPrice(PRODUCT_EXTRA_PRICE)}` : "+0,00€"} />
            <SummaryRow label="Charms" value={state.hasCharms ? `+${formatPrice(PRODUCT_EXTRA_PRICE)}` : "+0,00€"} />

            <div className="products-summary__total">
              <strong>Total</strong>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <div className="products-summary__badges" aria-label="Benefícios Lips Lab">
              <span>Fórmulas premium</span>
              <span>100% personalizado</span>
              <span>Feito com amor</span>
              <span>Ingredientes de qualidade</span>
            </div>

            <button
              type="button"
              className="products-summary__cart"
              onClick={onAddToCart}
              disabled={requiresGlitterSelection}
            >
              {requiresGlitterSelection ? "Seleciona pelo menos um glitter" : "Adicionar ao carrinho"}
            </button>
            <p className="products-summary__secure">Compra 100% segura</p>
          </div>
        </aside>

        <ProductInfo product={product} />
      </div>
    </section>
  );
}

function GlossModeSelector({
  isGlitterOnly,
  onSelectColor,
  onSelectGlitterOnly,
}: {
  isGlitterOnly: boolean;
  onSelectColor: () => void;
  onSelectGlitterOnly: () => void;
}) {
  return (
    <div className="products-builder__gloss-mode" role="radiogroup" aria-label="Tipo de gloss">
      <button
        type="button"
        className={`products-builder__gloss-mode-option ${!isGlitterOnly ? "products-builder__gloss-mode-option--active" : ""}`}
        onClick={onSelectColor}
        role="radio"
        aria-checked={!isGlitterOnly}
      >
        <span className="products-builder__gloss-mode-icon products-builder__gloss-mode-icon--color" aria-hidden="true">
          <span />
        </span>
        <span className="products-builder__gloss-mode-copy">
          <strong>Com cor</strong>
          <small>Escolhe a cor do teu gloss e adiciona glitter, se quiseres.</small>
        </span>
        <span className="products-builder__gloss-mode-check" aria-hidden="true" />
      </button>

      <button
        type="button"
        className={`products-builder__gloss-mode-option ${isGlitterOnly ? "products-builder__gloss-mode-option--active" : ""}`}
        onClick={onSelectGlitterOnly}
        role="radio"
        aria-checked={isGlitterOnly}
      >
        <span className="products-builder__gloss-mode-icon products-builder__gloss-mode-icon--glitter" aria-hidden="true">
          <span />
        </span>
        <span className="products-builder__gloss-mode-copy">
          <strong>Apenas glitter</strong>
          <small>Gloss transparente com brilho.</small>
        </span>
        <span className="products-builder__gloss-mode-check" aria-hidden="true" />
      </button>
    </div>
  );
}

function GlitterOnlySelector({
  selectedGlitterIds,
  onSelectGlitters,
}: {
  selectedGlitterIds: number[];
  onSelectGlitters: (glitterIds: number[]) => void;
}) {
  const glittersByCategory = useMemo(() => {
    return GLITTER_CATEGORY_ORDER.map((category) => ({
      category,
      glitters: glitterOptions.filter((glitter) => glitter.category === category),
    }));
  }, []);

  const toggleGlitter = (glitterId: number) => {
    const isSelected = selectedGlitterIds.includes(glitterId);

    if (isSelected) {
      onSelectGlitters(selectedGlitterIds.filter((id) => id !== glitterId));
      return;
    }

    if (selectedGlitterIds.length >= MAX_GLITTER_ONLY_SELECTIONS) return;

    onSelectGlitters([...selectedGlitterIds, glitterId]);
  };

  const selectedCount = selectedGlitterIds.length;
  const isLimitReached = selectedCount >= MAX_GLITTER_ONLY_SELECTIONS;

  return (
    <section className="products-builder__glitter-only" aria-labelledby="products-glitter-only-title">
      <header className="products-builder__glitter-only-header">
        <div>
          <h2 id="products-glitter-only-title">Escolhe o glitter</h2>
          <p>Seleciona até {MAX_GLITTER_ONLY_SELECTIONS} glitters para o teu gloss transparente.</p>
        </div>
        <span className="products-builder__glitter-only-counter" aria-live="polite">
          {selectedCount}/{MAX_GLITTER_ONLY_SELECTIONS} {selectedCount === 1 ? "selecionado" : "selecionados"}
        </span>
      </header>

      <div className="products-builder__glitter-categories">
        {glittersByCategory.map(({ category, glitters }) => {
          const details = GLITTER_CATEGORY_DETAILS[category];

          return (
            <section key={category} className="products-builder__glitter-category" aria-labelledby={`products-glitter-category-${category.replaceAll(" ", "-").toLowerCase()}`}>
              <div className="products-builder__glitter-category-heading">
                <h3 id={`products-glitter-category-${category.replaceAll(" ", "-").toLowerCase()}`}>{details.title}</h3>
                <span className="products-builder__glitter-arrow" aria-hidden="true" />
                <p>
                  {details.lines.map((line) => <span key={line}>{line}</span>)}
                </p>
              </div>

              <div className="products-builder__glitter-grid">
                {glitters.map((glitter) => {
                  const isSelected = selectedGlitterIds.includes(glitter.id);
                  const isDisabled = isLimitReached && !isSelected;

                  return (
                    <button
                      key={glitter.id}
                      type="button"
                      className={`products-builder__glitter-option ${isSelected ? "products-builder__glitter-option--active" : ""}`}
                      onClick={() => toggleGlitter(glitter.id)}
                      aria-pressed={isSelected}
                      disabled={isDisabled}
                    >
                      <img src={glitter.img} alt="" loading="lazy" decoding="async" aria-hidden="true" />
                      <span>{glitter.name}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}

function BatomTipSelector({
  selectedFormat,
  onSelectFormat,
}: {
  selectedFormat: BatomFormatOption;
  onSelectFormat: (format: BatomFormatOption) => void;
}) {
  const options: { id: BatomFormatOption; label: string; image: string; imageAlt: string }[] = [
    { id: "liso", label: "Liso", image: lisaTip, imageAlt: "Molde de batom liso" },
    { id: "comeia", label: "Colmeia", image: comeiaTip, imageAlt: "Molde de batom com textura colmeia" },
  ];

  return (
    <section className="products-builder__mold" aria-labelledby="products-mold-title">
      <div className="products-builder__mold-copy">
        <div className="products-builder__mold-title-line">
          <h2 id="products-mold-title">Escolhe o formato do molde</h2>
         
        </div>
        <p>Dá um toque único ao formato da ponta do teu batom.</p>
      </div>

      <div className="products-builder__mold-options" role="radiogroup" aria-label="Formato do molde do batom">
        {options.map((option) => {
          const isSelected = selectedFormat === option.id;

          return (
            <button
              key={option.id}
              type="button"
              className={`products-builder__mold-option ${isSelected ? "products-builder__mold-option--active" : ""}`}
              onClick={() => onSelectFormat(option.id)}
              role="radio"
              aria-checked={isSelected}
            >
              <span className="products-builder__mold-check" aria-hidden="true" />
              <img src={option.image} alt={option.imageAlt} loading="lazy" decoding="async" />
              <strong>{option.label}</strong>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ExtrasBox({
  state,
  hideGlitter,
  onUpdateState,
}: {
  state: ProductBuilderState;
  hideGlitter: boolean;
  onUpdateState: (partial: Partial<ProductBuilderState>) => void;
}) {
  return (
    <section className="products-builder__extras" aria-labelledby="products-extras-title">
      <header className="products-builder__extras-header">
        <span aria-hidden="true" />
        <h2 id="products-extras-title">Extras</h2>
        <span aria-hidden="true" />
      </header>

      {!hideGlitter && (
        <ExtraRow
          title="Glitter"
          priceLabel={`+${formatPrice(PRODUCT_EXTRA_PRICE)}`}
          subtitle="Adiciona brilho ao teu gloss."
        >
          <GlitterPicker
            selectedGlitterId={state.glitterIds[0] ?? null}
            onSelectGlitter={(glitterId) => onUpdateState({ glitterIds: glitterId === null ? [] : [glitterId] })}
          />
        </ExtraRow>
      )}

      <ExtraRow
        title="Aroma e essência"
        priceLabel={`+${formatPrice(PRODUCT_EXTRA_PRICE)}`}
        subtitle="Escolhe até um aroma e uma essência."
      >
        <AromaEssencePicker
          selectedSmell={state.smell}
          selectedEssence={state.essence}
          onSelectNone={() => onUpdateState({ smell: "none", essence: "none" })}
          onSelectSmell={(smell) => onUpdateState({ smell })}
          onSelectEssence={(essence) => onUpdateState({ essence })}
        />
      </ExtraRow>

      <ExtraRow
        title="Aditivo"
        priceLabel={`+${formatPrice(PRODUCT_EXTRA_PRICE)}`}
        subtitle="Personaliza e potencia o cuidado dos teus lábios."
      >
        <div className="products-builder__extra-options" aria-label="Opções de aditivo">
          <ExtraOptionButton label="Nenhum" isSelected={state.additive === "none"} onClick={() => onUpdateState({ additive: "none" })} variant="none" />
          {additiveOptions.map((additive) => (
            <ExtraOptionButton
              key={additive.id}
              label={additive.name}
              image={additive.img}
              isSelected={state.additive === additive.id}
              onClick={() => onUpdateState({ additive: additive.id })}
            />
          ))}
        </div>
      </ExtraRow>

      <ExtraRow
        title="Gravação na embalagem"
        priceLabel={`+${formatPrice(PRODUCT_EXTRA_PRICE)}`}
        subtitle="Escreve o teu nome, iniciais ou uma palavra especial."
      >
        <div className="products-builder__engraving-group">
          <label className="products-builder__engraving-field">
            <input
              type="text"
              maxLength={MAX_ENGRAVING_LENGTH}
              value={state.engraving}
              onChange={(event) => onUpdateState({ engraving: event.target.value })}
              placeholder="Ex.: Leticia"
              aria-label="Texto para gravação na embalagem"
            />
            <span>{state.engraving.length}/{MAX_ENGRAVING_LENGTH}</span>
          </label>

          <SymbolPicker
            selectedSymbolId={state.engravingSymbol}
            onSelectSymbol={(engravingSymbol) => onUpdateState({ engravingSymbol })}
          />
        </div>
      </ExtraRow>

      <ExtraRow
        title="Charms"
        priceLabel={`+${formatPrice(PRODUCT_EXTRA_PRICE)}`}
        subtitle="Adiciona 4 charms escolhidos pela equipa Lips Lab."
      >
        <div className="products-builder__extra-options products-builder__extra-options--short" aria-label="Opções de charms">
          <ExtraOptionButton label="Nenhum" isSelected={!state.hasCharms} onClick={() => onUpdateState({ hasCharms: false })} variant="none" />
          <ExtraOptionButton label="Adicionar charms" isSelected={state.hasCharms} onClick={() => onUpdateState({ hasCharms: true })} />
        </div>
      </ExtraRow>
    </section>
  );
}

function ExtraRow({
  title,
  priceLabel,
  subtitle,
  children,
}: {
  title: string;
  priceLabel: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="products-builder__extra-row">
      <div className="products-builder__extra-copy">
        <div className="products-builder__extra-title-line">
          <h3>{title}</h3>
          <strong>{priceLabel}</strong>
        </div>
        <p>{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function GlitterPicker({
  selectedGlitterId,
  onSelectGlitter,
}: {
  selectedGlitterId: number | null;
  onSelectGlitter: (glitterId: number | null) => void;
}) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  useBodyScrollLock(isLightboxOpen, closeLightbox);
  useFocusTrap(dialogRef, isLightboxOpen, closeLightbox, closeButtonRef);

  const featuredGlitters = useMemo(() => {
    const baseGlitters = FEATURED_GLITTER_IDS
      .map((id) => glitterOptions.find((glitter) => glitter.id === id))
      .filter((glitter): glitter is (typeof glitterOptions)[number] => Boolean(glitter));

    const selectedGlitter = selectedGlitterId
      ? glitterOptions.find((glitter) => glitter.id === selectedGlitterId)
      : null;

    if (!selectedGlitter || baseGlitters.some((glitter) => glitter.id === selectedGlitter.id)) {
      return baseGlitters;
    }

    return [...baseGlitters.slice(0, 4), selectedGlitter];
  }, [selectedGlitterId]);

  const selectGlitter = (glitterId: number | null) => {
    onSelectGlitter(glitterId);
    setIsLightboxOpen(false);
  };

  const glittersByCategory = useMemo(() => {
    return glitterOptions.reduce<Record<string, typeof glitterOptions>>((groups, glitter) => {
      const category = glitter.category || "Outros";

      return {
        ...groups,
        [category]: [...(groups[category] ?? []), glitter],
      };
    }, {});
  }, []);

  return (
    <>
      <div className="products-builder__extra-options" aria-label="Opções rápidas de glitter">
        <ExtraOptionButton label="Nenhum" isSelected={selectedGlitterId === null} onClick={() => onSelectGlitter(null)} variant="none" />

        {featuredGlitters.map((glitter) => (
          <ExtraOptionButton
            key={glitter.id}
            label={getGlitterDisplayName(glitter)}
            image={glitter.img}
            isSelected={selectedGlitterId === glitter.id}
            onClick={() => onSelectGlitter(glitter.id)}
            imageVariant="glitter"
          />
        ))}

        <MoreOptionsButton onClick={() => setIsLightboxOpen(true)} />
      </div>

      {isLightboxOpen && (
        <LightboxShell
          title="Escolhe o glitter"
          labelId="products-glitter-lightbox-title"
          dialogRef={dialogRef}
          closeButtonRef={closeButtonRef}
          onClose={closeLightbox}
        >
          <button
            type="button"
            className={`products-builder__lightbox-none ${selectedGlitterId === null ? "products-builder__lightbox-none--active" : ""}`}
            onClick={() => selectGlitter(null)}
            aria-pressed={selectedGlitterId === null}
          >
            Sem glitter
          </button>

          <div className="products-builder__lightbox-content">
            {(Object.entries(glittersByCategory) as [string, typeof glitterOptions][]).map(([category, glitters]) => (
              <section key={category} className="products-builder__lightbox-category">
                <h4>{category}</h4>

                <div className="products-builder__lightbox-grid">
                  {glitters.map((glitter) => (
                    <button
                      key={glitter.id}
                      type="button"
                      className={`products-builder__lightbox-option ${selectedGlitterId === glitter.id ? "products-builder__lightbox-option--active" : ""}`}
                      onClick={() => selectGlitter(glitter.id)}
                      aria-pressed={selectedGlitterId === glitter.id}
                    >
                      <img src={glitter.img} alt="" loading="lazy" decoding="async" aria-hidden="true" />
                      <span>{getGlitterDisplayName(glitter)}</span>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </LightboxShell>
      )}
    </>
  );
}

function AromaEssencePicker({
  selectedSmell,
  selectedEssence,
  onSelectNone,
  onSelectSmell,
  onSelectEssence,
}: {
  selectedSmell: SmelltOptions;
  selectedEssence: EsenceOptions;
  onSelectNone: () => void;
  onSelectSmell: (smell: SmelltOptions) => void;
  onSelectEssence: (essence: EsenceOptions) => void;
}) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const hasNoAromaEssence = selectedSmell === "none" && selectedEssence === "none";

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  useBodyScrollLock(isLightboxOpen, closeLightbox);
  useFocusTrap(dialogRef, isLightboxOpen, closeLightbox, closeButtonRef);

  const featuredOptions = useMemo<AromaEssenceOption[]>(() => {
    const smellItems = FEATURED_SMELL_IDS
      .map((id) => smellOptions.find((smell) => smell.id === id))
      .filter((smell): smell is (typeof smellOptions)[number] => Boolean(smell))
      .map((smell) => ({ kind: "smell" as const, id: smell.id, name: getSmellName(smell.id) ?? smell.name, img: smell.img }));

    const essenceItems = FEATURED_ESSENCE_IDS
      .map((id) => allEsence.find((essence) => essence.id === id))
      .filter((essence): essence is (typeof allEsence)[number] => Boolean(essence))
      .map((essence) => ({ kind: "essence" as const, id: essence.id, name: essence.name, img: essence.img }));

    const featured = [...smellItems, ...essenceItems];
    const selectedOptions = getSelectedAromaEssenceOptions(selectedSmell, selectedEssence);
    const optionsByKey = new Map<string, AromaEssenceOption>();

    [...featured, ...selectedOptions].forEach((option) => {
      optionsByKey.set(getAromaEssenceOptionKey(option), option);
    });

    return Array.from(optionsByKey.values());
  }, [selectedEssence, selectedSmell]);

  const selectOption = (option: AromaEssenceOption) => {
    if (option.kind === "smell") {
      onSelectSmell(option.id);
      return;
    }

    onSelectEssence(option.id);
  };

  const selectNone = () => {
    onSelectNone();
  };

  return (
    <>
      <div className="products-builder__extra-options" aria-label="Opções rápidas de aroma e essência">
        <ExtraOptionButton label="Nenhum" isSelected={hasNoAromaEssence} onClick={onSelectNone} variant="none" />

        {featuredOptions.map((option) => {
          const optionKey = getAromaEssenceOptionKey(option);
          const isSelected = isAromaEssenceOptionSelected(option, selectedSmell, selectedEssence);

          return (
            <ExtraOptionButton
              key={optionKey}
              label={option.name}
              image={option.img}
              isSelected={isSelected}
              onClick={() => option.kind === "smell" ? onSelectSmell(option.id) : onSelectEssence(option.id)}
            />
          );
        })}

        <MoreOptionsButton onClick={() => setIsLightboxOpen(true)} />
      </div>

      {isLightboxOpen && (
        <LightboxShell
          title="Escolhe o aroma e a essência"
          labelId="products-aroma-lightbox-title"
          dialogRef={dialogRef}
          closeButtonRef={closeButtonRef}
          onClose={closeLightbox}
        >
          <button
            type="button"
            className={`products-builder__lightbox-none ${hasNoAromaEssence ? "products-builder__lightbox-none--active" : ""}`}
            onClick={selectNone}
            aria-pressed={hasNoAromaEssence}
          >
            Sem aroma ou essência
          </button>

          <div className="products-builder__lightbox-content">
            <section className="products-builder__lightbox-category">
              <h4>Aromas</h4>
              <div className="products-builder__lightbox-grid">
                {smellOptions.map((smell) => {
                  const option: AromaEssenceOption = { kind: "smell", id: smell.id, name: getSmellName(smell.id) ?? smell.name, img: smell.img };
                  const optionKey = getAromaEssenceOptionKey(option);
                  const isSelected = selectedSmell === smell.id;

                  return (
                    <button
                      key={optionKey}
                      type="button"
                      className={`products-builder__lightbox-option products-builder__lightbox-option--cosmetic ${isSelected ? "products-builder__lightbox-option--active" : ""}`}
                      onClick={() => selectOption(option)}
                      aria-pressed={isSelected}
                    >
                      <span className="products-builder__lightbox-image products-builder__lightbox-image--cosmetic" aria-hidden="true">
                        <img src={smell.img} alt="" loading="lazy" decoding="async" />
                      </span>
                      <span>{option.name}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="products-builder__lightbox-category">
              <h4>Essências</h4>
              <div className="products-builder__lightbox-grid">
                {allEsence.map((essence) => {
                  const option: AromaEssenceOption = { kind: "essence", id: essence.id, name: essence.name, img: essence.img };
                  const optionKey = getAromaEssenceOptionKey(option);
                  const isSelected = selectedEssence === essence.id;

                  return (
                    <button
                      key={optionKey}
                      type="button"
                      className={`products-builder__lightbox-option products-builder__lightbox-option--cosmetic ${isSelected ? "products-builder__lightbox-option--active" : ""}`}
                      onClick={() => selectOption(option)}
                      aria-pressed={isSelected}
                    >
                      <span className="products-builder__lightbox-image products-builder__lightbox-image--cosmetic" aria-hidden="true">
                        <img src={essence.img} alt="" loading="lazy" decoding="async" />
                      </span>
                      <span>{option.name}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </LightboxShell>
      )}
    </>
  );
}

function getSelectedAromaEssenceOptions(smell: SmelltOptions, essence: EsenceOptions): AromaEssenceOption[] {
  const selectedOptions: AromaEssenceOption[] = [];

  if (smell !== "none") {
    const selectedSmell = smellOptions.find((item) => item.id === smell);

    if (selectedSmell) {
      selectedOptions.push({
        kind: "smell",
        id: selectedSmell.id,
        name: getSmellName(selectedSmell.id) ?? selectedSmell.name,
        img: selectedSmell.img,
      });
    }
  }

  if (essence !== "none") {
    const selectedEssence = allEsence.find((item) => item.id === essence);

    if (selectedEssence) {
      selectedOptions.push({
        kind: "essence",
        id: selectedEssence.id,
        name: selectedEssence.name,
        img: selectedEssence.img,
      });
    }
  }

  return selectedOptions;
}

function getAromaEssenceOptionKey(option: AromaEssenceOption) {
  return `${option.kind}:${option.id}`;
}

function isAromaEssenceOptionSelected(option: AromaEssenceOption, smell: SmelltOptions, essence: EsenceOptions) {
  return option.kind === "smell" ? smell === option.id : essence === option.id;
}

function SymbolPicker({
  selectedSymbolId,
  onSelectSymbol,
}: {
  selectedSymbolId: string;
  onSelectSymbol: (symbolId: string) => void;
}) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  useBodyScrollLock(isLightboxOpen, closeLightbox);
  useFocusTrap(dialogRef, isLightboxOpen, closeLightbox, closeButtonRef);

  const featuredSymbols = useMemo(() => {
    const baseSymbols = FEATURED_SYMBOL_IDS
      .map((id) => SYMBOL_OPTIONS.find((symbol) => symbol.id === id))
      .filter((symbol): symbol is SymbolOption => Boolean(symbol));

    const selectedSymbol = selectedSymbolId !== "none"
      ? SYMBOL_OPTIONS.find((symbol) => symbol.id === selectedSymbolId)
      : null;

    if (!selectedSymbol || baseSymbols.some((symbol) => symbol.id === selectedSymbol.id)) {
      return baseSymbols;
    }

    return [...baseSymbols.slice(0, 5), selectedSymbol];
  }, [selectedSymbolId]);

  const selectSymbol = (symbolId: string) => {
    onSelectSymbol(symbolId);
    setIsLightboxOpen(false);
  };

  const toggleSymbol = (symbolId: string) => {
    onSelectSymbol(selectedSymbolId === symbolId ? "none" : symbolId);
  };

  return (
    <div className="products-builder__symbol-picker">
      <p>Escolhe um símbolo (opcional)</p>

      <div className="products-builder__extra-options products-builder__symbol-options" aria-label="Símbolos para gravação">
        {featuredSymbols.map((symbol) => (
          <ExtraOptionButton
            key={symbol.id}
            label={getSymbolName(symbol.id) ?? symbol.id}
            image={symbol.img}
            imageVariant="symbol"
            isSelected={selectedSymbolId === symbol.id}
            onClick={() => toggleSymbol(symbol.id)}
          />
        ))}

        <MoreOptionsButton onClick={() => setIsLightboxOpen(true)} />
      </div>

      {isLightboxOpen && (
        <LightboxShell
          title="Escolhe o símbolo"
          labelId="products-symbol-lightbox-title"
          dialogRef={dialogRef}
          closeButtonRef={closeButtonRef}
          onClose={closeLightbox}
        >
          <button
            type="button"
            className={`products-builder__lightbox-none ${selectedSymbolId === "none" ? "products-builder__lightbox-none--active" : ""}`}
            onClick={() => selectSymbol("none")}
            aria-pressed={selectedSymbolId === "none"}
          >
            Sem símbolo
          </button>

          <div className="products-builder__lightbox-content">
            <section className="products-builder__lightbox-category">
              <h4>Símbolos</h4>

              <div className="products-builder__lightbox-grid">
                {SYMBOL_OPTIONS.map((symbol) => (
                  <button
                    key={symbol.id}
                    type="button"
                    className={`products-builder__lightbox-option products-builder__lightbox-option--symbol ${selectedSymbolId === symbol.id ? "products-builder__lightbox-option--active" : ""}`}
                    onClick={() => selectSymbol(symbol.id)}
                    aria-pressed={selectedSymbolId === symbol.id}
                  >
                    <span className="products-builder__lightbox-image products-builder__lightbox-image--symbol" aria-hidden="true">
                      <img src={symbol.img} alt="" loading="lazy" decoding="async" />
                    </span>
                    <span>{getSymbolName(symbol.id) ?? symbol.id}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </LightboxShell>
      )}
    </div>
  );
}

function LightboxShell({
  title,
  labelId,
  dialogRef,
  closeButtonRef,
  onClose,
  children,
}: {
  title: string;
  labelId: string;
  dialogRef: RefObject<HTMLDivElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="products-builder__lightbox-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="products-builder__lightbox"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="products-builder__lightbox-header">
          <div>
            <p>Extras</p>
            <h3 id={labelId}>{title}</h3>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className="products-builder__lightbox-close"
            onClick={onClose}
            aria-label="Fechar seleção"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function ExtraOptionButton({
  label,
  image,
  variant = "default",
  imageVariant = "cosmetic",
  isSelected,
  onClick,
}: {
  label: string;
  image?: string;
  variant?: "default" | "none";
  imageVariant?: "cosmetic" | "glitter" | "symbol";
  isSelected: boolean;
  onClick: () => void;
}) {
  const className = [
    "products-builder__extra-option",
    variant === "none" ? "products-builder__extra-option--none" : "",
    imageVariant === "glitter" ? "products-builder__extra-option--glitter" : "",
    imageVariant === "symbol" ? "products-builder__extra-option--symbol" : "",
    isSelected ? "products-builder__extra-option--active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={className} onClick={onClick} aria-pressed={isSelected}>
      {variant === "none" ? (
        <span className="products-builder__extra-none-icon" aria-hidden="true" />
      ) : (
        image && (
          <span className={`products-builder__extra-image products-builder__extra-image--${imageVariant}`} aria-hidden="true">
            <img src={image} alt="" loading="lazy" decoding="async" />
          </span>
        )
      )}
      <span className="products-builder__extra-label">{label}</span>
    </button>
  );
}

function MoreOptionsButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="products-builder__extra-more"
      onClick={onClick}
      aria-haspopup="dialog"
    >
      <span aria-hidden="true">+</span>
      <strong>Ver mais</strong>
    </button>
  );
}



function ProductPreviewCard({
  product,
  selectedColors,
  batomFormat,
  isGlitterOnly,
  className = "",
}: {
  product: ProductsPageProduct;
  selectedColors: (typeof allColors)[number][];
  batomFormat: BatomFormatOption;
  isGlitterOnly: boolean;
  className?: string;
}) {
  const cardClassName = ["products-summary__card", className].filter(Boolean).join(" ");
  const selectedPreviewColor = mixHexColors(selectedColors.map((color) => color.hex));

  return (
    <div className={cardClassName}>
      <h2>O teu {product.title}</h2>
      {isGlitterOnly ? (
        <div className="products-summary__glitter-notice" role="note">
          <img src={infoCircleIcon} alt="" aria-hidden="true" />
          <div>
            <strong>O gloss será transparente.</strong>
            <p>Esta opção não dispõe de pré-visualização, uma vez que a transparência do gloss e o efeito do glitter não podem ser representados de forma real.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="products-summary__image-wrap">
            <ProductColorPreviewImage
              product={product}
              selectedColor={selectedPreviewColor}
              batomFormat={batomFormat}
            />
          </div>
          <p className="products-summary__note">A imagem é apenas uma representação do resultado.</p>
        </>
      )}
    </div>
  );
}

function ProductColorPreviewImage({
  product,
  selectedColor,
  batomFormat,
}: {
  product: ProductsPageProduct;
  selectedColor: string;
  batomFormat: BatomFormatOption;
}) {
  if (product.id === "gloss") {
    return (
      <div
        className="products-summary__color-preview products-summary__color-preview--gloss"
        aria-label={product.imageAlt}
      >
        <div
          className="products-summary__gloss-color"
          style={{ backgroundColor: selectedColor }}
          aria-hidden="true"
        />
        <img
          src={glossWithoutImage}
          alt=""
          className="products-summary__gloss-image"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <div
      className={`products-summary__color-preview products-summary__color-preview--batom products-summary__color-preview--batom-${batomFormat}`}
      aria-label={product.imageAlt}
    >
      <div
        className="products-summary__batom-color"
        style={
          {
            backgroundColor: selectedColor,
            "--productsBatomMask": `url(${batomTipMaskAlpha})`,
          } as CSSProperties
        }
        aria-hidden="true"
      />
      <img
        src={batomTipShading}
        alt=""
        className="products-summary__batom-shading"
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />
      <img
        src={batomBaseNoTip}
        alt=""
        className="products-summary__batom-image"
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />
    </div>
  );
}

function SummaryRow({ label, value, colors }: { label: string; value: string; colors?: string[] }) {
  return (
    <div className="products-summary__row">
      <span>
        {label}
        {colors?.map((color) => <i key={color} style={{ backgroundColor: color }} aria-hidden="true" />)}
      </span>
      <strong>{value}</strong>
    </div>
  );
}

function ProductInfo({ product }: { product: ProductsPageProduct }) {
  const copy = productInfoCopy[product.id];

  return (
    <section className="products-info" aria-labelledby="products-info-title">
      <h2 id="products-info-title" className="products-info__title">
        Descrição
      </h2>

      <p className="products-info__description">{copy.shortDescription}</p>

      <details className="products-info__more">
        <summary className="products-info__learn-more">Saber mais</summary>

        <div className="products-info__more-content">
          <p>{copy.moreDescription}</p>
        </div>
      </details>

      <div className="products-info__accordion">
        <details className="products-info__details">
          <summary className="products-info__summary">
            <span>Instruções de segurança</span>
            <span className="products-info__arrow" aria-hidden="true">
              ›
            </span>
          </summary>

          <div className="products-info__content">
            <p>AVISO: APENAS PARA USO EXTERNO.</p>
          </div>
        </details>

        <details className="products-info__details">
          <summary className="products-info__summary">
            <span>Dicas de utilização</span>
            <span className="products-info__arrow" aria-hidden="true">
              ›
            </span>
          </summary>

          <div className="products-info__content">
            <ul>
              <li>Aplicar generosamente nos lábios limpos e secos, sempre que necessário;</li>
              <li>Pode ser utilizado sozinho para um efeito nutritivo e acabamento natural.</li>
              <li>Pode ser aplicado antes do batom para suavizar e proteger os lábios.</li>
            </ul>

            <p>
              Para um efeito reparador intensivo e conforto prolongado, aplicar uma camada mais espessa à noite antes de deitar.
            </p>
          </div>
        </details>

        <details className="products-info__details">
          <summary className="products-info__summary">
            <span>Ingredientes</span>
            <span className="products-info__arrow" aria-hidden="true">
              ›
            </span>
          </summary>

          <div className="products-info__content">
            <p>{copy.ingredients}</p>
          </div>
        </details>
      </div>
    </section>
  );
}

export default ProductsPage;
