import { useState, useEffect } from "react";
import axios from "axios";

import { IOrder } from "../../interfaces/order";

import SectionLoader from "../UtilityComps/SectionLoader";
import OrdersTable from "../UtilityComps/OrderTable";

type Orders = null | Array<IOrder>;

function StudioOrders() {
  const [studioOrders, setStudioOrders] = useState<Orders>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function getOrders() {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/orders/seller/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudioOrders(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ||
            "An error occured while fetching order requests."
        );
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  async function handleCancel(orderId: number) {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:8000/orders/review/${orderId}/`,
        { action: "cancel" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage(`Order ${orderId} cancelled`);
      await getOrders();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ||
            error.response?.data?.error ||
            "An error occurred while cancelling the order."
        );
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error cancelling order:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAccept(orderId: number) {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:8000/orders/review/${orderId}`,
        { action: "accept" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage(`Order ${orderId} accepted.`);
      await getOrders();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ||
            error.response?.data?.error ||
            "An error occurred when attempting to accept the order."
        );
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error accepting order:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function shipOrder(orderId: number) {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:8000/orders/shipped/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage(`Order ${orderId} accepted.`);
      await getOrders();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ||
            error.response?.data?.error ||
            "An error occurred when attempting to update shipping status."
        );
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error updating shipping status:", error);
    } finally {
      setIsLoading(false);
    }
  }

  console.log("Order List", studioOrders);

  if (isLoading) return <SectionLoader />;
  if (error) return <p className="has-text-danger">{error}</p>;

  return (
    <div>
      <h2 className="subtitle text-special has-text-centered is-4">
        Your Order requests
      </h2>
      {error && <p className="has-text-danger">{error}</p>}
      {successMessage && <p className="has-text-success">{successMessage}</p>}
      {studioOrders && studioOrders.length > 0 ? (
        <OrdersTable
          orders={studioOrders}
          userType="seller"
          onCancel={handleCancel}
          onAccept={handleAccept}
          onShip={shipOrder}
        />
      ) : (
        <p>You haven't recieved any purchase requests yet.</p>
      )}
    </div>
  );
}

export default StudioOrders;