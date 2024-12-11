interface PaymentSuccessMessageProps {
  orderId: string;
  onContinueShopping: () => void;
}

const PaymentSuccessMessage: React.FC<PaymentSuccessMessageProps> = ({
  orderId,
  onContinueShopping,
}) => {
  return (
    <div
      className="box os-content-bk mt-4"
      style={{ maxWidth: "600px", margin: "auto" }}
    >
      <header
        className="is-order has-text-centered"
        style={{ padding: "1rem", marginBottom: "1rem" }}
      >
        <h3 className="has-text-weght-semibold is-size-4 os-title-text">
          (Demo) Payment Successful
        </h3>
      </header>

      <div className="is-flex is-justify-content-center mb-4">
        <span className="icon has-text-success is-large">
          <i className="fas fa-check-circle fa-3x"></i>
        </span>
      </div>

      <div className="has-text-centered mb-4">
        <h4 className="has-text-weght-semibold is-size-4 os-subtitle-text">
          Thank you for your purchase!
        </h4>

        <h5 className="has-text-weght-semibold is-size-5 os-subtitle-text">
          Order #{orderId}
        </h5>
      </div>

      <div className="content os-body-text is-size-6">
        <p>
          If this were a genuine purchase, you’d be receiving a confirmation
          email along with a virtual gallery tour. But since this is just a
          student project, no masterpieces were bought, and your bank account
          remains untouched!
        </p>

        <p>
          <strong>Estimated delivery:</strong> Let’s be honest—nothing’s on its
          way. You didn’t really buy anything! The work will have to remain a
          figment of your imagination!
        </p>

        <div className="is-flex is-justify-content-center mt-5">
          <button className="button is-link" onClick={onContinueShopping}>
            Continue Browsing the Marketplace.
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessMessage;
