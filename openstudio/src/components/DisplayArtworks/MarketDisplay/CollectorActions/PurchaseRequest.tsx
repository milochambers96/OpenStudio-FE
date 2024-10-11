import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { IMember } from "../../../../interfaces/member";
import { IArtwork } from "../../../../interfaces/artwork";

interface CollectorActionProps {
  member: IMember | null;
  artwork: IArtwork | null;
}

function PurchaseRequest({ member, artwork }: CollectorActionProps) {
  const [isRequested, setIsRequested] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendPurchaseRequest = async () => {
    if (!artwork || !member) return;

    setError(null);
    const url = "http://localhost:8000/orders/create/";
    const data = {
      artwork_id: artwork.id,
      final_price: artwork.price,
    };
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    try {
      await axios.post(url, data, config);
      setIsRequested(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          `Failed to send purchase request. ${
            error.response?.data?.detail || error.message
          }`
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (!member || member.user_type !== "collector") {
    return <p>Login as a collector to purchase artwork.</p>;
  }

  if (!member || member.user_type !== "collector") {
    return <p>Login as a collector to purchase artwork.</p>;
  }

  return (
    <div>
      {error && <p className="has-text-danger">{error}</p>}
      {isRequested ? (
        <div>
          <p>Purchase request sent!</p>
          <Link to="/gallery" className="button is-primary">
            View in Gallery
          </Link>
        </div>
      ) : (
        <button
          className="button is-primary"
          onClick={sendPurchaseRequest}
          disabled={isRequested}
        >
          Purchase Request
        </button>
      )}
    </div>
  );
}

export default PurchaseRequest;
