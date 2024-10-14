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
          If this was a real purchase, you would get a confirmation email,
          however this is a student project! You din't buy any art, and you have
          not been charged!
        </p>

        <p className="mt-4">
          <strong>Estimated delivery:</strong> This will not be arriving, you
          haven't purchase anything!
        </p>

        <div className="is-centered mt-5">
          <button className="button is-light" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessMessage;
