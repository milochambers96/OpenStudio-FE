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
    <section className="section">
      <div className="box mt-5">
        <div className="mt-2 is-centered text-special">
          <p className="title has-text-centered mb-1">{galleryTitle}</p>
        </div>
        <div className="tabs is-centered">
          <ul>
            <li className={activeTab === "artworks" ? "is-active" : ""}>
              <a onClick={() => setActiveTab("artworks")}>Gallery Artworks</a>
            </li>
            <li className={activeTab === "orders" ? "is-active" : ""}>
              <a onClick={() => setActiveTab("orders")}>Order Requests</a>
            </li>
            <li className={activeTab === "details" ? "is-active" : ""}>
              <a onClick={() => setActiveTab("details")}>Gallery Details</a>
            </li>
          </ul>
        </div>
        <div>
          {activeTab === "artworks" && <GalleryArtworks />}
          {activeTab === "orders" && <GalleryOrders />}
          {activeTab === "details" && <GalleryDetails />}
        </div>
      </div>
    </section>
  );
}

export default GalleryProfile;
