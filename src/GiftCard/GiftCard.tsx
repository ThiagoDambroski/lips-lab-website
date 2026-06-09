import { useEffect, useId, useMemo, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import giftCardImg from "../assets/giftBox.png";
import giftBanner from "../assets/giftBoxBanner.png";
import "../scss/GiftCard.css";

type GiftOption = "single" | "pack" | "experienceGiftBox";

const SHOPIFY_SHOP_URL = "https://lips-lab.myshopify.com";

const VARIANT_BY_OPTION: Record<GiftOption, number> = {
  single: 47047067336961,
  pack: 47047067369729,
  experienceGiftBox: 49239901274369,
};

const GIFT_OPTION_LABEL_BY_OPTION: Record<GiftOption, string> = {
  single: "CRIA O TEU BATOM OU GLOSS LABIAL (55€)",
  experienceGiftBox: "EXPERIÊNCIA + CAIXA PRESENTE (60€)",
  pack: "PACK 2 PRODUTOS (99€)",
  
};

function goToShopifyAlways(url: string) {
  window.location.assign(url);
}

type GiftProperties = {
  de: string;
  para: string;
};

function safeString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const v = String(value).trim();
  return v.length ? v : null;
}

function toBase64Url(input: string): string {
  const utf8 = encodeURIComponent(input).replace(
    /%([0-9A-F]{2})/g,
    (_, hex) => String.fromCharCode(parseInt(hex, 16))
  );

  const b64 = btoa(utf8);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function buildShopifyGiftPermalink(variantId: number, props: GiftProperties): string {
  const properties: Record<string, string> = {};

  properties["De"] = safeString(props.de) ?? " ";
  properties["Para"] = safeString(props.para) ?? " ";

  const encoded = toBase64Url(JSON.stringify(properties));
  return `${SHOPIFY_SHOP_URL}/cart/${variantId}:1?properties=${encoded}`;
}

function GiftCard() {
  const groupName = useId();
  const modalTitleId = useId();
  const modalDescId = useId();

  const [selected, setSelected] = useState<GiftOption>("single");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [giftProps, setGiftProps] = useState<GiftProperties>({
    de: "",
    para: "",
  });

  const confirmBtnRef = useRef<HTMLButtonElement | null>(null);

  const variantId = useMemo(() => VARIANT_BY_OPTION[selected], [selected]);
  const selectedLabel = useMemo(() => GIFT_OPTION_LABEL_BY_OPTION[selected], [selected]);

  const cartUrl = useMemo(() => {
    return buildShopifyGiftPermalink(variantId, giftProps);
  }, [variantId, giftProps]);

  const isDeFilled = useMemo(() => giftProps.de.trim().length > 0, [giftProps.de]);
  const isParaFilled = useMemo(() => giftProps.para.trim().length > 0, [giftProps.para]);
  const isConfirmDisabled = useMemo(() => isDeFilled !== isParaFilled, [isDeFilled, isParaFilled]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleBuyClick = () => {
    openModal();
  };

  const handleConfirm = () => {
    if (isConfirmDisabled) return;
    goToShopifyAlways(cartUrl);
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const scrollY = window.scrollY;
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    confirmBtnRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);

      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;

      window.scrollTo(0, scrollY);
    };
  }, [isModalOpen]);

  return (
    <>
      <Navbar css={1} />

      <main>
        <section className="gift-intro">
          <img src={giftCardImg} alt="" />

          <div>
            <h2>
              Cartão-presente <br />
              Lips Lab
            </h2>

            <p>
              {`O presente perfeito não se encontra, cria-se.

Oferece uma experiência Lips Lab e permite que a pessoa presenteada viva o momento único de criar o seu próprio batom ou gloss, exatamente como sempre imaginou.

Os cartões-presente só podem ser utilizados na nossa loja física em Lisboa.`}
            </p>

            <div className="gift-radio-group" role="radiogroup" aria-label="Escolhe o cartão-presente">
              <label className="gift-radio">
                <input
                  type="radio"
                  name={groupName}
                  value="single"
                  checked={selected === "single"}
                  onChange={() => setSelected("single")}
                />
                <span className="gift-radio__label">{GIFT_OPTION_LABEL_BY_OPTION.single}</span>
              </label>
              
                <label className="gift-radio">
                <input
                  type="radio"
                  name={groupName}
                  value="experienceGiftBox"
                  checked={selected === "experienceGiftBox"}
                  onChange={() => setSelected("experienceGiftBox")}
                />
                <span className="gift-radio__label">{GIFT_OPTION_LABEL_BY_OPTION.experienceGiftBox}</span>
              </label>

              <label className="gift-radio">
                <input
                  type="radio"
                  name={groupName}
                  value="pack"
                  checked={selected === "pack"}
                  onChange={() => setSelected("pack")}
                />
                <span className="gift-radio__label">{GIFT_OPTION_LABEL_BY_OPTION.pack}</span>
              </label>

              

              <button
                type="button"
                className="gift-buy-btn"
                onClick={handleBuyClick}
                aria-label={`Comprar ${selectedLabel} e preencher dados do presente`}
              >
                Comprar
              </button>
            </div>
          </div>
        </section>

        <section className="gift-banner">
          <p>
            Há magia em criar algo que é só nosso...
            <br />
            Surpreende com uma experiência
            <br />
            única e memorável.
          </p>
          <img src={giftBanner} alt="" />
        </section>

        <section className="gift-terms">
          <div className="gift-terms__block">
            <h2 className="gift-terms__title">ENTREGA</h2>

            <p className="gift-terms__text">
              Após a compra, será enviado um cartão-presente digital por e-mail para si ou para o destinatário do
              presente.
              <br />
              Não o encontra? Verifique a pasta de Spam/Lixo ou envie-nos um e-mail para lipslab.co@gmail.com.
            </p>

            <p className="gift-terms__text">Pode receber o seu cartão-presente de três formas:</p>

            <ul className="gift-terms__list">
              <li>Digitalmente por e-mail, para si ou diretamente para quem deseja surpreender;</li>
              <li>Entrega física em casa (portes de envio aplicados);</li>
              <li>Levantamento na nossa loja física, na Rua Amélia Rey Colaço, 14E — Lisboa.</li>
            </ul>
          </div>

          <div className="gift-terms__block">
            <h2 className="gift-terms__title">TERMOS DE UTILIZAÇÃO</h2>

            <p className="gift-terms__text">
              Os cartões-presente da Lips Lab podem ser adquiridos online e enviados diretamente para o destinatário
              que escolher, desde que este possua um endereço de e-mail válido. Também pode optar por receber o cartão e
              oferecê-lo como preferir, digitalmente, fisicamente em casa (com portes adicionais) ou levantando-o na
              nossa loja.
            </p>

            <div className="gift-terms__values">
              <p>Os cartões-presente estão disponíveis nos seguintes valores:</p>
              <p>CRIE O SEU BATOM OU GLOSS — 55 €</p>
              <p>EXPERIÊNCIA + CAIXA PRESENTE — 60 €</p>
              <p>PACK 2 PRODUTOS — 99 €</p>
            </div>

            <p className="gift-terms__text">
              Após a compra, o destinatário receberá um e-mail no prazo máximo de 24 horas, informando que recebeu um
              cartão-presente da Lips Lab, válido para utilização na nossa loja física:
            </p>

            <div className="gift-terms__address">
              <p>Rua Amélia Rey Colaço, 14E</p>
              <p>1500-664 Lisboa, Portugal</p>
            </div>

            <p className="gift-terms__text">
              O cartão-presente é válido exclusivamente para o serviço selecionado no momento da compra e não pode ser
              utilizado para adquirir outros cartões-presente.
            </p>

            <p className="gift-terms__text">
              Os cartões-presente não são trocáveis nem reembolsáveis, total ou parcialmente, incluindo em situações de
              perda ou roubo. Não possuem valor monetário e não podem ser convertidos em dinheiro, exceto quando exigido
              por lei.
            </p>

            <p className="gift-terms__text">
              A Lips Lab reserva-se o direito de recusar o uso de um cartão-presente em casos de utilização fraudulenta,
              contestação de pagamento ou qualquer uso indevido. Cartões perdidos, danificados ou roubados não serão
              substituídos. Estes termos e condições podem ser atualizados periodicamente. A utilização do cartão-presente
              implica a aceitação da versão mais recente.
            </p>

            <p className="gift-terms__text">Para mais informações, contacte-nos através do e-mail: lipslab.co@gmail.com.</p>
          </div>
        </section>

        {isModalOpen && (
          <div
            className="gift-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            aria-describedby={modalDescId}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div className="gift-modal__card" onMouseDown={(e) => e.stopPropagation()}>
              <div className="gift-modal__header">
                <h3 id={modalTitleId} className="gift-modal__title">
                  Dados do cartão-presente
                </h3>
                <button type="button" className="gift-modal__close" onClick={closeModal} aria-label="Fechar">
                  ×
                </button>
              </div>

              <div className="gift-modal__form">
                <label className="gift-modal__field">
                  <span>De</span>
                  <input
                    type="text"
                    value={giftProps.de}
                    onChange={(e) => setGiftProps((p) => ({ ...p, de: e.target.value }))}
                    placeholder="Ex: Letícia"
                    autoComplete="off"
                  />
                </label>

                <label className="gift-modal__field">
                  <span>Para</span>
                  <input
                    type="text"
                    value={giftProps.para}
                    onChange={(e) => setGiftProps((p) => ({ ...p, para: e.target.value }))}
                    placeholder="Ex: Maria"
                    autoComplete="off"
                  />
                </label>
              </div>

              <div className="gift-modal__actions">
                <button type="button" className="gift-modal__secondary" onClick={closeModal}>
                  Cancelar
                </button>
                <button
                  ref={confirmBtnRef}
                  type="button"
                  className="gift-modal__primary"
                  onClick={handleConfirm}
                  aria-label="Confirmar e ir para o carrinho"
                  disabled={isConfirmDisabled}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default GiftCard;