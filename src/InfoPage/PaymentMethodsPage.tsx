import InfoLayout from "./InfoLayout";

export default function PaymentMethodsPage() {
  return (
    <InfoLayout title="Meios de Pagamento" breadcrumb="Início / Meios de Pagamento">
      <p><strong>Estão disponíveis os seguintes métodos de pagamento:</strong></p>
      <ul>
        <li>Cartão de Crédito: Mastercard, Visa</li>
        <li>Referência Multibanco</li>
      </ul>

      <div className="info-divider" />

      <p>
        Todos os pagamentos são executados de forma segura. As suas informações pessoais só
        serão utilizadas para estabelecer o pagamento e não serão transmitidas a terceiros.
      </p>

      <h2>Pagamento Online</h2>
      <p>
        Caso opte por pagar on-line com cartão de crédito ou débito, será redirecionado para
        a página web segura do nosso parceiro, onde pode inserir todos os detalhes para
        efetuar o pagamento.
      </p>
      <p>
        Todas as transações são encriptadas com segurança. Lembre-se de que este link de
        pagamento seguro está ativo apenas por tempo limitado. Se o tempo expirou, será
        necessário entrar novamente no seu pedido através da sua conta pessoal na nossa loja
        e tentar o pagamento novamente.
      </p>
      <p>
        Caso opte pelo pagamento através do Multibanco, serão geradas referência e entidade
        de pagamento automaticamente; estes dados de pagamento ficarão ativos até que receba
        algum email de cancelamento da encomenda.
      </p>

      <h2>Preços</h2>
      <p>
        Todos os preços para produtos e entrega exibidos na loja on-line incluem IVA.
        Quaisquer promoções e descontos são válidos desde que sejam mencionados.
      </p>
      <p>
        Reservamo-nos o direito de modificar os preços, dependendo da evolução do mercado,
        da concorrência, das exigências do produtor, etc.
      </p>

      <h2>Problemas com Pagamento</h2>
      <p>
        Em primeiro lugar, verifique com o seu banco para ver se a transação passou e para
        resolver quaisquer problemas técnicos com o seu pagamento.
      </p>
      <p>
        Se o seu pagamento tiver sido efetuado com sucesso, mas não aparecer como pago no
        nosso sistema, entre em contacto connosco e validaremos o seu pagamento com o nosso
        departamento de contabilidade.
      </p>
      <p>
        Caso tenha problemas com a página de pagamento, tente entrar na sua conta a partir
        de um navegador ou dispositivo diferente.
      </p>
    </InfoLayout>
  );
}
