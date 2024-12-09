import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { baseUrl } from "../../../../config";
import { calculateShippingCost } from "../../../UtilityComps/UKShippingCalculator";

import { IMember } from "../../../../interfaces/member";
import { IArtwork } from "../../../../interfaces/artwork";

interface CollectorActionProps {
  member: IMember | null;
  artwork: IArtwork | null;
  onShippingCalculated: (shippingInfo: React.ReactNode) => void;
}

function PurchaseRequest({
  member,
  artwork,
  onShippingCalculated,
}: CollectorActionProps) {
  const [isRequested, setIsRequested] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shippingCosts, setShippingCosts] = useState<{
    baseShippingCost: number;
    insuranceCost: number;
    totalShippingCost: number;
    totalPrice: number;
  } | null>(null);
  const [step, setStep] = useState<"initial" | "confirm">("initial");

  const calculateShipping = () => {
    if (!artwork || !member) {
      setError("Artwork or member information is missing.");
      return;
    }

    try {
      const costs = calculateShippingCost({
        weight: artwork.weight,
        width: artwork.width,
        depth: artwork.depth,
        height: artwork.height,
        price: artwork.price,
        fromPostcode: artwork.artist.postcode,
        toPostcode: member.postcode,
      });

      setShippingCosts(costs);
      setStep("confirm");
      setError(null);

      onShippingCalculated(
        <div className="content mt-4 os-body-text has-text-weight-semibold">
          <p>Artwork Price: £{artwork.price.toFixed(2)}</p>
          <p>Shipping Cost: £{costs.totalShippingCost.toFixed(2)}</p>
          <p className="has-text-weight-bold is-size-4 os-accent-text">
            Final Price: £{costs.totalPrice.toFixed(2)}
          </p>
        </div>
      );
    } catch (error) {
      console.error("Error in calculateShipping:", error);
      setError("Failed to calculate shipping costs. Please try again.");
    }
  };

  const sendPurchaseRequest = async () => {
    if (!artwork || !member || !shippingCosts) return;

    setError(null);
    const url = `${baseUrl}/orders/create/`;
    const data = {
      artwork_id: artwork.id,
      final_price: shippingCosts.totalPrice,
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

  return (
    <div>
      {error && <p className="has-text-danger">{error}</p>}
      {isRequested ? (
        <div>
          <Link to="/gallery" className="button os-accent-bk">
            Request Sent
          </Link>
        </div>
      ) : step === "initial" ? (
        <button
          className="button is-order "
          onClick={calculateShipping}
          disabled={isRequested}
        >
          Want to buy?
        </button>
      ) : (
        <button
          className="button is-order"
          onClick={sendPurchaseRequest}
          disabled={isRequested}
        >
          Send Request
        </button>
      )}
    </div>
  );
}

export default PurchaseRequest;
