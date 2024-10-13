import { useState, useEffect } from "react";
import axios from "axios";

import { IArtwork } from "../../interfaces/artwork";

import SectionLoader from "../UtilityComps/SectionLoader";
import ArtworkItems from "../DisplayArtworks/Marketplace/ArtworkItems";

type Artworks = null | Array<IArtwork>;

interface StudioArtworkProps {
  memberId: number | undefined;
}

function StudioArtworks({ memberId }: StudioArtworkProps) {
  const [studioArtworks, setStudioArtworks] = useState<Artworks>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getArtworks() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:8000/artworks/");
        const allArtworks = response.data;
        console.log("All work", allArtworks);
        const artsitsWork = allArtworks.filter(
          (artwork: IArtwork) => artwork.artist.id === memberId
        );
        console.log("artists work", artsitsWork);

        setStudioArtworks(artsitsWork);

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
    getArtworks();
  }, [memberId]);

  if (isLoading) return <SectionLoader />;
  if (error) return <p className="has-text-danger">{error}</p>;

  return (
    <div>
      <h2 className="subtitle text-special has-text-centered is-4">
        Gallery Artworks
      </h2>
      {studioArtworks && studioArtworks.length > 0 ? (
        <div className="columns is-multiline">
          {studioArtworks.map((artwork) => (
            <ArtworkItems {...artwork} key={artwork.id} />
          ))}
        </div>
      ) : (
        <p>No artworks in your gallery yet.</p>
      )}
    </div>
  );
}

export default StudioArtworks;
