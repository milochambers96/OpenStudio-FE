import { useState, useEffect } from "react";
import axios from "axios";

import { IOrder } from "../../interfaces/order";

import SectionLoader from "../UtilityComps/SectionLoader";
import OrdersTable from "../UtilityComps/OrderTable";

type Orders = null | Array<IOrder>;

function GalleryOrders() {
  const [galleryOrders, setGalleryOrders] = useState<Orders>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function getOrders() {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8000/orders/purchase-requests/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGalleryOrders(response.data);
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
        `http://localhost:8000/orders/cancel/${orderId}`,
        {},
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

  async function purchaseArtwork(orderId: number) {
    return;
  }

  console.log("Order List", galleryOrders);

  if (isLoading) return <SectionLoader />;
  if (error) return <p className="has-text-danger">{error}</p>;

  return (
    <div>
      <h2 className="subtitle text-special has-text-centered is-4">
        Your Order requests
      </h2>
      {error && <p className="has-text-danger">{error}</p>}
      {successMessage && <p className="has-text-success">{successMessage}</p>}
      {galleryOrders && galleryOrders.length > 0 ? (
        <OrdersTable
          orders={galleryOrders}
          userType="buyer"
          onCancel={handleCancel}
          onPay={purchaseArtwork}
        />
      ) : (
        <p>You haven't sent any purchase requests yet.</p>
      )}
    </div>
  );
}

export default GalleryOrders;
