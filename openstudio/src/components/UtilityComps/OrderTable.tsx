import { IOrder } from "../../interfaces/order";

import "../../styles/OrdersTableStyles.css";

interface OrdersTableProps {
  orders: IOrder[];
  userType: "buyer" | "seller";
  onAccept?: (orderId: number) => Promise<void>;
  onShip?: (orderId: number) => Promise<void>;
  onCancel?: (orderId: number) => Promise<void>;
  onPay?: (orderId: number) => Promise<void>;
}

function OrdersTable({
  orders,
  userType,
  onAccept,
  onShip,
  onCancel,
  onPay,
}: OrdersTableProps) {
  return (
    <div className="table-container">
      <table className="table is-fullwidth is-striped is-hoverable custom-table">
        <thead>
          <tr>
            <th className="is-narrow">Order ID</th>
            <th>Artwork</th>
            <th>Buyer</th>
            <th>Seller</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date</th>
            <th className="is-narrow">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="custom-table-row">
              <td>{order.id}</td>
              <td>{order.artwork_info.title}</td>
              <td>{order.buyer_info.username}</td>
              <td>{order.seller_info.username}</td>
              <td>£{parseFloat(order.price).toFixed(2)}</td>
              <td>{order.status}</td>
              <td>
                {order.created_at
                  ? new Date(order.created_at).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                <div className="buttons are-small">
                  {order.status === "cancelled" ? (
                    <button className="button is-static" disabled>
                      No Action Required
                    </button>
                  ) : order.status === "shipped" ? (
                    <button className="button is-static" disabled>
                      Artwork In Transit
                    </button>
                  ) : userType === "buyer" ? (
                    <>
                      {(order.status === "pending" ||
                        order.status === "accepted") &&
                        onCancel && (
                          <button
                            className="button is-danger"
                            onClick={() => onCancel(order.id)}
                          >
                            Cancel
                          </button>
                        )}
                      {order.status === "accepted" && onPay && (
                        <button
                          className="button is-success"
                          onClick={() => onPay(order.id)}
                        >
                          Pay
                        </button>
                      )}
                      {order.status === "ready to ship" && (
                        <button className="button is-static" disabled>
                          Awaiting Shipment
                        </button>
                      )}
                    </>
                  ) : userType === "seller" ? (
                    <>
                      {order.status === "pending" && onCancel && onAccept && (
                        <div className="button-container">
                          <button
                            className="button is-danger is-small"
                            onClick={() => onCancel(order.id)}
                          >
                            Reject
                          </button>
                          <button
                            className="button is-success is-small"
                            onClick={() => onAccept(order.id)}
                          >
                            Accept
                          </button>
                        </div>
                      )}
                      {order.status === "accepted" && (
                        <button className="button is-static" disabled>
                          Awaiting Payment
                        </button>
                      )}
                      {order.status === "ready to ship" && onShip && (
                        <button
                          className="button is-link"
                          onClick={() => onShip(order.id)}
                        >
                          Mark as Shipped
                        </button>
                      )}
                    </>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
