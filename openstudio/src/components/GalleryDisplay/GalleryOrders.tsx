import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { baseUrl } from "../../config";

import { IOrder } from "../../interfaces/order";

import SectionLoader from "../UtilityComps/SectionLoader";
import OrdersTable from "../UtilityComps/OrderTable";
import PaymentForm from "./PaymentForm";
import PaymentSuccessMessage from "./PaymentSuccess";

type Orders = null | Array<IOrder>;

function GalleryOrders() {
  const [galleryOrders, setGalleryOrders] = useState<Orders>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const getOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/orders/purchase-requests/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGalleryOrders(response.data);
      const markOrdersAsViewed = async () => {
        try {
          await axios.post(
            `${baseUrl}/orders/mark-viewed/`,
            { user_type: "collector" },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.error("Error marking orders as viewed:", error);
        }
      };

      await markOrdersAsViewed();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ||
            "An error occurred while fetching order requests."
        );
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  async function handleCancel(orderId: number) {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${baseUrl}/orders/cancel/${orderId}`,
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
    setSelectedOrderId(orderId);
    setPaymentSuccess(false);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handlePaymentSubmit(orderId: number, paymentDetails: any) {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${baseUrl}/orders/payment/${orderId}`,
        paymentDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPaymentSuccess(true);
      setSuccessMessage(response.data.message);
      await getOrders();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.error ||
            "An error occurred while processing the payment."
        );
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error processing payment:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handlePaymentCancel() {
    setSelectedOrderId(null);
    setPaymentSuccess(false);
  }

  function handleContinueShopping() {
    navigate("/marketplace");
  }

  if (isLoading) return <SectionLoader />;
  if (error) return <p className="has-text-danger">{error}</p>;

  return (
    <div>
      <h2 className="subtitle text-special has-text-centered is-4">
        Your Order requests
      </h2>
      {error && <p className="has-text-danger">{error}</p>}
      {successMessage && <p className="has-text-success">{successMessage}</p>}
      {paymentSuccess ? (
        <PaymentSuccessMessage
          orderId={selectedOrderId!.toString()}
          onContinueShopping={handleContinueShopping}
        />
      ) : selectedOrderId ? (
        <PaymentForm
          orderId={selectedOrderId}
          onSubmit={handlePaymentSubmit}
          onCancel={handlePaymentCancel}
        />
      ) : galleryOrders && galleryOrders.length > 0 ? (
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
