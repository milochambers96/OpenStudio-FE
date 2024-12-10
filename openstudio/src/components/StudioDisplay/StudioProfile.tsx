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
    <>
      <section className="hero">
        <div id="studio-control-banner" className="py-4">
          <div className="os-subcontent-bk my-4">
            <div className="mt-2">
              <h1 className="os-title-text has-text-weight-bold has-text-centered is-size-2">
                {studioTitle}
              </h1>
            </div>
            <div className="tabs is-centered has-text-weight-semibold">
              <ul className="is-size-4-desktop">
                <li className={activeTab === "artworks" ? "is-active" : ""}>
                  <a onClick={() => setActiveTab("artworks")}>
                    Studio Artworks
                  </a>
                </li>
                <li className={activeTab === "upload" ? "is-active" : ""}>
                  <a onClick={() => setActiveTab("upload")}>
                    Upload an Artwork
                  </a>
                </li>
                <li className={activeTab === "orders" ? "is-active" : ""}>
                  <a onClick={() => setActiveTab("orders")}>Order Manager</a>
                </li>
                <li className={activeTab === "details" ? "is-active" : ""}>
                  <a onClick={() => setActiveTab("details")}>Studio Details</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        {activeTab === "artworks" && (
          <StudioArtworks
            memberId={member?.id}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "upload" && (
          <StudioArtworkUpload onUploadSuccess={handleUploadSuccess} />
        )}
        {activeTab === "orders" && <StudioOrders />}
        {activeTab === "details" && <StudioDetails />}
      </section>
    </>
  );
}

export default StudioProfile;
