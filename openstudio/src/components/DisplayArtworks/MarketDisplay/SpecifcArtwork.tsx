import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../../../styles/SpecificArtwork.css";

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
        const response = await axios.get(
          `http://localhost:8000/artworks/${id}/`
        );
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

  console.log("the artwork is", artwork);

  return (
    <section className="section mt-4" style={{ height: "calc(100vh - 52px)" }}>
      <div className="container mt-6 h-100">
        <div className="columns is-multiline is-centered h-100">
          {artwork && (
            <div className="column is-one-half-desktop is-full-mobile h-100">
              <div className="box h-100 overflow-auto">
                <ImageCarousel images={imagesArray} />
              </div>
            </div>
          )}
          {artwork && (
            <div className="column is-one-half-desktop is-full-mobile h-100">
              <div className="box h-100 overflow-auto">
                <ArtworkDetails artwork={artwork} member={member} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SpecifcArtwork;
