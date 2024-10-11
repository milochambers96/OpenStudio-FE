import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  return (
    <section className="section mt-4">
      <div className="container">
        <div className="columns is-multiline is-centered">
          {artwork && (
            <div className="column is-one-half-desktop is-full-mobile">
              <ImageCarousel images={imagesArray} />
            </div>
          )}
          {artwork && (
            <div className="column is-one-half-desktop is-full-mobile">
              <ArtworkDetails artwork={artwork} member={member} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SpecifcArtwork;
