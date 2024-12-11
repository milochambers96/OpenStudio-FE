interface OrderButtonsProps {
  oStatus: string;
  oID: number;
  userType: "buyer" | "seller";
  onAccept?: (orderId: number) => Promise<void>;
  onShip?: (orderId: number) => Promise<void>;
  onCancel?: (orderId: number) => Promise<void>;
  onPay?: (orderId: number) => Promise<void>;
}

const OrderButtons = ({
  oStatus,
  oID,
  userType,
  onAccept,
  onShip,
  onCancel,
  onPay,
}: OrderButtonsProps) => {
  if (oStatus === "cancelled" || oStatus === "shipped") {
    const buttonMessage =
      oStatus === "cancelled" ? "Order Cancelled" : "In Transit";
    return (
      <button className="button is-static" disabled>
        {buttonMessage}
      </button>
    );
  }

  //   Conditions for Buyer Related Rendered Buttons

  if (userType === "buyer") {
    if (oStatus === "pending" && onCancel) {
      return (
        <button
          className="button is-destroy is-small"
          onClick={() => onCancel(oID)}
        >
          Cancel
        </button>
      );
    }

    if (oStatus === "accepted" && onPay && onCancel) {
      return (
        <div className="button-container">
          <button
            className="button is-order is-small"
            onClick={() => onPay(oID)}
          >
            Pay
          </button>
          <button
            className="button is-destroy is-small"
            onClick={() => onCancel(oID)}
          >
            Cancel
          </button>
        </div>
      );
    }

    if (oStatus === "ready to ship") {
      return (
        <button className="button is-static" disabled>
          Awaiting Shipment
        </button>
      );
    }
  }

  //   Conditions for Seller Related Rendered Buttons

  if (userType === "seller") {
    if (oStatus === "pending" && onCancel && onAccept) {
      return (
        <div className="button-container">
          <button
            className="button is-destroy is-small"
            onClick={() => onCancel(oID)}
          >
            Reject
          </button>
          <button
            className="button is-order is-small"
            onClick={() => onAccept(oID)}
          >
            Accept
          </button>
        </div>
      );
    }

    if (oStatus === "accepted") {
      return (
        <button className="button is-static" disabled>
          Awaiting Payment
        </button>
      );
    }

    if (oStatus === "ready to ship" && onShip) {
      return (
        <button className="button is-link" onClick={() => onShip(oID)}>
          Mark as Shipped
        </button>
      );
    }
  }
};

export default OrderButtons;
