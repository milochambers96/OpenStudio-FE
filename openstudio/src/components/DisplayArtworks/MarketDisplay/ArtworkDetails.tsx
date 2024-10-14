import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "../../../styles/ArtworkDetailsComp.css";

import { baseUrl } from "../../../config";

import { IArtwork } from "../../../interfaces/artwork";
import { IMember } from "../../../interfaces/member";

import Summary from "./Summary";
import Specifications from "./Specifications";
import CollectorGalleryActions from "./CollectorActions/CollectorGalleryActions";
import PurchaseRequest from "./CollectorActions/PurchaseRequest";

interface ArtworkDetailsProps {
  artwork: null | IArtwork;
  member: null | IMember;
}

function ArtworkDetails({ artwork, member }: ArtworkDetailsProps) {
  const [activeTab, setActiveTab] = useState("summary");

  const artworkId = artwork?.id;

  const navigate = useNavigate();

  async function deleteArtwork() {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseUrl}/artworks/${artworkId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/studio");
    } catch (error: unknown) {
      console.error("Error deleting artwork", error);
    }
  }

  return (
    <div className="artwork-details-container">
      <div className="artwork-details-content">
        <div className="mt-2">
          <p className="subtitle has-text-centered">
            {artwork?.title} by {artwork?.artist.first_name}{" "}
            {artwork?.artist.last_name}
          </p>
        </div>
        <div className="tabs is-centered mt-4">
          <ul>
            <li className={activeTab === "summary" ? "is-active" : ""}>
              <a onClick={() => setActiveTab("summary")}>Summary</a>
            </li>
            <li className={activeTab === "specifications" ? "is-active" : ""}>
              <a onClick={() => setActiveTab("specifications")}>
                Specifications
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          {activeTab === "summary" ? (
            <Summary artwork={artwork} />
          ) : (
            <Specifications artwork={artwork} />
          )}
        </div>
      </div>
      <div className="artwork-details-actions">
        {member?.user_type === "collector" && (
          <div className="is-flex is-justify-content-space-around">
            <CollectorGalleryActions member={member} artwork={artwork} />
            {artwork?.is_for_sale ? (
              <PurchaseRequest member={member} artwork={artwork} />
            ) : (
              <p>
                <strong>
                  This work is currently not available for purchase.
                </strong>
              </p>
            )}
          </div>
        )}
        {member?.id === artwork?.artist.id && !artwork?.is_for_sale && (
          <div className="note">
            You have not listed this work for sale on OpenStudio's Marketplace.
          </div>
        )}
        {member?.id === artwork?.artist.id && (
          <div className="is-flex-is-justify-content-space-between">
            <Link to={`/artwork/${artworkId}/edit-details`}>
              <button className="button is-link">Update Artwork</button>
              <button className="button is-danger" onClick={deleteArtwork}>
                Delete Artwork
              </button>
            </Link>
          </div>
        )}
        {!member && <p>Login as a collector to purchase work.</p>}
      </div>
    </div>
  );
}

export default ArtworkDetails;
