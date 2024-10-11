import { useState } from "react";

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

  return (
    <div className="box">
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
            <a onClick={() => setActiveTab("specifications")}>Specifications</a>
          </li>
        </ul>
      </div>
      <div>
        {activeTab === "summary" ? (
          <Summary artwork={artwork} />
        ) : (
          <Specifications artwork={artwork} />
        )}
      </div>
      <div>
        {member?.user_type === "collector" && (
          <div className="is-flex is-justify-content-space-around mt-4">
            <CollectorGalleryActions member={member} artwork={artwork} />
            <PurchaseRequest member={member} artwork={artwork} />
          </div>
        )}
        {!member && <p>Login to purchase work.</p>}
      </div>
    </div>
  );
}

export default ArtworkDetails;
