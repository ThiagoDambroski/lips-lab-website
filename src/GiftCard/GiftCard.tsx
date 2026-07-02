import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import giftCardImg from "../assets/giftBox.png";
import giftBanner from "../assets/giftBoxBanner.png";
import GiftOptionSelector from "./components/GiftOptionSelector";
import GiftPersonalizationModal from "./components/GiftPersonalizationModal";
import { GIFT_OPTION_LABEL_BY_OPTION, VARIANT_BY_GIFT_OPTION, type GiftOption } from "./constants/giftCardOptions";
import { buildShopifyGiftPermalink, goToShopifyAlways, type GiftProperties } from "./utils/giftShopify";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import "../scss/gift-card/index.css";

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

  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const openModal = useCallback(() => setIsModalOpen(true), []);

  const variantId = useMemo(() => VARIANT_BY_GIFT_OPTION[selected], [selected]);
  const selectedLabel = useMemo(() => GIFT_OPTION_LABEL_BY_OPTION[selected], [selected]);

  const cartUrl = useMemo(() => buildShopifyGiftPermalink(variantId, giftProps), [variantId, giftProps]);
  const isDeFilled = useMemo(() => giftProps.de.trim().length > 0, [giftProps.de]);
  const isParaFilled = useMemo(() => giftProps.para.trim().length > 0, [giftProps.para]);
  const isConfirmDisabled = useMemo(() => isDeFilled !== isParaFilled, [isDeFilled, isParaFilled]);

  useBodyScrollLock(isModalOpen, closeModal);

  useEffect(() => {
    if (!isModalOpen) return;
    confirmBtnRef.current?.focus();
  }, [isModalOpen]);

  const handleConfirm = () => {
    if (isConfirmDisabled) return;
    goToShopifyAlways(cartUrl);
  };

  return (
    <>
      <Navbar css={1} />

      <main id="main-content">
        <section className="gift-intro">
          <img src={giftCardImg} alt="Cartão-presente Lips Lab" loading="eager"  decoding="async" />

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

            <GiftOptionSelector
              groupName={groupName}
              selected={selected}
              selectedLabel={selectedLabel}
              onChange={setSelected}
              onBuyClick={openModal}
            />
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
          <img src={giftBanner} alt="Oferta de experiência Lips Lab" loading="lazy"  decoding="async" />
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
              <p>PACK 2 PRODUTOS + CAIXA PRESENTE — 104 €</p>
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
          <GiftPersonalizationModal
            titleId={modalTitleId}
            descriptionId={modalDescId}
            giftProps={giftProps}
            confirmBtnRef={confirmBtnRef}
            isConfirmDisabled={isConfirmDisabled}
            onChange={setGiftProps}
            onClose={closeModal}
            onConfirm={handleConfirm}
          />
        )}
      </main>
    </>
  );
}

export default GiftCard;
