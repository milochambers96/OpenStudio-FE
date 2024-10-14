import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { baseUrl } from "../../../../config";
import { calculateShippingCost } from "../../../UtilityComps/UKShippingCalculator";

import { IMember } from "../../../../interfaces/member";
import { IArtwork } from "../../../../interfaces/artwork";

interface CollectorActionProps {
  member: IMember | null;
  artwork: IArtwork | null;
}

function PurchaseRequest({ member, artwork }: CollectorActionProps) {
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
      console.log("Artwork:", artwork);
      console.log("Member:", member);

      const costs = calculateShippingCost({
        weight: artwork.weight,
        width: artwork.width,
        depth: artwork.depth,
        height: artwork.height,
        price: artwork.price,
        fromPostcode: artwork.artist.postcode,
        toPostcode: member.postcode,
      });

      console.log("Calculated costs:", costs);

      setShippingCosts(costs);
      setStep("confirm");
      setError(null);
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
          <p>Purchase request sent!</p>
          <Link to="/gallery" className="button is-primary">
            View in Gallery
          </Link>
        </div>
      ) : step === "initial" ? (
        <button
          className="button is-primary"
          onClick={calculateShipping}
          disabled={isRequested}
        >
          Want to buy?
        </button>
      ) : (
        shippingCosts && (
          <div>
            <p>Artwork Price: £{artwork?.price.toFixed(2)}</p>
            <p>Shipping Cost: £{shippingCosts.totalShippingCost.toFixed(2)}</p>
            <p>Total Price: £{shippingCosts.totalPrice.toFixed(2)}</p>
            <button
              className="button is-primary"
              onClick={sendPurchaseRequest}
              disabled={isRequested}
            >
              Order Request
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default PurchaseRequest;
