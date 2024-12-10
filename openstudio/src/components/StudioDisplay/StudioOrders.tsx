import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { baseUrl } from "../../config";

import { IOrder } from "../../interfaces/order";

import SectionLoader from "../UtilityComps/SectionLoader";
import OrdersTable from "../UtilityComps/OrderTable";

interface StudioOrdersProp {
  setActiveTab: (tab: string) => void;
}

function StudioOrders({ setActiveTab }: StudioOrdersProp) {
  const [studioOrders, setStudioOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const getOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/orders/seller/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudioOrders(response.data);

      const markOrdersAsViewed = async () => {
        try {
          await axios.post(
            `${baseUrl}/orders/mark-viewed/`,
            { user_type: "artist" },
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

  const handleCancel = useCallback(
    async (orderId: number) => {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);
      try {
        const token = localStorage.getItem("token");
        await axios.patch(
          `${baseUrl}/orders/review/${orderId}/`,
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
    },
    [getOrders]
  );

  const handleAccept = useCallback(
    async (orderId: number) => {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);
      try {
        const token = localStorage.getItem("token");
        await axios.patch(
          `${baseUrl}/orders/review/${orderId}`,
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
    },
    [getOrders]
  );

  const shipOrder = useCallback(
    async (orderId: number) => {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);
      try {
        const token = localStorage.getItem("token");
        await axios.patch(
          `${baseUrl}/orders/shipped/${orderId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccessMessage(`Order ${orderId} shipped.`);
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
    },
    [getOrders]
  );

  if (isLoading) return <SectionLoader />;
  if (error) return <p className="has-text-danger">{error}</p>;

  const noOrderSellerMessage = () => {
    return (
      <div className="has-text-centered-desktop has-text-justifed-touch is-size-3-desktop is-size-4-touch os-body-text">
        <h2>
          No purchase requests have been received yet, but adding new artwork is
          the best way to attract customers.
        </h2>
        <h2 className="mt-4">
          <span
            className="is-link-text has-cursor-pointer"
            onClick={() => setActiveTab("upload")}
          >
            Upload
          </span>{" "}
          some new pieces to help your work find its audience.
        </h2>
      </div>
    );
  };

  return (
    <div>
      {studioOrders.length > 0 && (
        <h2 className="has-text-centered is-size-2 os-subtitle-text has-text-weight-bold">
          Orders
        </h2>
      )}
      {error && <p className="has-text-danger">{error}</p>}
      {successMessage && <p className="has-text-success">{successMessage}</p>}
      {studioOrders.length > 0 ? (
        <OrdersTable
          orders={studioOrders}
          userType="seller"
          onCancel={handleCancel}
          onAccept={handleAccept}
          onShip={shipOrder}
        />
      ) : (
        noOrderSellerMessage()
      )}
    </div>
  );
}

export default StudioOrders;
