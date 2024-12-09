import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../../../styles/SpecificArtwork.css";
import { baseUrl } from "../../../config";

import { IMember } from "../../../interfaces/member";
import { IArtwork } from "../../../interfaces/artwork";
import { IArtworkImage } from "../../../interfaces/artworkImage";

import FullPageLoader from "../../UtilityComps/FullPageLoader";
import ImageCarousel from "./ImageCarousel";
import ArtworkDetails from "./ArtworkDetails";

function SpecifcArtwork({ member }: { member: IMember | null }) {
  const [artwork, setArtwork] = useState<IArtwork | null>(null);
  const [imagesArray, setImagesArray] = useState<IArtworkImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchArtworkDetails() {
      try {
        const response = await axios.get(`${baseUrl}/artworks/${id}/`);
        setArtwork(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching artwork details:", error);
        setIsLoading(false);
      }
    }

    if (id) {
      fetchArtworkDetails();
    }
  }, [id]);

  useEffect(() => {
    if (artwork) {
      setImagesArray(artwork?.artworks_images || []);
    }
  }, [artwork]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!artwork) {
    return <div>Artwork not found.</div>;
  }

  return (
    <section className="section mt-4">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-11">
            <div className="box os-content-bk mt-4">
              <div className="has-text-centered py-4 mb-2">
                <h1 className="title is-size-1-desktop is-size-4-touch os-title-text">
                  {artwork.title} by {artwork.artist.first_name}{" "}
                  {artwork.artist.last_name}
                </h1>
              </div>

              <div
                id="specific-artwork-desktop-view"
                className="is-hidden-touch"
              >
                <div className="columns is-centered artwork-columns is-equal-height">
                  {artwork && (
                    <div className="column is-5 is-flex">
                      <div className="os-subcontent-bk is-flex is-flex-direction-column is-flex-grow-1">
                        <ImageCarousel images={imagesArray} />
                      </div>
                    </div>
                  )}
                  {artwork && (
                    <div className="column is-7 is-flex">
                      <div className="is-flex is-flex-direction-column is-flex-grow-1">
                        <ArtworkDetails artwork={artwork} member={member} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                id="specific-artwork-mobile-view"
                className="is-hidden-desktop"
              >
                {artwork && (
                  <div className="os-subcontent-bk">
                    <ImageCarousel images={imagesArray} />
                  </div>
                )}
                {artwork && (
                  <div>
                    <ArtworkDetails artwork={artwork} member={member} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecifcArtwork;
