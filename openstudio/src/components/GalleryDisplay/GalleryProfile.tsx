import { useState } from "react";

import { IMember } from "../../interfaces/member";
import { getPossessiveForm } from "../UtilityComps/UtilityFunctions";

import GalleryArtworks from "./GalleryArtworks";
import GalleryOrders from "./GalleryOrders";
import GalleryDetails from "./GalleryDetails";

function GalleryProfile({ member }: { member: IMember | null }) {
  const [activeTab, setActiveTab] = useState("artworks");

  const galleryTitle = member
    ? `${member.first_name} ${getPossessiveForm(member.last_name)} Gallery`
    : "Gallery";

  return (
    <>
      <section className="hero">
        <div id="gallery-control-banner" className="py-4">
          <div className="os-subcontent-bk my-4">
            <div className="mt-2">
              <h1 className="os-title-text has-text-weight-bold has-text-centered is-size-2">
                {galleryTitle}
              </h1>
            </div>
            <div className="tabs is-centered has-text-weight-semibold">
              <ul className="is-size-4-desktop">
                <li className={activeTab === "artworks" ? "is-active" : ""}>
                  <a onClick={() => setActiveTab("artworks")}>
                    Gallery Artworks
                  </a>
                </li>
                <li className={activeTab === "orders" ? "is-active" : ""}>
                  <a onClick={() => setActiveTab("orders")}>Order Requests</a>
                </li>
                <li className={activeTab === "details" ? "is-active" : ""}>
                  <a onClick={() => setActiveTab("details")}>Gallery Details</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        {activeTab === "artworks" && <GalleryArtworks />}
        {activeTab === "orders" && <GalleryOrders />}
        {activeTab === "details" && <GalleryDetails />}
      </section>
    </>
  );
}

export default GalleryProfile;
