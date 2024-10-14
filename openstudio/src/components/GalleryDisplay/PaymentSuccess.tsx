interface PaymentSuccessMessageProps {
  orderId: string;
//   onViewOrder: () => void;
  onContinueShopping: () => void;
}

const PaymentSuccessMessage: React.FC<PaymentSuccessMessageProps> = ({
  orderId,
//   onViewOrder,
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
        <h1 className="title is-4">Payment Successful</h1>
      </header>

      <div className="content">
        <div className="is-flex is-justify-content-center mb-4">
          <span className="icon has-text-success is-large">
            <i className="fas fa-check-circle fa-3x"></i>
          </span>
        </div>

        <h2 className="title is-5">Thank you for your purchase!</h2>

        <p className="subtitle is-6">Order #{orderId}</p>
        <p>A confirmation email has been sent to your email address.</p>

        <p className="mt-4">
          <strong>Estimated delivery:</strong> 5-7 business days
        </p>

        <div className="buttons is-centered mt-5">
          {/* <button className="button is-success" onClick={onViewOrder}>
            View Order */}
          {/* </button> */}
          <button className="button is-light" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessMessage;
