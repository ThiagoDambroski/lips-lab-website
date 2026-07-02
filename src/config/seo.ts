import { SITE_NAME, SITE_URL } from "./site";
import { ROUTES } from "./routes";

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export const defaultSeo: SeoConfig = {
  title: `${SITE_NAME} | Laboratório de batons, gloss e lip oil em Lisboa`,
  description: "Cria o teu batom, gloss labial ou lip oil personalizado no laboratório Lips Lab em Lisboa ou através da experiência online.",
  path: ROUTES.home,
};

export const seoByPath: Record<string, SeoConfig> = {
  [ROUTES.home]: defaultSeo,
  [ROUTES.reserve]: {
    title: `Reserva a tua experiência | ${SITE_NAME}`,
    description: "Agenda a experiência Lips Lab em Lisboa e cria um batom, gloss labial ou lip oil personalizado com apoio da nossa equipa.",
    path: ROUTES.reserve,
  },
  [ROUTES.experience]: {
    title: `Experiência e preços | ${SITE_NAME}`,
    description: "Conhece as etapas da experiência Lips Lab, o que está incluído e os preços para criar o teu produto personalizado.",
    path: ROUTES.experience,
  },
  [ROUTES.products]: {
    title: `Produtos | ${SITE_NAME}`,
    description: "Página de produtos Lips Lab em preparação para venda de batons, lip gloss e extras personalizados.",
    path: ROUTES.products,
  },
  [ROUTES.onlineExperience]: {
    title: `Experiência online | ${SITE_NAME}`,
    description: "Cria o teu batom, gloss labial ou lip oil personalizado online, escolhendo cor, base, aroma, essência e aditivos.",
    path: ROUTES.onlineExperience,
  },
  [ROUTES.giftCard]: {
    title: `Gift Card | ${SITE_NAME}`,
    description: "Oferece uma experiência Lips Lab com cartão-presente para criar batom, gloss labial ou packs personalizados em Lisboa.",
    path: ROUTES.giftCard,
  },
  [ROUTES.faq]: {
    title: `Perguntas frequentes | ${SITE_NAME}`,
    description: "Consulta respostas sobre reservas, pagamento, personalização, ingredientes, cancelamentos e experiência online Lips Lab.",
    path: ROUTES.faq,
  },
  [ROUTES.cart]: {
    title: `Carrinho | ${SITE_NAME}`,
    description: "Revê os produtos personalizados Lips Lab antes de avançar para o checkout.",
    path: ROUTES.cart,
    noIndex: true,
  },
  [ROUTES.paymentMethods]: {
    title: `Meios de pagamento | ${SITE_NAME}`,
    description: "Informação sobre métodos de pagamento, preços e segurança nas compras Lips Lab.",
    path: ROUTES.paymentMethods,
  },
  [ROUTES.terms]: {
    title: `Termos e condições | ${SITE_NAME}`,
    description: "Termos e condições aplicáveis às compras e serviços disponibilizados pela Lips Lab.",
    path: ROUTES.terms,
  },
  [ROUTES.privacy]: {
    title: `Política de privacidade | ${SITE_NAME}`,
    description: "Informação sobre recolha, tratamento e proteção de dados pessoais no website Lips Lab.",
    path: ROUTES.privacy,
  },
};

export function getCanonicalUrl(path: string): string {
  return `${SITE_URL}/#${path}`;
}
