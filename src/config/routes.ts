export const ROUTES = {
  home: "/",
  reserve: "/reserve",
  experience: "/experiencie",
  products: "/products",
  onlineExperience: "/create",
  giftCard: "/giftCard",
  faq: "/faq",
  cart: "/cart",
  paymentMethods: "/payment-methods",
  terms: "/terms",
  privacy: "/privacy",
} as const;

export const mainNavigationLinks = [
  { label: "Reserva Agora", path: ROUTES.reserve },
  { label: "Experiência e Preços", path: ROUTES.experience },
  { label: "Produtos", path: ROUTES.products },
  { label: "Experiência Online", path: ROUTES.onlineExperience },
  { label: "Gift Card", path: ROUTES.giftCard },
] as const;

export const footerNavigationLinks = [
  { label: "reserva agora", path: ROUTES.reserve },
  { label: "experiência online", path: ROUTES.onlineExperience },
  { label: "perguntas frequentes", path: ROUTES.faq },
] as const;

export const legalNavigationLinks = [
  { label: "meios de pagamento", path: ROUTES.paymentMethods },
  { label: "termos & condições", path: ROUTES.terms },
  { label: "política de privacidade", path: ROUTES.privacy },
] as const;
