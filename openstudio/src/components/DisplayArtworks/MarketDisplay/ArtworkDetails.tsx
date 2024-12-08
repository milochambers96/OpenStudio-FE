import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "../../../styles/ArtworkDetailsComp.css";

import { baseUrl } from "../../../config";

import { IArtwork } from "../../../interfaces/artwork";
import { IMember } from "../../../interfaces/member";

import Summary from "./Summary";
import Specifications from "./Specifications";
import ArtworkArtistBio from "./ArtworkArtistBio";
import CollectorGalleryActions from "./CollectorActions/CollectorGalleryActions";
import PurchaseRequest from "./CollectorActions/PurchaseRequest";

interface ArtworkDetailsProps {
  artwork: null | IArtwork;
  member: null | IMember;
}

function ArtworkDetails({ artwork, member }: ArtworkDetailsProps) {
  const [activeTab, setActiveTab] = useState("summary");
  const [shippingInfo, setShippingInfo] = useState<React.ReactNode | null>(
    null
  );

  const artworkId = artwork?.id;

  const navigate = useNavigate();

  const styles = {
    artworkDetailsContent: {
      padding: "0 1rem",
    },
    alignWithContent: {
      paddingLeft: "3rem",
      paddingRight: "1.5rem",
    },
  };

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

  const handleShippingCalculated = (info: React.ReactNode) => {
    setShippingInfo(info);
  };

  return (
    <article id="artwork-details-container" className="">
      <div
        className="artwork-details-content"
        style={styles.artworkDetailsContent}
      >
        {/* <p className="title has-text-centered">
            {artwork?.title} by {artwork?.artist.first_name}{" "}
            {artwork?.artist.last_name}
          </p> */}
        <div className="tabs  is-centered mt-4">
          <ul>
            <li className={activeTab === "summary" ? "is-active" : ""}>
              <a onClick={() => setActiveTab("summary")}>Summary</a>
            </li>
            <li className={activeTab === "specifications" ? "is-active" : ""}>
              <a onClick={() => setActiveTab("specifications")}>
                Specifications
              </a>
            </li>
            <li className={activeTab === "artwork artist" ? "is-active" : ""}>
              <a onClick={() => setActiveTab("artwork artist")}>
                Artist details
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          {activeTab === "summary" ? (
            <Summary artwork={artwork} />
          ) : activeTab === "specifications" ? (
            <Specifications artwork={artwork} />
          ) : activeTab === "artwork artist" ? (
            <ArtworkArtistBio artwork={artwork} />
          ) : null}
        </div>
        {shippingInfo && (
          <div className="shipping-info mt-2" style={styles.alignWithContent}>
            <h3 className="title is-6">Shipping Information</h3>
            {shippingInfo}
          </div>
        )}
      </div>
      <div className="artwork-details-actions">
        {member?.user_type === "collector" && (
          <div className="is-flex is-justify-content-space-between p-4">
            {artwork?.is_for_sale ? (
              <PurchaseRequest
                member={member}
                artwork={artwork}
                onShippingCalculated={handleShippingCalculated}
              />
            ) : (
              <p className="os-body-text has-text-weight-semibold is-size-4-desktop">
                This work is currently not available for purchase.
              </p>
            )}
            <CollectorGalleryActions member={member} artwork={artwork} />
          </div>
        )}
        {member?.id === artwork?.artist.id && (
          <>
            {!artwork?.is_for_sale && (
              <div className="artist-sale-note mb-5">
                You have not listed this work for sale on OpenStudio's
                Marketplace.
              </div>
            )}
            <div className="is-flex is-justify-content-space-around">
              <Link to={`/artwork/${artworkId}/edit-details`}>
                <button className="button is-link">Update Artwork</button>
              </Link>
              <button className="button is-danger" onClick={deleteArtwork}>
                Delete Artwork
              </button>
            </div>
          </>
        )}
        {!member && (
          <div className="is-flex is-justify-content-center">
            <p className="is-size-4">
              <Link to="/member-access">Login</Link> as a collector to purchase
              work.
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

export default ArtworkDetails;
