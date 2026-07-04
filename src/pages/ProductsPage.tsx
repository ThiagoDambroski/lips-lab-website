import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import Navbar from "../Navbar/Navbar";
import PageSeo from "../components/PageSeo";
import { SYMBOL_OPTIONS, type SymbolOption } from "../Functions/CreateBatomBox/constants/symbolOptions";
import { allColors, allEsence, additiveOptions, glitterOptions, smellOptions } from "../Functions/CreateBatomBox/data/builderOptions";
import type { AdditivesOptions, EsenceOptions, SmelltOptions } from "../Functions/CreateBatomBox/Types";
import { productsPageItems, PRODUCT_EXTRA_PRICE, type ProductsPageProduct, type ProductsPageProductId } from "../data/productsPageItems";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { buildProductsCartUrl } from "../utils/productsShopifyCart";
import "../styles/products-page/index.css";

type ProductBuilderState = {
  selectedColorHexes: string[];
  glitterId: number | null;
  smell: SmelltOptions;
  essence: EsenceOptions;
  additive: AdditivesOptions;
  engraving: string;
  engravingSymbol: string;
  hasCharms: boolean;
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
const MAX_ENGRAVING_LENGTH = 12;

const DEFAULT_COLOR_HEX = allColors[0]?.hex ?? "#d13c72";

const FEATURED_GLITTER_IDS = [17, 23, 21, 7, 9];
const FEATURED_SMELL_IDS: SmelltOptions[] = ["Cereja jubilee", "Pêssego"];
const FEATURED_ESSENCE_IDS: EsenceOptions[] = ["Baunilha", "Chocolate", "Cappuccino"];
const FEATURED_SYMBOL_IDS = ["heart", "star", "sparks", "flower", "infinity", "lips"];

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
  glitterId: null,
  smell: "none",
  essence: "none",
  additive: "none",
  engraving: "",
  engravingSymbol: "none",
  hasCharms: false,
});

const productInfoCopy: Record<ProductsPageProductId, ProductInfoCopy> = {
  gloss: {
    shortDescription:
      "Bálsamo labial com cor, hidratante e nutritivo, com acabamento brilhante, que hidrata, suaviza e protege os lábios de forma imediata.",
    moreDescription:
      "Formulado com ceras vegetais naturais, chá verde e vitamina E, ajuda a nutrir, reparar e cuidar dos lábios, proporcionando conforto imediato e um acabamento luminoso.",
    ingredients:
      "Fórmula com ceras vegetais naturais, chá verde e vitamina E. A composição final pode variar conforme a personalização escolhida.",
  },
  batom: {
    shortDescription:
      "Batom labial com cor, confortável e nutritivo, com acabamento personalizado, que hidrata, suaviza e protege os lábios de forma imediata.",
    moreDescription:
      "A textura foi pensada para oferecer conforto nos lábios e um acabamento bonito, com a possibilidade de adicionar extras que tornam cada produto único.",
    ingredients:
      "Fórmula cosmética labial com ingredientes de cuidado e acabamento personalizável. A composição final pode variar conforme a personalização escolhida.",
  },
};

function formatPrice(value: number) {
  return `${value.toFixed(2).replace(".", ",")}€`;
}

function getGlitterDisplayName(glitter: (typeof glitterOptions)[number]) {
  return PRODUCT_GLITTER_LABELS[glitter.id] ?? glitter.name;
}

function getGlitterName(glitterId: number | null) {
  if (!glitterId) return "none";

  const glitter = glitterOptions.find((item) => item.id === glitterId);

  return glitter ? getGlitterDisplayName(glitter) : String(glitterId);
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

  if (engravingText && symbolName) return `${engravingText} + ${symbolName}`;
  if (engravingText) return engravingText;
  if (symbolName) return symbolName;

  return "none";
}

function getSelectedColors(colorHexes: string[]) {
  const selectedColors = colorHexes
    .map((hex) => allColors.find((color) => color.hex.toLowerCase() === hex.toLowerCase()))
    .filter((color): color is (typeof allColors)[number] => Boolean(color));

  return selectedColors.length > 0 ? selectedColors : allColors.slice(0, 1);
}

function getActiveExtrasCount(state: ProductBuilderState) {
  return [
    state.glitterId !== null,
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

function getAromaEssenceKey(smell: SmelltOptions, essence: EsenceOptions) {
  if (smell !== "none") return `smell:${smell}`;
  if (essence !== "none") return `essence:${essence}`;
  return "none";
}

function getAromaEssenceDisplayName(smell: SmelltOptions, essence: EsenceOptions) {
  return getSmellName(smell) ?? getEssenceName(essence) ?? "none";
}

function ProductsPage() {
  const [selectedProductId, setSelectedProductId] = useState<ProductsPageProductId | null>(null);
  const [state, setState] = useState<ProductBuilderState>(() => getDefaultState());

  const selectedProduct = useMemo(() => {
    return productsPageItems.find((product) => product.id === selectedProductId) ?? null;
  }, [selectedProductId]);

  const totalPrice = useMemo(() => {
    if (!selectedProduct) return 0;
    return selectedProduct.basePrice + getActiveExtrasCount(state) * PRODUCT_EXTRA_PRICE;
  }, [selectedProduct, state]);

  const selectedGlitter = useMemo(() => {
    return glitterOptions.find((item) => item.id === state.glitterId) ?? null;
  }, [state.glitterId]);

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

    const selectedColorNamesArray = selectedColors.map((color) => color.sub);
    const selectedColorHexesArray = selectedColors.map((color) => color.hex);
    const selectedGlitterName = state.glitterId ? getGlitterName(state.glitterId) : undefined;
    const selectedSmellName = getSmellName(state.smell);
    const selectedEssenceName = getEssenceName(state.essence);
    const selectedAdditiveName = getAdditiveName(state.additive);

    if (selectedProduct.id !== "gloss" && selectedProduct.id !== "batom") return;

    const cartUrl = buildProductsCartUrl({
      productType: selectedProduct.id,
      selectedColors: selectedColorNamesArray,
      selectedColorHexes: selectedColorHexesArray,
      glitter: selectedGlitterName,
      aroma: selectedSmellName,
      essence: selectedEssenceName,
      additive: selectedAdditiveName,
      engravingText: state.engraving,
      engravingSymbol: getSymbolName(state.engravingSymbol),
      hasCharms: state.hasCharms,
      totalPrice,
    });

    window.location.href = cartUrl;
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
            selectedGlitter={selectedGlitter}
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
  selectedGlitter: (typeof glitterOptions)[number] | null;
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
  selectedGlitter,
  selectedAdditive,
  selectedColors,
  onBack,
  onUpdateState,
  onToggleColor,
  onAddToCart,
}: ProductCustomizerProps) {
  const selectedColorNames = selectedColors.map((color) => color.sub).join(", ");
  const selectedAromaEssenceName = getAromaEssenceDisplayName(state.smell, state.essence);

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
            <ProductPreviewCard product={product} />
          </div>

          <section className="products-builder__accordion products-builder__accordion--always-open" aria-labelledby="products-color-title">
            <div className="products-builder__accordion-button products-builder__accordion-button--static">
              <span className="products-builder__accordion-text">
                <strong id="products-color-title">Escolhe a cor</strong>
                <small>{`Seleciona até ${MAX_COLOR_SELECTIONS} cores para o produto.`}</small>
              </span>
              <ColorCombinationPreview colors={selectedColors.map((color) => color.hex)} />
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

          <ExtrasBox state={state} onUpdateState={onUpdateState} />
        </div>

        <aside className="products-summary" aria-label="Resumo do pedido">
          <ProductPreviewCard product={product} className="products-summary__card--desktop-preview" />

          <div className="products-summary__card products-summary__card--order">
            <h2>Resumo do pedido</h2>
            <SummaryRow label={`${product.title} Base`} value={formatPrice(product.basePrice)} />
            <SummaryRow label={`Cores: ${selectedColorNames || "none"}`} value="+0,00€" colors={selectedColors.map((color) => color.hex)} />
            <SummaryRow label={`Glitter: ${selectedGlitter ? getGlitterDisplayName(selectedGlitter) : "none"}`} value={state.glitterId ? `+${formatPrice(PRODUCT_EXTRA_PRICE)}` : "+0,00€"} />
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

            <button type="button" className="products-summary__cart" onClick={onAddToCart}>Adicionar ao carrinho</button>
            <p className="products-summary__secure">Compra 100% segura</p>
          </div>
        </aside>

        <ProductInfo product={product} />
      </div>
    </section>
  );
}

function ExtrasBox({
  state,
  onUpdateState,
}: {
  state: ProductBuilderState;
  onUpdateState: (partial: Partial<ProductBuilderState>) => void;
}) {
  return (
    <section className="products-builder__extras" aria-labelledby="products-extras-title">
      <header className="products-builder__extras-header">
        <span aria-hidden="true" />
        <h2 id="products-extras-title">Extras</h2>
        <span aria-hidden="true" />
      </header>

      <ExtraRow
        title="Glitter"
        priceLabel={`+${formatPrice(PRODUCT_EXTRA_PRICE)}`}
        subtitle="Adiciona brilho ao teu gloss."
      >
        <GlitterPicker
          selectedGlitterId={state.glitterId}
          onSelectGlitter={(glitterId) => onUpdateState({ glitterId })}
        />
      </ExtraRow>

      <ExtraRow
        title="Aroma ou essência"
        priceLabel={`+${formatPrice(PRODUCT_EXTRA_PRICE)}`}
        subtitle="Escolhe o aroma que mais gostas."
      >
        <AromaEssencePicker
          selectedSmell={state.smell}
          selectedEssence={state.essence}
          onSelectNone={() => onUpdateState({ smell: "none", essence: "none" })}
          onSelectSmell={(smell) => onUpdateState({ smell, essence: "none" })}
          onSelectEssence={(essence) => onUpdateState({ smell: "none", essence })}
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
  const selectedKey = getAromaEssenceKey(selectedSmell, selectedEssence);

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
    const selectedOption = getSelectedAromaEssenceOption(selectedSmell, selectedEssence);

    if (!selectedOption || featured.some((option) => getAromaEssenceOptionKey(option) === getAromaEssenceOptionKey(selectedOption))) {
      return featured;
    }

    return [...featured.slice(0, 4), selectedOption];
  }, [selectedEssence, selectedSmell]);

  const selectOption = (option: AromaEssenceOption) => {
    if (option.kind === "smell") {
      onSelectSmell(option.id);
    } else {
      onSelectEssence(option.id);
    }

    setIsLightboxOpen(false);
  };

  const selectNone = () => {
    onSelectNone();
    setIsLightboxOpen(false);
  };

  return (
    <>
      <div className="products-builder__extra-options" aria-label="Opções rápidas de aroma ou essência">
        <ExtraOptionButton label="Nenhum" isSelected={selectedKey === "none"} onClick={onSelectNone} variant="none" />

        {featuredOptions.map((option) => {
          const optionKey = getAromaEssenceOptionKey(option);

          return (
            <ExtraOptionButton
              key={optionKey}
              label={option.name}
              image={option.img}
              isSelected={selectedKey === optionKey}
              onClick={() => option.kind === "smell" ? onSelectSmell(option.id) : onSelectEssence(option.id)}
            />
          );
        })}

        <MoreOptionsButton onClick={() => setIsLightboxOpen(true)} />
      </div>

      {isLightboxOpen && (
        <LightboxShell
          title="Escolhe o aroma ou essência"
          labelId="products-aroma-lightbox-title"
          dialogRef={dialogRef}
          closeButtonRef={closeButtonRef}
          onClose={closeLightbox}
        >
          <button
            type="button"
            className={`products-builder__lightbox-none ${selectedKey === "none" ? "products-builder__lightbox-none--active" : ""}`}
            onClick={selectNone}
            aria-pressed={selectedKey === "none"}
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

                  return (
                    <button
                      key={optionKey}
                      type="button"
                      className={`products-builder__lightbox-option products-builder__lightbox-option--cosmetic ${selectedKey === optionKey ? "products-builder__lightbox-option--active" : ""}`}
                      onClick={() => selectOption(option)}
                      aria-pressed={selectedKey === optionKey}
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

                  return (
                    <button
                      key={optionKey}
                      type="button"
                      className={`products-builder__lightbox-option products-builder__lightbox-option--cosmetic ${selectedKey === optionKey ? "products-builder__lightbox-option--active" : ""}`}
                      onClick={() => selectOption(option)}
                      aria-pressed={selectedKey === optionKey}
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

function getSelectedAromaEssenceOption(smell: SmelltOptions, essence: EsenceOptions): AromaEssenceOption | null {
  if (smell !== "none") {
    const selectedSmell = smellOptions.find((item) => item.id === smell);

    return selectedSmell ? { kind: "smell", id: selectedSmell.id, name: getSmellName(selectedSmell.id) ?? selectedSmell.name, img: selectedSmell.img } : null;
  }

  if (essence !== "none") {
    const selectedEssence = allEsence.find((item) => item.id === essence);

    return selectedEssence ? { kind: "essence", id: selectedEssence.id, name: selectedEssence.name, img: selectedEssence.img } : null;
  }

  return null;
}

function getAromaEssenceOptionKey(option: AromaEssenceOption) {
  return `${option.kind}:${option.id}`;
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

function ColorCombinationPreview({ colors }: { colors: string[] }) {
  const previewColors = colors.length > 0 ? colors : [DEFAULT_COLOR_HEX];
  const mixedColor = mixHexColors(previewColors);
  const colorLabel = previewColors.length === 1 ? "cor" : "cores";

  return (
    <div className="products-builder__combination" aria-label={`Mistura final com ${previewColors.length} ${colorLabel}`}>
      <span
        className="products-builder__combination-ball"
        style={{ backgroundColor: mixedColor }}
        aria-hidden="true"
      />
      <span className="products-builder__combination-copy">
        <strong>Combinação</strong>
        <small>{`${previewColors.length}/${MAX_COLOR_SELECTIONS}`}</small>
      </span>
    </div>
  );
}


function ProductPreviewCard({
  product,
  className = "",
}: {
  product: ProductsPageProduct;
  className?: string;
}) {
  const cardClassName = ["products-summary__card", className].filter(Boolean).join(" ");

  return (
    <div className={cardClassName}>
      <h2>O teu {product.title}</h2>
      <div className="products-summary__image-wrap">
        <img
          src={product.image}
          alt={product.imageAlt}
          className={`products-summary__image products-summary__image--${product.id}`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <p className="products-summary__note">A imagem é apenas uma representação do resultado.</p>
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
