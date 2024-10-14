import { useState, ChangeEvent, FormEvent } from "react";

interface PaymentFormProps {
  orderId: number;
  onSubmit: (orderId: number, paymentDetails: PaymentDetails) => void;
  onCancel: () => void;
}

interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

function PaymentForm({ orderId, onSubmit, onCancel }: PaymentFormProps) {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(orderId, paymentDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="box">
      <h3 className="title is-4">Enter Payment Details</h3>
      <div className="field">
        <label className="label">Card Number</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Expiry Date</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="expiryDate"
            value={paymentDetails.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label">CVV</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleChange}
            placeholder="123"
            required
          />
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-primary">
            Submit Payment
          </button>
        </div>
        <div className="control">
          <button type="button" className="button is-light" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default PaymentForm;
