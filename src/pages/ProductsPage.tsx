import { useMemo, useState, type ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import PageSeo from "../components/PageSeo";
import { allColors, allEsence, additiveOptions, glitterOptions, smellOptions } from "../Functions/CreateBatomBox/data/builderOptions";
import type { AdditivesOptions, EsenceOptions, SmelltOptions } from "../Functions/CreateBatomBox/Types";
import { productsPageItems, PRODUCT_EXTRA_PRICE, type ProductsPageProduct, type ProductsPageProductId } from "../data/productsPageItems";
import { buildProductsCartUrl } from "../utils/productsShopifyCart";
import "../scss/products-page/index.css";

type ProductBuilderState = {
  selectedColorHexes: string[];
  glitterId: number | null;
  smell: SmelltOptions;
  essence: EsenceOptions;
  additive: AdditivesOptions;
  engraving: string;
  hasCharms: boolean;
};

type ExtraKey = "glitter" | "taste" | "additive" | "engraving" | "charms";

type ProductInfoCopy = {
  description: string[];
  ingredients: string;
};

const MAX_COLOR_SELECTIONS = 4;

const DEFAULT_COLOR_HEX = allColors[0]?.hex ?? "#d13c72";

const DEFAULT_STATE: ProductBuilderState = {
  selectedColorHexes: [DEFAULT_COLOR_HEX],
  glitterId: null,
  smell: "none",
  essence: "none",
  additive: "none",
  engraving: "",
  hasCharms: false,
};

const productInfoCopy: Record<ProductsPageProductId, ProductInfoCopy> = {
  gloss: {
    description: [
      "Bálsamo labial com cor, hidratante e nutritivo, formulado com ceras vegetais naturais e chá verde. A sua textura confortável combina o brilho de um gloss com o cuidado de um bálsamo, deixando os lábios suaves, hidratados e protegidos.",
      "Enriquecido com chá verde e vitamina E, ajuda a nutrir, reparar e cuidar dos lábios, proporcionando conforto imediato e um acabamento brilhante e luminoso. Ideal para quem procura cor, hidratação e cuidado num único produto.",
    ],
    ingredients: "Fórmula com ceras vegetais naturais, chá verde e vitamina E. A composição final pode variar conforme a personalização escolhida.",
  },
  batom: {
    description: [
      "Batom labial com cor, confortável e nutritivo, desenvolvido para unir intensidade, cuidado e personalização numa única experiência Lips Lab.",
      "A textura foi pensada para oferecer conforto nos lábios e um acabamento bonito, com a possibilidade de adicionar extras que tornam cada produto único.",
    ],
    ingredients: "Fórmula cosmética labial com ingredientes de cuidado e acabamento personalizável. A composição final pode variar conforme a personalização escolhida.",
  },
};

function formatPrice(value: number) {
  return `${value.toFixed(2).replace(".", ",")}€`;
}

function getGlitterName(glitterId: number | null) {
  if (!glitterId) return "none";
  return glitterOptions.find((item) => item.id === glitterId)?.name ?? String(glitterId);
}

function getSmellName(smell: SmelltOptions) {
  if (smell === "none") return undefined;
  return smellOptions.find((item) => item.id === smell)?.name ?? String(smell);
}

function getEssenceName(essence: EsenceOptions) {
  if (essence === "none") return undefined;
  return allEsence.find((item) => item.id === essence)?.name ?? String(essence);
}

function getAdditiveName(additive: AdditivesOptions) {
  if (additive === "none") return undefined;
  return additiveOptions.find((item) => item.id === additive)?.name ?? String(additive);
}

function getSelectedColors(colorHexes: string[]) {
  return colorHexes
    .map((hex) => allColors.find((color) => color.hex.toLowerCase() === hex.toLowerCase()))
    .filter((color): color is (typeof allColors)[number] => Boolean(color));
}

function getActiveExtrasCount(state: ProductBuilderState) {
  return [
    state.glitterId !== null,
    state.smell !== "none" || state.essence !== "none",
    state.additive !== "none",
    state.engraving.trim().length > 0,
    state.hasCharms,
  ].filter(Boolean).length;
}

function ProductsPage() {
  const [selectedProductId, setSelectedProductId] = useState<ProductsPageProductId | null>(null);
  const [activeSection, setActiveSection] = useState<ExtraKey | null>(null);
  const [state, setState] = useState<ProductBuilderState>(DEFAULT_STATE);

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

  const handleSelectProduct = (product: ProductsPageProduct) => {
    setSelectedProductId(product.id);
    setState(DEFAULT_STATE);
    setActiveSection(null);
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
            activeSection={activeSection}
            selectedGlitter={selectedGlitter}
            selectedAdditive={selectedAdditive}
            selectedColors={selectedColors}
            onBack={() => setSelectedProductId(null)}
            onSetActiveSection={setActiveSection}
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

            <div className="products-page__content"  >
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
  activeSection: ExtraKey | null;
  selectedGlitter: (typeof glitterOptions)[number] | null;
  selectedAdditive: (typeof additiveOptions)[number] | null;
  selectedColors: (typeof allColors)[number][];
  onBack: () => void;
  onSetActiveSection: (section: ExtraKey | null) => void;
  onUpdateState: (partial: Partial<ProductBuilderState>) => void;
  onToggleColor: (colorHex: string) => void;
  onAddToCart: () => void;
};

function ProductCustomizer({
  product,
  state,
  totalPrice,
  activeSection,
  selectedGlitter,
  selectedAdditive,
  selectedColors,
  onBack,
  onSetActiveSection,
  onUpdateState,
  onToggleColor,
  onAddToCart,
}: ProductCustomizerProps) {
  const selectedColorNames = selectedColors.map((color) => color.sub).join(", ");

  return (
    <section className="products-builder" aria-labelledby="products-builder-title">
      <button type="button" className="products-builder__back" onClick={onBack}>← Voltar aos produtos</button>

      <div className="products-builder__layout">
        <div className="products-builder__main">
          <header className="products-builder__hero products-builder__hero--without-texture">
            <div className="products-builder__hero-copy">
              <p className="products-builder__eyebrow">Produtos Lips Lab</p>
              <h1 id="products-builder-title" className="products-builder__title">{product.displayTitle}</h1>
              <p className="products-builder__description">{product.description}</p>

              <div className="products-builder__base-price">
                <span>Preço base</span>
                <strong>{formatPrice(product.basePrice)}</strong>
              </div>
            </div>
          </header>

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

          <AccordionSection
            id="glitter"
            title="Glitter"
            priceLabel={`+${formatPrice(PRODUCT_EXTRA_PRICE)}`}
            subtitle="Adiciona brilho ao produto. Escolhe apenas uma opção."
            isActive={activeSection === "glitter"}
            onToggle={() => onSetActiveSection(activeSection === "glitter" ? null : "glitter")}
          >
            <div className="products-builder__option-grid products-builder__option-grid--glitter">
              <OptionButton label="Sem glitter" isSelected={state.glitterId === null} onClick={() => onUpdateState({ glitterId: null })} />
              {glitterOptions.map((glitter) => (
                <OptionButton
                  key={glitter.id}
                  label={glitter.name}
                  image={glitter.img}
                  isSelected={state.glitterId === glitter.id}
                  onClick={() => onUpdateState({ glitterId: glitter.id })}
                />
              ))}
            </div>
          </AccordionSection>

          <AccordionSection
            id="taste"
            title="Aroma ou essência"
            priceLabel={`+${formatPrice(PRODUCT_EXTRA_PRICE)}`}
            subtitle="Escolhe até um aroma e uma essência."
            isActive={activeSection === "taste"}
            onToggle={() => onSetActiveSection(activeSection === "taste" ? null : "taste")}
          >
            <div className="products-builder__two-columns">
              <div>
                <h3>Aroma</h3>
                <div className="products-builder__option-grid">
                  <OptionButton label="Sem aroma" isSelected={state.smell === "none"} onClick={() => onUpdateState({ smell: "none" })} />
                  {smellOptions.map((smell) => (
                    <OptionButton key={smell.id} label={smell.name} image={smell.img} isSelected={state.smell === smell.id} onClick={() => onUpdateState({ smell: smell.id })} />
                  ))}
                </div>
              </div>

              <div>
                <h3>Essência</h3>
                <div className="products-builder__option-grid">
                  <OptionButton label="Sem essência" isSelected={state.essence === "none"} onClick={() => onUpdateState({ essence: "none" })} />
                  {allEsence.map((essence) => (
                    <OptionButton key={essence.id} label={essence.name} image={essence.img} isSelected={state.essence === essence.id} onClick={() => onUpdateState({ essence: essence.id })} />
                  ))}
                </div>
              </div>
            </div>
          </AccordionSection>

          <AccordionSection
            id="additive"
            title="Aditivo"
            priceLabel={`+${formatPrice(PRODUCT_EXTRA_PRICE)}`}
            subtitle="Personaliza e potencia o cuidado dos teus lábios. Escolhe apenas uma opção."
            isActive={activeSection === "additive"}
            onToggle={() => onSetActiveSection(activeSection === "additive" ? null : "additive")}
          >
            <div className="products-builder__option-grid products-builder__option-grid--large">
              <OptionButton label="Pré-opção" isSelected={state.additive === "none"} onClick={() => onUpdateState({ additive: "none" })} />
              {additiveOptions.map((additive) => (
                <OptionButton key={additive.id} label={additive.name} image={additive.img} isSelected={state.additive === additive.id} onClick={() => onUpdateState({ additive: additive.id })} />
              ))}
            </div>
          </AccordionSection>

          <AccordionSection
            id="engraving"
            title="Gravação na embalagem"
            priceLabel={`+${formatPrice(PRODUCT_EXTRA_PRICE)}`}
            subtitle="Escreve o teu nome, iniciais ou uma palavra especial."
            isActive={activeSection === "engraving"}
            onToggle={() => onSetActiveSection(activeSection === "engraving" ? null : "engraving")}
          >
            <label className="products-builder__field">
              <span>Texto da embalagem</span>
              <input
                type="text"
                maxLength={18}
                value={state.engraving}
                onChange={(event) => onUpdateState({ engraving: event.target.value })}
                placeholder="Ex: Leticia"
              />
            </label>
          </AccordionSection>

          <AccordionSection
            id="charms"
            title="Charms"
            priceLabel={`+${formatPrice(PRODUCT_EXTRA_PRICE)}`}
            subtitle="4 charms selecionados pela equipa Lips Lab de forma aleatória, de acordo com a cor do produto e a personalização escolhida."
            isActive={activeSection === "charms"}
            onToggle={() => onSetActiveSection(activeSection === "charms" ? null : "charms")}
          >
            <label className="products-builder__checkbox">
              <input type="checkbox" checked={state.hasCharms} onChange={(event) => onUpdateState({ hasCharms: event.target.checked })} />
              <span>Adicionar charms</span>
            </label>
          </AccordionSection>

          <ProductInfo product={product} />
        </div>

        <aside className="products-summary" aria-label="Resumo do pedido">
          <div className="products-summary__card">
            <h2>O teu {product.title}</h2>
            <div className="products-summary__image-wrap">
              <img src={product.image} alt={product.imageAlt} className={`products-summary__image products-summary__image--${product.id}`} loading="lazy" decoding="async" />
            </div>
            <p className="products-summary__note">A imagem é apenas uma representação do resultado.</p>
          </div>

          <div className="products-summary__card products-summary__card--order">
            <h2>Resumo do pedido</h2>
            <SummaryRow label={`${product.title} Base`} value={formatPrice(product.basePrice)} />
            <SummaryRow label={`Cores: ${selectedColorNames || "none"}`} value="+0,00€" colors={selectedColors.map((color) => color.hex)} />
            <SummaryRow label={`Glitter: ${selectedGlitter?.name ?? "none"}`} value={state.glitterId ? `+${formatPrice(PRODUCT_EXTRA_PRICE)}` : "+0,00€"} />
            <SummaryRow label={`Aroma: ${state.smell}`} value={state.smell !== "none" || state.essence !== "none" ? `+${formatPrice(PRODUCT_EXTRA_PRICE)}` : "+0,00€"} />
            <SummaryRow label={`Essência: ${state.essence}`} value="" />
            <SummaryRow label={`Aditivo: ${selectedAdditive?.name ?? "Pré-opção"}`} value={state.additive !== "none" ? `+${formatPrice(PRODUCT_EXTRA_PRICE)}` : "+0,00€"} />
            <SummaryRow label={`Gravação: ${state.engraving.trim() || "none"}`} value={state.engraving.trim() ? `+${formatPrice(PRODUCT_EXTRA_PRICE)}` : "+0,00€"} />
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
      </div>
    </section>
  );
}

type AccordionSectionProps = {
  id: ExtraKey;
  title: string;
  subtitle: string;
  priceLabel?: string;
  isActive: boolean;
  onToggle: () => void;
  children: ReactNode;
};

function AccordionSection({ id, title, subtitle, priceLabel, isActive, onToggle, children }: AccordionSectionProps) {
  return (
    <section className="products-builder__accordion">
      <button type="button" className="products-builder__accordion-button" onClick={onToggle} aria-expanded={isActive} aria-controls={`products-panel-${id}`}>
        <span className="products-builder__accordion-text">
          <strong>{title}</strong>
          {priceLabel && <em>{priceLabel}</em>}
          <small>{subtitle}</small>
        </span>
        <span className="products-builder__plus" aria-hidden="true">{isActive ? "−" : "+"}</span>
      </button>

      {isActive && (
        <div id={`products-panel-${id}`} className="products-builder__panel">
          {children}
        </div>
      )}
    </section>
  );
}

function OptionButton({ label, image, isSelected, onClick }: { label: string; image?: string; isSelected: boolean; onClick: () => void }) {
  return (
    <button type="button" className={`products-builder__option ${isSelected ? "products-builder__option--active" : ""}`} onClick={onClick} aria-pressed={isSelected}>
      {image && (
        <span className="products-builder__option-icon" aria-hidden="true">
          <img src={image} alt="" loading="lazy" decoding="async" />
        </span>
      )}
      <span>{label}</span>
    </button>
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
      <h2 id="products-info-title" className="products-info__title">Descrição</h2>

      {copy.description.map((paragraph) => (
        <p key={paragraph} className="products-info__description">{paragraph}</p>
      ))}

      

      <div className="products-info__accordion">
        <details className="products-info__details">
          <summary className="products-info__summary">
            <span>Instruções de segurança</span>
            <span className="products-info__arrow" aria-hidden="true">›</span>
          </summary>
          <div className="products-info__content">
            <p>AVISO: APENAS PARA USO EXTERNO.</p>
          </div>
        </details>

        <details className="products-info__details">
          <summary className="products-info__summary">
            <span>Dicas de utilização</span>
            <span className="products-info__arrow" aria-hidden="true">›</span>
          </summary>
          <div className="products-info__content">
            <ul>
              <li>Aplicar generosamente nos lábios limpos e secos, sempre que necessário;</li>
              <li>Pode ser utilizado sozinho para um efeito nutritivo e um acabamento natural, ou antes do batom para suavizar e proteger os lábios.</li>
            </ul>
            <p>Dica: para um efeito reparador intensivo e conforto prolongado, aplicar uma camada mais espessa à noite antes de deitar.</p>
            <p>Apenas para uso externo.</p>
          </div>
        </details>

        <details className="products-info__details">
          <summary className="products-info__summary">
            <span>Ingredientes</span>
            <span className="products-info__arrow" aria-hidden="true">›</span>
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
