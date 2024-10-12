import { useState } from "react";

import { IMember } from "../../interfaces/member";
import { getPossessiveForm } from "../UtilityComps/UtilityFunctions";

import StudioArtworks from "./StudioArtworks";
import StudioArtworkUpload from "./StudioArtworkUpload";
import StudioOrders from "./StudioOrders";
import StudioDetails from "./StudioDetails";

function StudioProfile({ member }: { member: IMember | null }) {
  const [activeTab, setActiveTab] = useState("artworks");

  const studioTitle = member
    ? `${member.first_name} ${getPossessiveForm(member.last_name)} Studio`
    : "Studio";

  const handleUploadSuccess = () => {
    setActiveTab("artworks");
  };

  return (
    <section className="section">
      <div className="box mt-5">
        <div className="mt-2 is-centered text-special">
          <p className="title has-text-centered mb-1">{studioTitle}</p>
        </div>
        <div className="tabs is-centered">
          <ul>
            <li className={activeTab === "artworks" ? "is-active" : ""}>
              <a onClick={() => setActiveTab("artworks")}>Studio Artworks</a>
            </li>
            <li className={activeTab === "upload" ? "is-active" : ""}>
              <a onClick={() => setActiveTab("upload")}>Upload an Artwork</a>
            </li>
            <li className={activeTab === "orders" ? "is-active" : ""}>
              <a onClick={() => setActiveTab("orders")}>Order Manager</a>
            </li>
            <li className={activeTab === "details" ? "is-active" : ""}>
              <a onClick={() => setActiveTab("details")}>Studio Details</a>
            </li>
          </ul>
        </div>
        <div>
          {activeTab === "artworks" && <StudioArtworks />}
          {activeTab === "upload" && (
            <StudioArtworkUpload onUploadSuccess={handleUploadSuccess} />
          )}
          {activeTab === "orders" && <StudioOrders />}
          {activeTab === "details" && <StudioDetails />}
        </div>
      </div>
    </section>
  );
}

export default StudioProfile;
