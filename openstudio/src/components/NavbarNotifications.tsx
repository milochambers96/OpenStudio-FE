import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function NavbarNotification() {
  const [hasUnviewedOrders, setHasUnviewedOrders] = useState(false);

  const checkUnviewedOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(
        "http://localhost:8000/orders/unviewed-orders/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setHasUnviewedOrders(response.data.has_unviewed_orders);
    } catch (error) {
      console.error("Error checking unviewed orders:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response:", error.response.data);
      }
      setHasUnviewedOrders(false);
    }
  }, []);

  useEffect(() => {
    checkUnviewedOrders();
    const interval = setInterval(checkUnviewedOrders, 30000);
    return () => clearInterval(interval);
  }, [checkUnviewedOrders]);

  if (!hasUnviewedOrders) {
    return null;
  }

  return <span className="notification-indicator"></span>;
}

export default NavbarNotification;
