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
      className="box"
      style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}
    >
      <header
        className="has-background-success has-text-white"
        style={{ padding: "1rem", marginBottom: "1rem" }}
      >
        <h1 className="title is-4">(Demo) Payment Successful</h1>
      </header>

      <div className="content">
        <div className="is-flex is-justify-content-center mb-4">
          <span className="icon has-text-success is-large">
            <i className="fas fa-check-circle fa-3x"></i>
          </span>
        </div>

        <h2 className="title is-5">Thank you for your purchase!</h2>

        <p className="subtitle is-6">Order #{orderId}</p>
        <p>
          If this were a genuine purchase, you’d be receiving a confirmation
          email along with a virtual gallery tour. But since this is just a
          student project, no masterpieces were bought, and your bank account
          remains untouched!
        </p>

        <p className="mt-4">
          <strong>Estimated delivery:</strong> Let’s be honest—nothing’s on its
          way. You didn’t really buy anything! The work will have to remain a
          figment of your imagination!
        </p>

        <div className="is-centered mt-5">
          <button className="button is-light" onClick={onContinueShopping}>
            Continue Browsing the Marketplace.
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessMessage;
