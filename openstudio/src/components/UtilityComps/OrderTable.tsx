import { IOrder } from "../../interfaces/order";

import "../../styles/OrdersTableStyles.css";

import OrderButtons from "../UtilityComps/OrderButtons";

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
    <div className="table-container mt-6">
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
                <OrderButtons
                  oStatus={order.status}
                  oID={order.id}
                  userType={userType}
                  onCancel={onCancel}
                  onAccept={onAccept}
                  onPay={onPay}
                  onShip={onShip}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
