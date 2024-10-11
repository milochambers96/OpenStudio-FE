import { useState } from "react";

import { IArtwork } from "../../interfaces/artwork";
import { IMember } from "../../interfaces/member";

import Summary from "./MarketDisplay/Summary";
import Specifications from "./MarketDisplay/Specifications";
import CollectorGalleryActions from "./MarketDisplay/CollectorActions/CollectorGalleryActions";

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
          <CollectorGalleryActions member={member} artwork={artwork} />
        )}
        {!member && <p>Login to purchase work.</p>}
      </div>
    </div>
  );
}

export default ArtworkDetails;
