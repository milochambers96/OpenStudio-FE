import { useState, useEffect } from "react";
import axios from "axios";

import { baseUrl } from "../../config";

import { IArtwork } from "../../interfaces/artwork";

import SectionLoader from "../UtilityComps/SectionLoader";
import ArtworkItems from "../DisplayArtworks/Marketplace/ArtworkItems";

type Artworks = null | Array<IArtwork>;

function GalleryArtworks() {
  const [galleryArtworks, setGalleryArtworks] = useState<Artworks>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  async function getArtworks() {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/galleries/my-gallery/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGalleryArtworks(response.data.artworks);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ||
            "An error occurred while fetching gallery artworks."
        );
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Error fetching gallery artworks:", error);
    }
  }

  useEffect(() => {
    getArtworks();
  }, []);

  if (isLoading) return <SectionLoader />;
  if (error) return <p className="has-text-danger">{error}</p>;

  console.log(galleryArtworks);

  return (
    <div>
      <h2 className="subtitle text-special has-text-centered is-4">
        Gallery Artworks
      </h2>
      {galleryArtworks && galleryArtworks.length > 0 ? (
        <div className="columns is-multiline">
          {galleryArtworks.map((artwork) => (
            <ArtworkItems {...artwork} key={artwork.id} />
          ))}
        </div>
      ) : (
        <p>No artworks in your gallery yet.</p>
      )}
    </div>
  );
}

export default GalleryArtworks;
