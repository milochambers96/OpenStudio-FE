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
    <article className="article pb-6">
      <div className="columns is-centered">
        <div className="mt-6 column is-4 is-full-mobile box os-content-bk">
          <form onSubmit={handleSubmit} className="px-4">
            <div className="pt-2 pb-4 has-text-centered">
              <h3 className="os-subtitle-text is-size-3 has-text-weight-bold">
                Enter Payment Details
              </h3>
            </div>
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
            <div className="field is-flex is-justify-content-space-evenly py-4">
              <div className="control">
                <button type="submit" className="button is-order">
                  Purchase
                </button>
              </div>
              <div className="control">
                <button
                  type="button"
                  className="button is-destroy"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </article>
  );
}

export default PaymentForm;
